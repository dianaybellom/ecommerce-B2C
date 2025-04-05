import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const API_URL = import.meta.env.VITE_API_URL;

function Header() {
  const navMenuRef = useRef<HTMLElement>(null);
  const menuToggleRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { cantidadTotal } = useCart();

  const [logueado, setLogueado] = useState(false);
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const toggle = menuToggleRef.current;
    const nav = navMenuRef.current;
    if (toggle && nav) {
      const handleClick = () => nav.classList.toggle("active");
      toggle.addEventListener("click", handleClick);
      return () => toggle.removeEventListener("click", handleClick);
    }
  }, []);

  useEffect(() => {
    const verificarSesion = async () => {
      try {
        const res = await fetch(`${API_URL}/usuario-actual`, {
          credentials: "include",
        });
        const data = await res.json();
        setLogueado(data?.autenticado === true);
      } catch (err) {
        console.error("Error al verificar sesión:", err);
        setLogueado(false);
      } finally {
        setLoading(false);
      }
    };
    verificarSesion();
  }, []);

  const cerrarSesion = async () => {
    try {
      await fetch(`${API_URL}/logout`, {
        method: "GET",
        credentials: "include",
      });
      document.cookie =
        "ci_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      localStorage.removeItem("usuario");
      setLogueado(false);
      setMostrarMenu(false);
      navigate("/acceso");
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
    }
  };

  if (loading) return null;

  return (
    <header className="header">
      <div className="container d-flex justify-between align-items-center py-3">
        <div className="menu-toggle" ref={menuToggleRef}>
          <i className="fas fa-bars"></i>
        </div>

        <div
          className="logo"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          <img src="/assets/images/arcadia-logo.png" alt="Arcadia Logo" />
        </div>

        <nav className="nav-menu" ref={navMenuRef}>
          <ul className="nav">
            <li className="nav-item">
              <Link className="nav-link" to="/coleccion">
                Colección
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/coleccion?categoria=vestidos">
                Vestidos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/coleccion?categoria=blusas">
                Blusas
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/coleccion?categoria=pantalones">
                Pantalones
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/coleccion?categoria=faldas">
                Faldas
              </Link>
            </li>
          </ul>
        </nav>

        <div className="header-icons flex gap-4 relative">
          <a href="#" className="icon">
            <i className="fas fa-search"></i>
          </a>
          <a href="#" className="icon">
            <i className="far fa-heart"></i>
          </a>

          <Link to="/carrito" className="icon relative">
            <i className="fas fa-shopping-cart"></i>
            {cantidadTotal > 0 && (
              <span
                className="absolute -top-2 -right-2 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full"
                style={{ backgroundColor: "#7f2d51" }}
              >
                {cantidadTotal}
              </span>
            )}
          </Link>

          {logueado ? (
            <div className="relative">
              <button
                onClick={() => setMostrarMenu(!mostrarMenu)}
                className="icon"
              >
                <i className="far fa-user"></i>
              </button>

              {mostrarMenu && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
                  <Link
                    to="/mis-pedidos"
                    onClick={() => setMostrarMenu(false)}
                    className="block px-4 py-2 text-sm font-medium text-black hover:bg-[#7f2d51] hover:text-white transition-colors"
                  >
                    Pedidos
                  </Link>
                  <button
                    onClick={cerrarSesion}
                    className="w-full text-left px-4 py-2 text-sm font-medium text-black hover:bg-[#7f2d51] hover:text-white transition-colors"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/acceso" className="icon">
              <i className="far fa-user"></i>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;