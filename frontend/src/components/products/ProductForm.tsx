import React, { useEffect, useState } from "react";
import {
  crearProducto,
  actualizarProducto,
  obtenerProductoPorId,
  Producto,
} from "@/services/productService";
import { useNavigate, useParams } from "react-router-dom";

const ProductForm = () => {
  const [formData, setFormData] = useState<Producto>({
    nombre: "",
    categoria: "",
    precio: 0,
  });

  const [errores, setErrores] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();
  const { id } = useParams();

  // Cargar datos si estamos en modo edición
  useEffect(() => {
    if (id) {
      obtenerProductoPorId(Number(id)).then((data) => setFormData(data));
    }
  }, [id]);

  // Validar campos simples
  const validar = () => {
    const errores: { [key: string]: string } = {};
    if (!formData.nombre.trim()) errores.nombre = "El nombre es obligatorio.";
    if (!formData.categoria.trim()) errores.categoria = "La categoría es obligatoria.";
    if (formData.precio <= 0) errores.precio = "El precio debe ser mayor a 0.";
    setErrores(errores);
    return Object.keys(errores).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "precio" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validar()) return;

    if (id) {
      await actualizarProducto(Number(id), formData);
    } else {
      await crearProducto(formData);
    }

    navigate("/productos");
  };

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">
        {id ? "Editar producto" : "Nuevo producto"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          {errores.nombre && (
            <p className="text-red-500 text-sm">{errores.nombre}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Categoría</label>
          <input
            type="text"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          {errores.categoria && (
            <p className="text-red-500 text-sm">{errores.categoria}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Precio</label>
          <input
            type="number"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          {errores.precio && (
            <p className="text-red-500 text-sm">{errores.precio}</p>
          )}
        </div>

        <div>
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded hover:bg-pink-700"
          >
            {id ? "Actualizar" : "Crear"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default ProductForm;
