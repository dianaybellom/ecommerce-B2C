import React from "react";

interface ProductProps {
  nombre: string;
  precio: number;
  imagen_base64: string;
  descripcion: string;
  categoria: string;
}

const ProductCard: React.FC<ProductProps> = ({ nombre, precio, imagen_base64 }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden p-4">
      <img
        src={imagen_base64}
        alt={nombre}
        className="w-full h-60 object-contain mb-2"
      />
      <h3 className="font-semibold text-lg">{nombre}</h3>
      <p className="text-gray-700 font-medium">${precio}</p>
    </div>
  );
};

export default ProductCard;
