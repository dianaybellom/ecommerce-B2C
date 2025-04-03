// src/components/ui/button.tsx
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button = ({ children, ...props }: ButtonProps) => (
  <button
    {...props}
    className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
  >
    {children}
  </button>
);
