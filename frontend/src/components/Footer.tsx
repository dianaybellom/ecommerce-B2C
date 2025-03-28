function Footer() {
    return (
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
    );
  }
  
  export default Footer;
  