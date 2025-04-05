import React, { createContext, useState, useEffect, useContext } from "react";

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  imagen: string;
}

interface CartContextType {
  carrito: Producto[];
  agregarProducto: (producto: Producto) => void;
  cantidadTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [carrito, setCarrito] = useState<Producto[]>([]);

  useEffect(() => {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }
  }, []);

  const agregarProducto = (producto: Producto) => {
    const nuevoCarrito = [...carrito];
    const index = nuevoCarrito.findIndex((p) => p.id === producto.id);

    if (index !== -1) {
      nuevoCarrito[index].cantidad += 1;
    } else {
      nuevoCarrito.push({ ...producto, cantidad: 1 });
    }

    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  const cantidadTotal = carrito.reduce((sum, item) => sum + item.cantidad, 0);

  return (
    <CartContext.Provider value={{ carrito, agregarProducto, cantidadTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de CartProvider");
  return context;
};