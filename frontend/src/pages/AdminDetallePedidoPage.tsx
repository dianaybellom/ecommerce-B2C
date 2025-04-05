import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Trash2 } from "lucide-react"

const API_URL = import.meta.env.VITE_API_URL
const ESTADOS = ["Confirmado", "En proceso", "Enviado", "Entregado", "Cancelado"]

const AdminDetallePedidoPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [pedido, setPedido] = useState<any>(null)
  const [usuarios, setUsuarios] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resPedido = await fetch(`${API_URL}/pedido/${id}`, { credentials: "include" })
        const pedidoData = await resPedido.json()

        // Obtener datos de productos manualmente (como en DetallePedidoPage)
        const productosConInfo = await Promise.all(
          pedidoData.productos.map(async (detalle: any) => {
            const resProd = await fetch(`${API_URL}/producto/${detalle.producto_id}`)
            const prodData = await resProd.json()
            return {
              ...detalle,
              producto: {
                nombre: prodData.nombre,
                imagen: prodData.imagen,
              },
            }
          })
        )

        setPedido({ ...pedidoData, productos: productosConInfo })

        // Usuarios
        const resUsuarios = await fetch(`${API_URL}/admin/usuarios`, { credentials: "include" })
        const usuariosData = await resUsuarios.json()
        setUsuarios(usuariosData)
      } catch (error) {
        console.error("Error cargando pedido:", error)
      }
    }

    fetchData()
  }, [id])

  const obtenerNombreCliente = (usuario_id: number) => {
    const usuario = usuarios.find((u) => u.id === usuario_id)
    return usuario ? `${usuario.nombre} ${usuario.apellido}` : "Desconocido"
  }

  const actualizarEstado = (nuevoEstado: string) => {
    fetch(`${API_URL}/pedido/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ estado: nuevoEstado }),
    })
      .then(() => setPedido({ ...pedido, estado: nuevoEstado }))
      .catch(console.error)
  }

  const actualizarCantidad = (detalleId: number, nuevaCantidad: number) => {
    const nuevoDetalle = pedido.productos.map((item: any) =>
      item.id === detalleId ? { ...item, cantidad: nuevaCantidad } : item
    )
    setPedido({ ...pedido, productos: nuevoDetalle })
  }

  const eliminarLinea = (detalleId: number) => {
    const nuevoDetalle = pedido.productos.filter((item: any) => item.id !== detalleId)
    setPedido({ ...pedido, productos: nuevoDetalle })
  }

  const eliminarPedido = () => {
    if (!confirm("¿Estás seguro de eliminar este pedido?")) return
    fetch(`${API_URL}/pedido/${id}`, {
      method: "DELETE",
      credentials: "include",
    }).then(() => navigate("/admin/pedidos"))
  }

  const calcularSubtotal = (item: any) =>
    Number(item.precio_unitario) * Number(item.cantidad)

  const calcularTotal = () =>
    pedido?.productos.reduce((acc: number, item: any) => acc + calcularSubtotal(item), 0)

  const formatearFecha = (fecha: string) =>
    new Date(fecha).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })

  return pedido ? (
    <main className="max-w-5xl mx-auto px-4 py-10 space-y-6">
      {/* Cabecera del pedido */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold mb-1">Pedido #{pedido.id}</h1>
          <p className="text-sm text-gray-600">
            Cliente: <strong>{obtenerNombreCliente(pedido.usuario_id)}</strong>
          </p>
          <p className="text-sm text-gray-500">
            Fecha: {formatearFecha(pedido.fecha_creacion)}
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <button
            onClick={() => navigate("/admin/pedidos")}
            className="text-[#7f2d51] hover:underline text-sm"
          >
            ← Volver al listado
          </button>
          <button
            onClick={eliminarPedido}
            className="text-red-600 text-sm hover:underline"
          >
            Eliminar pedido
          </button>
        </div>
      </div>

      {/* Estado editable */}
      <div>
        <label className="text-sm font-semibold mr-2">Estado:</label>
        <select
          value={pedido.estado}
          onChange={(e) => actualizarEstado(e.target.value)}
          className="border rounded px-2 py-1"
        >
          {ESTADOS.map((estado) => (
            <option key={estado} value={estado}>
              {estado}
            </option>
          ))}
        </select>
      </div>

      {/* Detalle de productos */}
      <div className="space-y-4">
        {pedido.productos.map((item: any) => (
          <div
            key={item.id}
            className="bg-white border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              {item.producto?.imagen && (
                <img
                  src={`${API_URL}/${item.producto.imagen}`}
                  alt={item.producto.nombre}
                  className="w-16 h-16 object-contain rounded"
                />
              )}
              <div>
                <p className="font-semibold">{item.producto?.nombre || "Producto"}</p>
                <p className="text-sm text-gray-600">
                  {item.cantidad} x{" "}
                  {Number(item.precio_unitario).toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2">
              <input
                type="number"
                min={1}
                value={item.cantidad}
                onChange={(e) =>
                  actualizarCantidad(item.id, parseInt(e.target.value, 10))
                }
                className="w-20 border rounded px-2 py-1 text-right"
              />
              <p className="font-semibold text-gray-700">
                {calcularSubtotal(item).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </p>
              <button
                onClick={() => eliminarLinea(item.id)}
                className="text-gray-400 hover:text-red-500 transition-colors"
                title="Eliminar producto"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="text-right pt-6 border-t mt-4">
        <p className="text-lg font-bold">
          Total:{" "}
          {calcularTotal().toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
      </div>
    </main>
  ) : (
    <p className="text-center text-gray-500">Cargando pedido...</p>
  )
}

export default AdminDetallePedidoPage