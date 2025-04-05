import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const API_URL = import.meta.env.VITE_API_URL

interface Usuario {
  id: number
  nombre: string
  apellido: string
}

interface Pedido {
  id: number
  usuario_id: number
  estado: string
  total: number | string
  fecha_creacion: string
  usuario?: Usuario
}

const ESTADOS = ["Todos", "Confirmado", "En proceso", "Enviado", "Entregado", "Cancelado"]

const AdminPedidosPage = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([])
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [busquedaId, setBusquedaId] = useState("")
  const [filtroEstado, setFiltroEstado] = useState("Todos")
  const [fechaDesde, setFechaDesde] = useState("")
  const [fechaHasta, setFechaHasta] = useState("")

  useEffect(() => {
    fetch(`${API_URL}/pedido`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        const ordenados = data.sort(
          (a: Pedido, b: Pedido) =>
            new Date(a.fecha_creacion).getTime() - new Date(b.fecha_creacion).getTime()
        )
        setPedidos(ordenados)
      })
      .catch((err) => console.error("Error cargando pedidos:", err))

    fetch(`${API_URL}/admin/usuarios`, { credentials: "include" })
      .then((res) => res.json())
      .then(setUsuarios)
      .catch((err) => console.error("Error cargando usuarios:", err))
  }, [])

  const formatearFecha = (fecha: string) =>
    new Date(fecha).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })

  const obtenerNombreUsuario = (usuario_id: number) => {
    const usuario = usuarios.find((u) => u.id === usuario_id)
    return usuario ? `${usuario.nombre} ${usuario.apellido}` : "Desconocido"
  }

  const pedidosFiltrados = pedidos.filter((pedido) => {
    const coincideID =
      busquedaId.trim() === "" || pedido.id.toString().includes(busquedaId.trim())
    const coincideEstado = filtroEstado === "Todos" || pedido.estado === filtroEstado

    const fechaPedido = new Date(pedido.fecha_creacion)
    const desdeValida = fechaDesde ? new Date(fechaDesde) <= fechaPedido : true
    const hastaValida = fechaHasta ? fechaPedido <= new Date(fechaHasta) : true

    return coincideID && coincideEstado && desdeValida && hastaValida
  })

  return (
    <main className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Gestión de Pedidos</h1>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="text-sm font-medium">Buscar por ID</label>
          <input
            type="text"
            value={busquedaId}
            onChange={(e) => setBusquedaId(e.target.value)}
            placeholder="111"
            className="w-full border rounded px-3 py-1.5"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Filtrar por estado</label>
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="w-full border rounded px-3 py-1.5"
          >
            {ESTADOS.map((estado) => (
              <option key={estado} value={estado}>
                {estado}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Desde</label>
          <input
            type="date"
            value={fechaDesde}
            onChange={(e) => setFechaDesde(e.target.value)}
            className="w-full border rounded px-3 py-1.5"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Hasta</label>
          <input
            type="date"
            value={fechaHasta}
            onChange={(e) => setFechaHasta(e.target.value)}
            className="w-full border rounded px-3 py-1.5"
          />
        </div>
      </div>

      {/* Lista de pedidos */}
      <div className="space-y-4">
        {pedidosFiltrados.map((pedido) => (
          <div
            key={pedido.id}
            className="bg-white shadow rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="space-y-1">
              <p className="font-semibold">
                Pedido #{pedido.id} –{" "}
                <span className="text-md text-gray-500">{pedido.estado}</span>
              </p>
              <p className="text-md text-gray-400">
                {formatearFecha(pedido.fecha_creacion)}
              </p>
              <p className="text-sm text-gray-500">
                {obtenerNombreUsuario(pedido.usuario_id)}
              </p>
              <p className="text-sm text-gray-500">
                $ 
                {Number(pedido.total).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>

            <div className="mt-4 sm:mt-0 flex flex-col items-end gap-1">
              
              <Link
                to={`/admin/pedidos/${pedido.id}`}
                className="text-white px-2 py-2 rounded font-semibold transition"
                style={{ backgroundColor: "#000" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#7f2d51")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#000")
                }
              >
                Gestionar
              </Link>
            </div>
          </div>
        ))}

        {pedidosFiltrados.length === 0 && (
          <p className="text-gray-500 text-center">No hay pedidos que coincidan con los filtros.</p>
        )}
      </div>
    </main>
  )
}

export default AdminPedidosPage