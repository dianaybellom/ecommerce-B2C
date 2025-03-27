import { useEffect, useRef } from "react";

function App() {
  const navMenuRef = useRef<HTMLElement>(null);
  const menuToggleRef = useRef<HTMLDivElement>(null);

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
    <>
      {/* CABECERA */}
      <header className="header">
        <div className="container d-flex justify-content-between align-items-center py-3">
          <div className="menu-toggle" ref={menuToggleRef}>
            <i className="fas fa-bars"></i>
          </div>

          <div className="logo">
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
            <a href="#" className="icon"><i className="far fa-user"></i></a>
          </div>
        </div>
      </header>

      {/* BANNER PRINCIPAL */}
      <section className="hero-banner">
        <img src="/assets/images/banner-1.png" className="img-fluid" alt="Banner Arcadia" />
        <div className="banner-text">
          <h1>FLEUR D’AVENIR | SPRING 2025</h1>
          <a href="#" className="btn btn-custom">Ver colección</a>
        </div>
      </section>

      {/* SECCIÓN SOBRE LA COLECCIÓN */}
      <section className="about-collection">
        <div className="container d-flex align-items-center">
          <div className="text-content">
            <h2>SOBRE LA COLECCIÓN</h2>
            <p>Inspirada en el futuro, impregnada de la gracia des cerisiers</p>
          </div>
          <div className="gif-content">
            <img src="/assets/images/cherry-blossom.gif" alt="Pétalos de Cerezo" className="falling-petals" />
          </div>
        </div>
      </section>

      {/* SECCIÓN DE CATEGORÍAS */}
      <section className="categories">
        <div className="categories-container">
          <div className="category-item">
            <img src="/assets/images/category-dresses.jpg" alt="Vestidos" />
            <h3>Vestidos</h3>
          </div>
          <div className="category-item">
            <img src="/assets/images/category-blouses.jpg" alt="Blusas" />
            <h3>Blusas</h3>
          </div>
          <div className="category-item">
            <img src="/assets/images/category-pants.jpg" alt="Pantalones" />
            <h3>Pantalones</h3>
          </div>
        </div>
      </section>



      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <img src="/assets/images/arcadia-logo.png" alt="Arcadia Logo" />
            </div>
            <div className="footer-social">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fa-brands fa-x-twitter"></i></a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Arcadia - Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;