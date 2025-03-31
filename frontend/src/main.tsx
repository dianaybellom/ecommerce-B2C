import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import RegisterPage from "./pages/RegisterPage";
import MainLayout from "./layout/MainLayout";
import { Toaster } from "@/components/ui/toaster"; // 👈 Importar Toaster
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<App />} />
            <Route path="registro" element={<RegisterPage />} />
          </Route>
        </Routes>
        <Toaster /> {/* Esto mostrará los toast en cualquier parte */}
      </>
    </BrowserRouter>
  </React.StrictMode>
);
