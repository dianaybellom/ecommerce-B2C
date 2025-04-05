import { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import HeaderAdmin from "@/components/HeaderAdmin";
import {
  LayoutDashboard,
  Boxes,
  LogOut,
  X,
  ShoppingCart,
} from "lucide-react";

// ✅ Insertamos la variable de entorno
const API_URL = import.meta.env.VITE_API_URL;

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_URL}/logout`, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        navigate("/");
      } else {
        console.error("Error al cerrar sesión");
      }
    } catch (error) {
      console.error("Error en logout:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`fixed z-40 md:static bg-white shadow-lg transition-all duration-300 flex flex-col justify-between
          ${sidebarOpen ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0 md:w-64"}
          h-screen`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <span className="font-semibold text-lg">Administrador</span>
          <button className="md:hidden" onClick={toggleSidebar}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-2 space-y-2 flex-1">
          <Link
            to="/admin"
            className={`flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-200 ${
              isActive("/admin") ? "bg-gray-200 font-semibold" : ""
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/admin/productos"
            className={`flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-200 ${
              location.pathname.startsWith("/admin/productos")
                ? "bg-gray-200 font-semibold"
                : ""
            }`}
          >
            <Boxes className="w-5 h-5" />
            <span>Productos</span>
          </Link>

          <Link
            to="/admin/pedidos"
            className={`flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-200 ${
              location.pathname.startsWith("/admin/pedidos") ? "bg-gray-200 font-semibold" : ""
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Pedidos</span>
          </Link>
        </div>

        <div className="p-2 border-t">
          <button
            onClick={handleLogout}
            className="w-full text-left flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 text-red-600"
          >
            <LogOut className="w-5 h-5" />
            <span>Salir</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col w-full h-screen overflow-y-auto">
        <HeaderAdmin onMenuClick={toggleSidebar} />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;