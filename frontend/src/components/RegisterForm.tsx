import React from "react";

const RegisterForm = () => {
  return (
    <main className="bg-gray-100 min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow-md w-full">
        <h2 className="text-2xl font-semibold text-center mb-6">Crear una cuenta</h2>

        <form className="space-y-4">
          {/* Nombre y Apellido */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nombre *</label>
              <input
                type="text"
                placeholder="Tu nombre"
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Apellido *</label>
              <input
                type="text"
                placeholder="Tu apellido"
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>

        {/* Fecha de nacimiento */}
        <div>
        <label className="block text-sm font-medium mb-1">Fecha de nacimiento *</label>
        <div className="grid grid-cols-3 gap-4">
            {/* Día */}
            <select className="border rounded px-3 py-2">
            <option value="">Día</option>
            {Array.from({ length: 31 }, (_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
            </select>

            {/* Mes */}
            <select className="border rounded px-3 py-2">
            <option value="">Mes</option>
            {[
                "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
            ].map((mes, i) => (
                <option key={i + 1} value={i + 1}>{mes}</option>
            ))}
            </select>

            {/* Año */}
            <select className="border rounded px-3 py-2">
            <option value="">Año</option>
            {Array.from({ length: 100 }, (_, i) => {
                const year = new Date().getFullYear() - i;
                return <option key={year} value={year}>{year}</option>;
            })}
            </select>
        </div>
        </div>


          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Correo electrónico *</label>
            <input
              type="email"
              placeholder="correo@ejemplo.com"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Confirmar Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Confirmar correo *</label>
            <input
              type="email"
              placeholder="Vuelve a escribir tu correo"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Contraseña y Confirmación */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Contraseña *</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Confirmar contraseña *</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-sm font-medium mb-1">Teléfono</label>
            <input
              type="tel"
              placeholder="+57 300 000 0000"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Botón */}
          <div>
          <button
            style={{ backgroundColor: "#000", color: "#fff" }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#7f2d51")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#000")}
            className="w-full py-2 rounded transition"
            >
            Registrarse
            </button>



          </div>
        </form>
      </div>
    </main>
  );
};

export default RegisterForm;
