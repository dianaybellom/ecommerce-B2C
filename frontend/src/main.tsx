import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import RegisterPage from "./pages/RegisterPage";
import MainLayout from "./layout/MainLayout";
import { Toaster } from "@/components/ui/toaster";
import "./index.css";
import ProductList from "@/components/products/ProductList";
import ProductForm from "@/components/products/ProductForm";
import AccessPage from "@/pages/AccessPage";
import AdminLayout from "@/layout/AdminLayout";
import AdminDashboard from "@/pages/AdminDashboard";
import ColeccionPage from "@/pages/ColeccionPage";
import ScrollToTop from "@/components/ui/ScrollToTop";
import CarritoPage from "./pages/CarritoPage";
import { CartProvider } from "@/context/CartContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CartProvider>
      <BrowserRouter>
      <ScrollToTop />
        <>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<App />} />
            <Route path="registro" element={<RegisterPage />} />
            <Route path="acceso" element={<AccessPage />} />
            <Route path="coleccion" element={<ColeccionPage />} />
            <Route path="carrito" element={<CarritoPage />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="productos" element={<ProductList />} />
            <Route path="productos/nuevo" element={<ProductForm />} />
            <Route path="productos/:id/editar" element={<ProductForm />} />
          </Route>
        </Routes>
        <Toaster duration={3000} />
        </>
      </BrowserRouter>
    </CartProvider>
  </React.StrictMode>
);
