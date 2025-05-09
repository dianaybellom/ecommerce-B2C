import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

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
      {/* BANNER PRINCIPAL */}
      <section className="hero-banner">
        <img src="/assets/images/banner-1.png" className="img-fluid" alt="Banner Arcadia" />
        <div className="banner-text">
          <h1>FLEUR D’AVENIR | SPRING 2025</h1>
          <Link to="/coleccion" className="btn btn-custom">Ver colección</Link>
        </div>
      </section>

      {/* SECCIÓN SOBRE LA COLECCIÓN */}
      <section className="about-collection">
          <div className="text-content" style={{ textAlign: "center"}} >
            <h2>SOBRE LA COLECCIÓN</h2>
            <p>Inspirada en el futuro, impregnada de la gracia des cerisiers</p>
          </div>
      </section>

      {/* SECCIÓN DE CATEGORÍAS */}
      <section className="categories">
        <div className="categories-container">
          <Link to="/coleccion?categoria=vestidos" className="category-item">
            <img src="/assets/images/category-dresses.jpg" alt="Vestidos" />
            <h3>Vestidos</h3>
          </Link>

          <Link to="/coleccion?categoria=blusas" className="category-item">
            <img src="/assets/images/category-blouses.jpg" alt="Blusas" />
            <h3>Blusas</h3>
          </Link>

          <Link to="/coleccion?categoria=pantalones" className="category-item">
            <img src="/assets/images/category-pants.jpg" alt="Pantalones" />
            <h3>Pantalones</h3>
          </Link>
        </div>
      </section>
    </>
  );
}

export default App;
