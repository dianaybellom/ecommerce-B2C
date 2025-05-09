import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

interface Pedido {
  id: number;
  estado: string;
  total: number;
  fecha_creacion: string; // 👈 añadimos la fecha
}

const MisPedidosPage: React.FC = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/mis-pedidos`, {
      credentials: "include", // incluir cookies de sesión
    })
      .then((res) => res.json())
      .then((data) => {
        // Ordenar por fecha descendente
        const pedidosOrdenados = data.sort(
          (a: Pedido, b: Pedido) =>
            new Date(b.fecha_creacion).getTime() - new Date(a.fecha_creacion).getTime()
        );
        setPedidos(pedidosOrdenados);
      })
      .catch((err) => console.error("Error al cargar pedidos:", err));
  }, []);

  const formatearFecha = (fecha: string) => {
    const opciones: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(fecha).toLocaleDateString("es-ES", opciones);
  };

  return (
    <main className="max-w-4xl mx-auto px-4 md:px-6 py-10">
      <h2 className="text-3xl font-bold mb-6">Mis pedidos</h2>

      {pedidos.length === 0 ? (
        <p className="text-gray-500">No tienes pedidos registrados.</p>
      ) : (
        <div className="space-y-4">
          {pedidos.map((pedido) => (
            <div
              key={pedido.id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="space-y-1">
                <p className="text-lg font-semibold">Pedido #{pedido.id}</p>
                <span className="text-sm font-semibold">{pedido.estado}</span>
                <p className="text-sm text-gray-500">
                  ${" "}
                  {pedido.total.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>

              <div className="mt-4 sm:mt-0 flex flex-col items-end sm:items-end gap-1">
                <p className="text-xs text-gray-400">
                  {formatearFecha(pedido.fecha_creacion)}
                </p>
                <Link
                  to={`/mis-pedidos/${pedido.id}`}
                  className="text-[#7f2d51] hover:underline text-sm font-medium"
                >
                  Ver detalles
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default MisPedidosPage;