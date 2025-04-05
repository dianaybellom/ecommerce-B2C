const API_URL = import.meta.env.VITE_API_URL;

export interface Producto {
  id?: number;
  nombre: string;
  categoria: string;
  precio: number;
  descripcion?: string;
  stock?: number;
  imagen?: string;
  imagen_base64?: string;
}

// Obtener productos con paginación
export const obtenerProductos = async (
  pagina = 1,
  limite = 10
): Promise<Producto[]> => {
  const offset = (pagina - 1) * limite;
  const response = await fetch(
    `${API_URL}/producto?offset=${offset}&limit=${limite}`,
    {
      credentials: "include",
    }
  );

  if (!response.ok) {
    console.error("Error al obtener productos");
    throw new Error("No se pudo cargar la lista de productos");
  }

  return await response.json();
};

// Obtener un producto por ID
export const obtenerProductoPorId = async (id: number): Promise<Producto> => {
  const response = await fetch(`${API_URL}/producto/${id}`, {
    credentials: "include",
  });

  if (!response.ok) {
    console.error(`Producto con ID ${id} no encontrado`);
    throw new Error("Producto no encontrado");
  }

  return await response.json();
};

// Crear un nuevo producto
export const crearProducto = async (
  producto: Producto
): Promise<Producto> => {
  const response = await fetch(`${API_URL}/producto`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(producto),
  });

  if (!response.ok) {
    throw new Error("Error al crear producto");
  }

  return await response.json();
};

// Actualizar un producto existente
export const actualizarProducto = async (
  id: number,
  producto: Producto
): Promise<Producto> => {
  const response = await fetch(`${API_URL}/producto/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(producto),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar producto");
  }

  return await response.json();
};

// Eliminar un producto
export const eliminarProducto = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/producto/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error al eliminar producto");
  }
};