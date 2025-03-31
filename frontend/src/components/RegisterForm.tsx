import React, { useEffect, useState } from "react";
import {
  crearProducto,
  actualizarProducto,
  obtenerProductoPorId,
  Producto,
} from "@/services/productService";
import { useNavigate, useParams } from "react-router-dom";

const ProductForm = () => {
  const [formData, setFormData] = useState<Producto | null>(null);
  const [errores, setErrores] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();
  const { id } = useParams();

  // Cargar datos si estamos en modo edición
  useEffect(() => {
    if (id) {
      obtenerProductoPorId(Number(id)).then((data) => {
        setFormData(data);
      });
    } else {
      // Si estamos creando, inicializamos vacío
      setFormData({
        nombre: "",
        categoria: "",
        precio: 0,
      });
    }
  }, [id]);

  const validar = () => {
    if (!formData) return false;
    const errores: { [key: string]: string } = {};
    if (!formData.nombre.trim()) errores.nombre = "El nombre es obligatorio.";
    if (!formData.categoria.trim()) errores.categoria = "La categoría es obligatoria.";
    if (formData.precio <= 0) errores.precio = "El precio debe ser mayor a 0.";
    setErrores(errores);
    return Object.keys(errores).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!formData) return;
    setFormData({
      ...formData,
      [name]: name === "precio" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData || !validar()) return;

    if (id) {
      await actualizarProducto(Number(id), formData);
    } else {
      await crearProducto(formData);
    }

    navigate("/admin/productos");
  };

  const handleCancel = () => {
    navigate("/admin/productos");
  };

  // Mostrar loading mientras se carga data
  if (!formData) {
    return <p className="text-center text-gray-500">Cargando producto...</p>;
  }

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        {id ? "Editar producto" : "Nuevo producto"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          {errores.nombre && <p className="text-red-500 text-sm mt-1">{errores.nombre}</p>}
        </div>

        <div>
          <label className="block font-medium mb-1">Categoría</label>
          <input
            type="text"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          {errores.categoria && <p className="text-red-500 text-sm mt-1">{errores.categoria}</p>}
        </div>

        <div>
          <label className="block font-medium mb-1">Precio</label>
          <input
            type="number"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          {errores.precio && <p className="text-red-500 text-sm mt-1">{errores.precio}</p>}
        </div>

        {/* Botones de acción */}
        <div className="text-right pt-4 space-x-2">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Cancelar
          </button>

          <button
            type="submit"
            style={{ backgroundColor: "#000", color: "#fff" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#7f2d51")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#000")}
            className="px-6 py-2 rounded transition"
          >
            {id ? "Actualizar producto" : "Crear producto"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default ProductForm;
