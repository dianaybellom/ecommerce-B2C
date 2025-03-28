import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

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
            <li className="nav-item"><a className="nav-link" href="#">Colección</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Vestidos</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Blusas</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Pantalones</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Faldas</a></li>
          </ul>
        </nav>

        <div className="header-icons">
          <a href="#" className="icon"><i className="fas fa-search"></i></a>
          <a href="#" className="icon"><i className="far fa-heart"></i></a>
          <a href="#" className="icon"><i className="fas fa-shopping-cart"></i></a>
          <button onClick={() => navigate("/registro")} className="icon">
            <i className="far fa-user"></i>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
