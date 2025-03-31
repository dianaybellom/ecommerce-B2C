import React, { useEffect, useState } from "react";
import {
  obtenerProductos,
  eliminarProducto,
  Producto,
} from "@/services/productService";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const navigate = useNavigate();

  const cargarProductos = async () => {
    const data = await obtenerProductos();
    setProductos(data);
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleEliminar = async (id: number) => {
    if (confirm("¿Estás seguro de eliminar este producto?")) {
      await eliminarProducto(id);
      cargarProductos(); // recarga la lista
    }
  };

  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Lista de Productos</h2>
        <button
          onClick={() => navigate("/productos/nuevo")}
          className="bg-black text-white px-4 py-2 rounded hover:bg-pink-700"
        >
          + Nuevo producto
        </button>
      </div>

      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="mb-4 px-3 py-2 border rounded w-full"
      />

      {productosFiltrados.length === 0 ? (
        <p className="text-gray-500">No hay productos disponibles.</p>
      ) : (
        <table className="w-full border border-gray-300 text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Nombre</th>
              <th className="p-2 border">Categoría</th>
              <th className="p-2 border">Precio</th>
              <th className="p-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.map((producto) => (
              <tr key={producto.id} className="hover:bg-gray-50">
                <td className="p-2 border">{producto.nombre}</td>
                <td className="p-2 border">{producto.categoria}</td>
                <td className="p-2 border">${producto.precio.toLocaleString()}</td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() =>
                      navigate(`/productos/${producto.id}/editar`)
                    }
                    className="text-blue-600 hover:underline"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleEliminar(producto.id!)}
                    className="text-red-600 hover:underline"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
};

export default ProductList;