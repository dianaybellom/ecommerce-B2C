const API_URL = "http://localhost:3001/productos";

export interface Producto {
  id?: number;
  nombre: string;
  categoria: string;
  precio: number;
}

// Obtener productos con paginación
export const obtenerProductos = async (pagina = 1, limite = 10): Promise<Producto[]> => {
    const start = (pagina - 1) * limite;
    const res = await fetch(`${API_URL}?_start=${start}&_limit=${limite}`);
    return await res.json();
  };
  

// Obtener un producto por ID
export const obtenerProductoPorId = async (id: number): Promise<Producto> => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) {
    console.error(`Producto con ID ${id} no encontrado`);
    throw new Error("Producto no encontrado");
  }
  return await res.json();
};

// Crear un nuevo producto
export const crearProducto = async (
  producto: Producto
): Promise<Producto> => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });

  if (!res.ok) {
    throw new Error("Error al crear producto");
  }

  return await res.json();
};

// Actualizar un producto existente
export const actualizarProducto = async (
  id: number,
  producto: Producto
): Promise<Producto> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });

  if (!res.ok) {
    throw new Error("Error al actualizar producto");
  }

  return await res.json();
};

// Eliminar un producto
export const eliminarProducto = async (id: number): Promise<void> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Error al eliminar producto");
  }
};
