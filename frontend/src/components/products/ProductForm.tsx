import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

const API_URL = import.meta.env.VITE_API_URL;

interface Producto {
  nombre: string;
  categoria: string;
  precio: number | string;
  descripcion: string;
  stock: number | string;
  imagen_base64: string;
  imagen?: string;
}

const ProductForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Producto>({
    nombre: "",
    categoria: "",
    precio: "",
    descripcion: "",
    stock: "",
    imagen_base64: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`${API_URL}/producto/${id}`, { credentials: "include" })
        .then((res) => res.json())
        .then((data) => {
          setFormData({
            ...data,
            precio: data.precio.toString(),
            stock: data.stock.toString(),
            imagen_base64: "",
          });
        })
        .catch((err) => {
          console.error("Error cargando producto", err);
          toast({ title: "Error", description: "No se pudo cargar el producto" });
        });
    }
  }, [id]);

  const convertirABase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImagenChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await convertirABase64(file);
      setFormData({ ...formData, imagen_base64: base64 });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === "precio" || name === "stock") {
      setFormData({
        ...formData,
        [name]: value === "" ? "" : value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validar campos numéricos antes de enviar
    if (formData.precio === "" || formData.stock === "") {
      toast({
        title: "Campos requeridos",
        description: "Debes ingresar un precio y stock válidos.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      const method = id ? "PUT" : "POST";
      const endpoint = id ? `${API_URL}/producto/${id}` : `${API_URL}/producto`;

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ...formData,
          precio: Number(formData.precio),
          stock: Number(formData.stock),
        }),
      });

      if (!response.ok) throw new Error("Error al guardar producto");

      toast({
        title: `Producto ${id ? "actualizado" : "creado"}`,
        description: "Operación realizada correctamente.",
      });

      navigate("/admin/productos");
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "No se pudo guardar el producto.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6">
        {id ? "Editar producto" : "Nuevo producto"}
      </h2>

      <div className="flex flex-col lg:flex-row gap-8">
        <form onSubmit={handleSubmit} className="w-full lg:w-1/2 space-y-4 flex flex-col">
          <div>
            <label className="block font-medium mb-1">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Categoría</label>
            <input
              type="text"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Precio</label>
              <input
                type="number"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">Descripción</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              rows={3}
            />
          </div>

          <div className="lg:hidden flex flex-col items-center bg-gray-100 p-4 rounded shadow">
            <label
              htmlFor="imagenInput"
              className="cursor-pointer bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition mb-4"
            >
              Seleccionar imagen
            </label>
            <input
              id="imagenInput"
              type="file"
              accept="image/*"
              onChange={handleImagenChange}
              className="hidden"
            />
            {formData.imagen_base64 ? (
              <img
                src={formData.imagen_base64}
                alt="Previsualización"
                className="w-full max-h-[300px] object-contain rounded"
              />
            ) : formData.imagen ? (
              <img
                src={`${API_URL}/${formData.imagen}`}
                alt="Imagen del producto"
                className="w-full max-h-[300px] object-contain rounded"
              />
            ) : (
              <p className="text-gray-500 text-sm text-center">
                No se ha seleccionado una imagen
              </p>
            )}
          </div>

          <Button type="submit" disabled={isLoading}>
            {id ? "Actualizar" : "Crear"} producto
          </Button>
        </form>

        {/* Imagen en escritorio */}
        <div className="hidden lg:flex lg:w-1/2 flex-col items-center bg-gray-100 p-6 rounded shadow">
          <label
            htmlFor="imagenInput"
            className="cursor-pointer bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition mb-6"
          >
            Seleccionar imagen
          </label>
          <input
            id="imagenInput"
            type="file"
            accept="image/*"
            onChange={handleImagenChange}
            className="hidden"
          />
          {formData.imagen_base64 ? (
            <img
              src={formData.imagen_base64}
              alt="Previsualización"
              className="w-full max-h-[500px] object-contain rounded"
            />
          ) : formData.imagen ? (
            <img
              src={`${API_URL}/${formData.imagen}`}
              alt="Imagen del producto"
              className="w-full max-h-[500px] object-contain rounded"
            />
          ) : (
            <p className="text-gray-500 text-sm text-center">
              No se ha seleccionado una imagen
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductForm;