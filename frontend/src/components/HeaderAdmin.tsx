import { useNavigate} from "react-router-dom"
import { Menu, User } from "lucide-react"

// Variable de entorno
const API_URL = import.meta.env.VITE_API_URL

interface HeaderAdminProps {
  onMenuClick?: () => void
}

function HeaderAdmin({ onMenuClick }: HeaderAdminProps) {
  const navigate = useNavigate()

  // Función logout usando variable de entorno
  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_URL}/logout`, {
        method: "GET",
        credentials: "include",
      })

      if (response.ok) {
        navigate("/") // redirigir al sitio público
      } else {
        console.error("Error al cerrar sesión")
      }
    } catch (error) {
      console.error("Error en logout:", error)
    }
  }

  return (
    <header className="bg-white shadow-md border-b md:sticky top-0 z-30">
      <div className="flex justify-between items-center px-4 py-3">
        {/* Botón hamburguesa solo visible en móvil */}
        <button
          onClick={onMenuClick}
          className="md:hidden text-gray-700 hover:text-black"
          aria-label="Abrir menú"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Logo central (navega a /admin) */}
        <div
          onClick={() => navigate("/admin")}
          style={{ cursor: "pointer" }}
          className="flex-1 text-center md:text-left"
        >
          <img
            src="/assets/images/arcadia-logo.png"
            alt="Arcadia Logo"
            className="h-8 mx-auto md:mx-0"
          />
        </div>

        {/* Volver al sitio público */}
        <div className="flex items-center gap-3">

          {/* Botón de salir */}
          <button
            onClick={handleLogout}
            className="text-gray-700 hover:text-black"
          >
            <User className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  )
}

export default HeaderAdmin