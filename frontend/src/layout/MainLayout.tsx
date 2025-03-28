import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function MainLayout() {
  return (
    <>
      <Header />
      <main className="min-h-[80vh]">
        <Outlet /> {/* Aquí se renderiza App o RegisterPage */}
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
