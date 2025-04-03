import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Header() {
  const navMenuRef = useRef<HTMLElement>(null);
  const menuToggleRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const toggle = menuToggleRef.current;
    const nav = navMenuRef.current;

    if (toggle && nav) {
      const handleClick = () => {
        nav.classList.toggle("active");
      };
      toggle.addEventListener("click", handleClick);
      return () => toggle.removeEventListener("click", handleClick);
    }
  }, []);

  return (
    <header className="header">
      <div className="container d-flex justify-content-between align-items-center py-3">
        <div className="menu-toggle" ref={menuToggleRef}>
          <i className="fas fa-bars"></i>
        </div>

        <div className="logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
            <img src="/assets/images/arcadia-logo.png" alt="Arcadia Logo" />
        </div>


        <nav className="nav-menu" ref={navMenuRef}>
          <ul className="nav">
            <li className="nav-item">
              <Link className="nav-link" to="/coleccion">Colección</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/coleccion?categoria=vestidos">Vestidos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/coleccion?categoria=blusas">Blusas</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/coleccion?categoria=pantalones">Pantalones</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/coleccion?categoria=faldas">Faldas</Link>
            </li>
          </ul>
        </nav>


        <div className="header-icons">
          <a href="#" className="icon"><i className="fas fa-search"></i></a>
          <a href="#" className="icon"><i className="far fa-heart"></i></a>
          <a href="#" className="icon"><i className="fas fa-shopping-cart"></i></a>
          <Link to="/acceso" className="icon">
            <i className="far fa-user"></i>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
