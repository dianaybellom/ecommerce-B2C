import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import HeaderAdmin from "@/components/HeaderAdmin";
import {
  LayoutDashboard,
  Boxes,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-white shadow-lg transition-all duration-300 flex flex-col ${
          sidebarOpen ? "w-64" : "w-16"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <span className={`font-semibold text-lg ${!sidebarOpen && "hidden"}`}>
            Administrador
          </span>
          <button onClick={toggleSidebar}>
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Navegación */}
        <nav className="flex flex-col justify-between h-full p-2">
          {/* Enlaces superiores */}
          <div className="space-y-2">
            <Link
              to="/admin"
              className={`flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-200 ${
                isActive("/admin") ? "bg-gray-200 font-semibold" : ""
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              {sidebarOpen && <span>Dashboard</span>}
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
              {sidebarOpen && <span>Productos</span>}
            </Link>
          </div>

          {/* Enlaces inferiores */}
          <div className="space-y-2 mt-8">
            <Link
              to="/"
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 text-gray-600"
            >
              <i className="fas fa-store"></i>
              {sidebarOpen && <span>Acceder como cliente</span>}
            </Link>

            <Link
              to="/"
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 text-red-600"
            >
              <LogOut className="w-5 h-5" />
              {sidebarOpen && <span>Salir</span>}
            </Link>
          </div>
        </nav>
      </aside>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col">
        <HeaderAdmin />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;