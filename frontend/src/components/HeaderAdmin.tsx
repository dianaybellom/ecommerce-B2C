import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function HeaderAdmin() {
  const navigate = useNavigate();

  return (
    <header className="header bg-white shadow-md">
      <div className="container d-flex justify-between align-items-center py-3 px-4">
        <div
          className="logo"
          onClick={() => navigate("/admin")}
          style={{ cursor: "pointer" }}
        >
          <img
            src="/assets/images/arcadia-logo.png"
            alt="Arcadia Logo"
            className="h-8"
          />
        </div>

        <div className="header-icons">
          <Link to="/" className="icon" title="Volver al sitio público">
            <i className="far fa-user"></i>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default HeaderAdmin;
