import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { useCart } from "@/context/CartContext";

interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  imagen: string;
  descripcion: string;
}

const API_URL = import.meta.env.VITE_API_URL;

const ColeccionPage: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [productosFiltrados, setProductosFiltrados] = useState<Producto[]>([]);
  const [searchParams] = useSearchParams();
  const { agregarProducto } = useCart();

  useEffect(() => {
    fetch(`${API_URL}/producto`)
      .then((res) => {
        if (!res.ok || !res.headers.get("content-type")?.includes("application/json")) {
          throw new Error("Respuesta inesperada del servidor");
        }
        return res.json();
      })
      .then((data) => {
        setProductos(data);
      })
      .catch((err) => console.error("Error cargando productos:", err));
  }, []);

  useEffect(() => {
    const categoria = searchParams.get("categoria");
    if (categoria) {
      setProductosFiltrados(
        productos.filter((producto) =>
          producto.categoria.toLowerCase() === categoria.toLowerCase()
        )
      );
    } else {
      setProductosFiltrados(productos);
    }
  }, [productos, searchParams]);

  const handleAgregar = (producto: Producto) => {
    agregarProducto({ ...producto, cantidad: 1 });
  };

  return (
    <div className="px-8 py-6">
      <h1 className="text-3xl font-bold mb-4 text-center">FLEUR D’AVENIR</h1>
      <p className="text-center mb-6 text-gray-600">
        Inspirada en el futuro, impregnada de la gracia des cerisiers
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productosFiltrados.map((producto) => (
          <div
            key={producto.id}
            className="bg-gray-100 rounded-2xl overflow-hidden shadow-sm flex flex-col h-[500px] p-4"
          >
            <div className="h-[90%] w-full flex items-center justify-center">
              <img
                src={`${API_URL}/${producto.imagen}`}
                alt={producto.nombre}
                className="h-full w-full object-contain"
              />
            </div>

            <div className="mt-2 flex justify-between items-end w-full">
              <div className="flex flex-col">
                <p className="text-md font-semibold text-gray-800 leading-tight">
                  {producto.nombre}
                </p>
                <p className="text-sm text-gray-700">${producto.precio}</p>
              </div>

              <button
                onClick={() => handleAgregar(producto)}
                className="text-white p-2 rounded-full font-bold transition"
                style={{ backgroundColor: "#000" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#7f2d51")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#000")}
                title="Agregar al carrito"
              >
                <FaCartPlus />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColeccionPage;
