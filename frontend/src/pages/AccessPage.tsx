import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

const API_URL = import.meta.env.VITE_API_URL;

const AccessPage = () => {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, contrasena }),
        credentials: "include" // clave para enviar y guardar cookies
      });
      

      if (!response.ok) throw new Error("Credenciales inválidas");

      const data = await response.json();
      localStorage.setItem("usuario", JSON.stringify(data.usuario));

      toast({
        title: "Sesión iniciada",
        description: `Bienvenido, ${data.usuario.nombre}`,
      });

      // Redirección por rol
      if (data.usuario.rol === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      toast({
        title: "Error al iniciar sesión",
        description: "Verifica tus credenciales.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-5xl shadow-md rounded grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Login */}
        <div className="bg-gray-100 p-8">
          <h2 className="text-xl md:text-2xl font-bold mb-2">INICIAR SESIÓN</h2>
          <p className="text-sm text-gray-700 mb-6">Ingresa con tu correo electrónico y contraseña</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Correo electrónico *"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
              className="w-full border rounded px-4 py-2"
            />
            <input
              type="password"
              placeholder="Contraseña *"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
              className="w-full border rounded px-4 py-2"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded text-white font-semibold transition"
              style={{ backgroundColor: "#000" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#7f2d51")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#000")}
            >
              {loading ? "Ingresando..." : "INICIAR SESIÓN"}
            </button>
          </form>
        </div>

        {/* Registro */}
        <div className="flex flex-col items-center justify-center bg-white p-8">
          <h2 className="text-xl md:text-2xl font-bold mb-2">CREAR UNA CUENTA</h2>
          <p className="text-sm text-gray-700 text-center mb-6">
            Regístrate para disfrutar de todos los beneficios.
          </p>

          <button
            onClick={() => navigate("/registro")}
            className="w-full border border-black py-3 px-6 rounded hover:bg-gray-200 transition text-black font-semibold"
          >
            CREAR CUENTA
          </button>
        </div>
      </div>
    </main>
  );
};

export default AccessPage;
