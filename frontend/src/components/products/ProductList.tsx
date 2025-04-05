import { useEffect, useState } from "react";
import {
  obtenerProductos,
  eliminarProducto,
  Producto,
} from "@/services/productService";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash } from "lucide-react";

const limitePorPagina = 10;

const ProductList = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const [hayMasPaginas, setHayMasPaginas] = useState(false);
  const navigate = useNavigate();

  const cargarProductos = async () => {
    const data = await obtenerProductos(paginaActual, limitePorPagina);
    setProductos(data);
    // Si se devuelve menos del límite, no hay más páginas
    setHayMasPaginas(data.length === limitePorPagina);
  };

  useEffect(() => {
    cargarProductos();
  }, [paginaActual]);

  const handleEliminar = async (id: number) => {
    if (confirm("¿Estás seguro de eliminar este producto?")) {
      await eliminarProducto(id);
      cargarProductos();
    }
  };

  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Productos</h2>
        <button
          onClick={() => navigate("/admin/productos/nuevo")}
          style={{ backgroundColor: "#000", color: "#fff" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#7f2d51")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#000")
          }
          className="px-4 py-2 rounded transition"
        >
          + Nuevo producto
        </button>
      </div>

      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="mb-6 px-3 py-2 border rounded w-full"
      />

    <div className="space-y-4">
      {productosFiltrados.length === 0 ? (
        <p className="text-gray-500">No hay productos disponibles.</p>
      ) : (
        productosFiltrados.map((producto) => (
          <div
            key={producto.id}
            className="bg-white border rounded shadow-sm p-4 flex gap-4 items-center hover:shadow-md transition-transform duration-300 hover:scale-105"
          >
            {/* Imagen del producto */}
            {producto.imagen && (
              <img
                src={`${import.meta.env.VITE_API_URL}/${producto.imagen}`}
                alt={producto.nombre}
                className="w-24 h-24 object-contain"
              />
            )}

            {/* Info del producto */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{producto.nombre}</h3>
              <p className="text-sm text-gray-600">
                Categoría: {producto.categoria}
              </p>
              <p className="text-sm text-gray-800 font-medium">
                Precio: ${producto.precio.toLocaleString()}
              </p>
            </div>

            {/* Acciones */}
            <div className="flex gap-3 items-center">
              <button
                onClick={() =>
                  navigate(`/admin/productos/${producto.id}/editar`)
                }
                className="text-[#7f2d51] hover:text-pink-700 hover:scale-110 transition-transform duration-200"
                title="Editar"
              >
                <Pencil className="w-5 h-5" />
              </button>

              <button
                onClick={() => handleEliminar(producto.id!)}
                className="text-gray-400 hover:text-gray-600 hover:scale-110 transition-transform duration-200"
                title="Eliminar"
              >
                <Trash className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))
      )}
    </div>


      {/* Paginación */}
      <div className="flex justify-between mt-6 items-center">
        <button
          onClick={() => setPaginaActual((prev) => Math.max(prev - 1, 1))}
          disabled={paginaActual === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="text-sm text-gray-700">Página {paginaActual}</span>
        <button
          onClick={() => setPaginaActual((prev) => prev + 1)}
          disabled={!hayMasPaginas}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </main>
  );
};

export default ProductList;
