import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { crearPedido, PedidoProducto } from "@/services/pedidoService";
import { toast } from "@/components/ui/use-toast";
import { FaTrashAlt } from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL;

interface Producto {
  id: number;
  nombre: string;
  imagen: string;
  precio: number;
  cantidad: number;
}

const CarritoPage: React.FC = () => {
  const [carrito, setCarrito] = useState<Producto[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const guardado = localStorage.getItem("carrito");
    if (guardado) {
      setCarrito(JSON.parse(guardado));
    }
  }, []);

  const actualizarCarrito = (nuevo: Producto[]) => {
    setCarrito(nuevo);
    localStorage.setItem("carrito", JSON.stringify(nuevo));
  };

  const aumentar = (id: number) => {
    actualizarCarrito(
      carrito.map((p) =>
        p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p
      )
    );
  };

  const disminuir = (id: number) => {
    actualizarCarrito(
      carrito
        .map((p) =>
          p.id === id && p.cantidad > 1
            ? { ...p, cantidad: p.cantidad - 1 }
            : p
        )
        .filter((p) => p.cantidad > 0)
    );
  };

  const eliminar = (id: number) => {
    actualizarCarrito(carrito.filter((p) => p.id !== id));
  };

  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  const handleCrearPedido = async () => {
    try {
      const productos: PedidoProducto[] = carrito.map((item) => ({
        producto_id: item.id,
        cantidad: item.cantidad,
      }));

      const respuesta = await crearPedido(productos);

        toast({
        title: "Pedido creado",
        description: "Tu pedido fue registrado exitosamente",
        });

        localStorage.removeItem("carrito");
        setCarrito([]);

        navigate(`/mis-pedidos/${respuesta.pedido_id}`);

    } catch (err) {
      console.error("Error al crear pedido:", err);

      let mensaje = "No se pudo crear el pedido";

      if (err instanceof Response) {
        try {
          const data = await err.json();
          if (data?.error) mensaje = data.error;
        } catch (parseErr) {
          console.warn("No se pudo parsear el error:", parseErr);
        }
      }

      toast({
        title: "Error",
        description: mensaje,
        variant: "destructive",
      });
    }
  };

  return (
    <main className="max-w-5xl mx-auto px-4 md:px-6 py-10">
      <h2 className="text-3xl font-bold mb-6">Resumen del carrito</h2>

      {carrito.length === 0 ? (
        <p className="text-gray-500">Tu carrito está vacío.</p>
      ) : (
        <>
          <div className="space-y-4">
            {carrito.map((producto) => (
              <div
                key={producto.id}
                className="flex flex-col sm:flex-row sm:justify-between items-center bg-white rounded-lg shadow p-4 border gap-4"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    src={`${API_URL}/${producto.imagen}`}
                    alt={producto.nombre}
                    className="w-20 h-20 object-contain rounded"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">
                      {producto.nombre}
                    </h3>
                    <div className="flex items-center mt-2 gap-3">
                      <div className="flex items-center border border-[#7f2d51] rounded-full px-3 py-1">
                        <button
                          onClick={() => disminuir(producto.id)}
                          className="text-lg font-bold px-2"
                        >
                          −
                        </button>
                        <span className="px-2">{producto.cantidad}</span>
                        <button
                          onClick={() => aumentar(producto.id)}
                          className="text-lg font-bold px-2"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => eliminar(producto.id)}
                        className="text-gray-400 hover:text-gray-600"
                        title="Eliminar producto"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                </div>

                <p className="text-lg font-semibold text-right sm:text-left w-full sm:w-auto">
                  ${producto.precio.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            ))}
          </div>

          {/* Total, método de pago y botón */}
          <div className="mt-10 space-y-6">
            {/* Total */}
            <div className="text-right text-xl font-bold">
              Total: $
              {total.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>

            {/* Método de pago */}
            <div className="border-t border-b border-gray-200 py-6 mb-6 bg-white">
                <h4 className="text-base font-bold mb-4 px-6">Método de pago</h4>
                <div className="flex items-center gap-3 px-6">
                    <input
                    type="radio"
                    checked
                    readOnly
                    className="accent-[#7f2d51] w-4 h-4"
                    />
                    <span className="text-sm text-gray-700">
                    Usar tarjeta guardada
                    </span>
                </div>
                </div>


            {/* Botón de crear pedido */}
            <div className="flex justify-end">
              <button
                onClick={handleCrearPedido}
                className="text-white px-6 py-3 rounded font-semibold transition"
                style={{ backgroundColor: "#000" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#7f2d51")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#000")
                }
              >
                Crear pedido
              </button>
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default CarritoPage;