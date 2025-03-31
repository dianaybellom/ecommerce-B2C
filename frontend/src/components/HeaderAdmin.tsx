import { useNavigate, Link } from "react-router-dom"
import { Menu } from "lucide-react"

interface HeaderAdminProps {
  onMenuClick?: () => void
}

function HeaderAdmin({ onMenuClick }: HeaderAdminProps) {
  const navigate = useNavigate()

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

        {/* Ícono de usuario para volver al público */}
        <Link to="/" className="icon text-gray-700 hover:text-black" title="Volver al sitio público">
          <i className="far fa-user text-xl"></i>
        </Link>
      </div>
    </header>
  )
}

export default HeaderAdmin