const API_URL = "http://localhost:3001/productos";

export interface Producto {
  id?: number;
  nombre: string;
  categoria: string;
  precio: number;
}

// Obtener todos los productos
export const obtenerProductos = async (): Promise<Producto[]> => {
  const res = await fetch(API_URL);
  return await res.json();
};

// Crear un nuevo producto
export const crearProducto = async (producto: Producto): Promise<Producto> => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });
  return await res.json();
};

// Actualizar un producto
export const actualizarProducto = async (id: number, producto: Producto) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });
  return await res.json();
};

// Eliminar producto
export const eliminarProducto = async (id: number) => {
  return await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};

// Obtener un producto por ID
export const obtenerProductoPorId = async (id: number): Promise<Producto> => {
  const res = await fetch(`${API_URL}/${id}`);
  return await res.json();
};
