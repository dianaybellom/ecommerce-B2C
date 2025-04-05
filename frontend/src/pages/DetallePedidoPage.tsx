import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

interface ProductoDetalle {
  id: number;
  producto_id: number;
  cantidad: number;
  precio_unitario: number;
  total: number;
  producto?: {
    nombre: string;
    imagen: string;
  };
}

interface Pedido {
  id: number;
  estado: string;
  productos: ProductoDetalle[];
  total: string;
}

const DetallePedidoPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pedido, setPedido] = useState<Pedido | null>(null);

  useEffect(() => {
    const fetchPedido = async () => {
      try {
        const res = await fetch(`${API_URL}/pedido/${id}`, {
          credentials: "include",
        });
        const data = await res.json();

        // Obtener los detalles de los productos
        const detallesConProducto = await Promise.all(
          data.productos.map(async (detalle: ProductoDetalle) => {
            const resProd = await fetch(`${API_URL}/producto/${detalle.producto_id}`);
            const prodData = await resProd.json();
            return {
              ...detalle,
              producto: prodData,
            };
          })
        );

        setPedido({ ...data, productos: detallesConProducto });
      } catch (error) {
        console.error("Error al obtener detalles del pedido:", error);
      }
    };

    fetchPedido();
  }, [id]);

  return (
    <main className="max-w-4xl mx-auto px-4 md:px-6 py-10">
      {pedido ? (
        <>
          {/* Botón volver */}
          <div className="flex justify-end">
            <button
              onClick={() => navigate("/mis-pedidos")}
              className="text-[#7f2d51] hover:underline text-sm font-medium"
            >
              Volver a mis pedidos
            </button>
          </div>

          {/* Cabecera del pedido */}
          <h2 className="text-2xl font-bold mb-4">
            Pedido #{pedido.id}{" "}
            <span className="text-sm text-gray-500">({pedido.estado})</span>
          </h2>

          {/* Productos */}
          <div className="space-y-4">
            {pedido.productos.map((item, index) => (
              <div
                key={index}
                className="bg-white border rounded shadow p-4 flex items-center justify-between"
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
                      Cantidad: {item.cantidad}
                    </p>
                  </div>
                </div>
                <p className="text-right font-semibold text-black">
                  $
                  {parseFloat(item.total.toString()).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="text-right mt-6 text-lg font-bold">
            Total: $
            {parseFloat(pedido.total).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
        </>
      ) : (
        <p className="text-gray-500">Cargando pedido...</p>
      )}
    </main>
  );
};

export default DetallePedidoPage;
