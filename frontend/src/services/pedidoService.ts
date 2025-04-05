const API_URL = import.meta.env.VITE_API_URL;

export interface PedidoProducto {
  producto_id: number;
  cantidad: number;
}

export async function crearPedido(productos: PedidoProducto[]) {
  const res = await fetch(`${API_URL}/pedido`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Necesario si usas cookies para sesiones
    body: JSON.stringify({ productos }),
  });

  if (!res.ok) {
    throw res; // Esto permite que el componente capture y lea el error con res.json()
  }

  return res.json();
}