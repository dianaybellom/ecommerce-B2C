
import React, { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    dia: "",
    mes: "",
    año: "",
    correo: "",
    confirmarCorreo: "",
    contraseña: "",
    confirmarContraseña: "",
    telefono: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    let error = "";
    switch (name) {
      case "nombre":
      case "apellido":
        if (!value.trim()) error = "Este campo es obligatorio.";
        break;
      case "correo":
        if (!value) error = "Correo obligatorio.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = "Correo no válido.";
        break;
      case "confirmarCorreo":
        if (value !== formData.correo) error = "Los correos no coinciden.";
        break;
      case "contraseña":
        if (value.length < 8)
          error = "Debe tener al menos 8 caracteres.";
        else if (!/[A-Z]/.test(value) || !/[0-9]/.test(value))
          error = "Debe incluir una mayúscula y un número.";
        break;
      case "confirmarContraseña":
        if (value !== formData.contraseña)
          error = "Las contraseñas no coinciden.";
        break;
      case "dia":
      case "mes":
      case "año":
        if (!formData.dia || !formData.mes || !formData.año)
          error = "Fecha de nacimiento incompleta.";
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};
    if (!formData.nombre.trim()) newErrors.nombre = "Este campo es obligatorio.";
    if (!formData.apellido.trim()) newErrors.apellido = "Este campo es obligatorio.";
    if (!formData.dia || !formData.mes || !formData.año)
      newErrors.dia = "Fecha de nacimiento incompleta.";
    if (!formData.correo)
      newErrors.correo = "Correo obligatorio.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo))
      newErrors.correo = "Correo no válido.";
    if (formData.confirmarCorreo !== formData.correo)
      newErrors.confirmarCorreo = "Los correos no coinciden.";
    if (formData.contraseña.length < 8)
      newErrors.contraseña = "Debe tener al menos 8 caracteres.";
    else if (!/[A-Z]/.test(formData.contraseña) || !/[0-9]/.test(formData.contraseña))
      newErrors.contraseña = "Debe incluir una mayúscula y un número.";
    if (formData.confirmarContraseña !== formData.contraseña)
      newErrors.confirmarContraseña = "Las contraseñas no coinciden.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast({
        title: "Error de validación",
        description: "Corrige los errores antes de enviar.",
        variant: "destructive",
      });
      return;
    }

    const payload = {
      nombre: formData.nombre,
      apellido: formData.apellido,
      fecha_nacimiento: `${formData.año}-${formData.mes.padStart(2, "0")}-${formData.dia.padStart(2, "0")}`,
      correo: formData.correo,
      contrasena: formData.contraseña,
      telefono: formData.telefono,
      ...(formData.correo === "dianabellomejia_@hotmail.com" && { rol: "ADMIN" }),
    };

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.status === 409) {
        toast({
          title: "Correo ya registrado",
          description: "Intenta con otro correo electrónico.",
          variant: "destructive",
        });
        return;
      }

      if (!response.ok) throw new Error("Error al registrar el usuario");

      toast({
        title: "Registro exitoso",
        description: "Tu cuenta fue creada correctamente.",
      });

      setTimeout(() => {
        navigate("/acceso");
      }, 2000);
    } catch (err) {
      console.error(err);
      toast({
        title: "Error de servidor",
        description: "No se pudo completar el registro.",
        variant: "destructive",
      });
    }
  };

  return (
    <main className="bg-gray-100 min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow-md w-full">
        <h2 className="text-2xl font-semibold text-center mb-6">Crear una cuenta</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nombre *</label>
              <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Tu nombre" className="w-full border rounded px-3 py-2" />
              {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Apellido *</label>
              <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} placeholder="Tu apellido" className="w-full border rounded px-3 py-2" />
              {errors.apellido && <p className="text-red-500 text-sm">{errors.apellido}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Fecha de nacimiento *</label>
            <div className="grid grid-cols-3 gap-4">
              <select name="dia" value={formData.dia} onChange={handleChange} className="border rounded px-3 py-2">
                <option value="">Día</option>
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
              <select name="mes" value={formData.mes} onChange={handleChange} className="border rounded px-3 py-2">
                <option value="">Mes</option>
                {[ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ]
                  .map((mes, i) => (<option key={i + 1} value={i + 1}>{mes}</option>))}
              </select>
              <select name="año" value={formData.año} onChange={handleChange} className="border rounded px-3 py-2">
                <option value="">Año</option>
                {Array.from({ length: 100 }, (_, i) => {
                  const year = new Date().getFullYear() - i;
                  return <option key={year} value={year}>{year}</option>;
                })}
              </select>
            </div>
            {(errors.dia || errors.mes || errors.año) && <p className="text-red-500 text-sm">Fecha de nacimiento incompleta o inválida.</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Correo electrónico *</label>
            <input type="email" name="correo" value={formData.correo} onChange={handleChange} placeholder="correo@ejemplo.com" className="w-full border rounded px-3 py-2" />
            {errors.correo && <p className="text-red-500 text-sm">{errors.correo}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Confirmar correo *</label>
            <input type="email" name="confirmarCorreo" value={formData.confirmarCorreo} onChange={handleChange} placeholder="Vuelve a escribir tu correo" className="w-full border rounded px-3 py-2" />
            {errors.confirmarCorreo && <p className="text-red-500 text-sm">{errors.confirmarCorreo}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Contraseña *</label>
              <input type="password" name="contraseña" value={formData.contraseña} onChange={handleChange} placeholder="••••••••" className="w-full border rounded px-3 py-2" />
              {errors.contraseña && <p className="text-red-500 text-sm">{errors.contraseña}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Confirmar contraseña *</label>
              <input type="password" name="confirmarContraseña" value={formData.confirmarContraseña} onChange={handleChange} placeholder="••••••••" className="w-full border rounded px-3 py-2" />
              {errors.confirmarContraseña && <p className="text-red-500 text-sm">{errors.confirmarContraseña}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Teléfono</label>
            <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} placeholder="+1 8090000000" className="w-full border rounded px-3 py-2" />
          </div>

          <div>
            <button type="submit" style={{ backgroundColor: "#000", color: "#fff" }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#7f2d51")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#000")} className="w-full py-2 rounded transition">
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default RegisterForm;
