import { useNavigate } from "react-router-dom";

const AccessPage = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow-lg max-w-md w-full text-center">

        <div className="space-y-4">
          <button
            onClick={() => navigate("/registro")}
            style={{ backgroundColor: "#000", color: "#fff" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#7f2d51")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#000")}
            className="w-full py-3 rounded transition"
          >
            Registrar como cliente
          </button>

          <button
            onClick={() => navigate("/admin")}
            className="w-full border border-black text-black py-3 rounded hover:bg-gray-200 transition"
          >
            Acceder como administrador
          </button>
        </div>
      </div>
    </main>
  );
};

export default AccessPage;
