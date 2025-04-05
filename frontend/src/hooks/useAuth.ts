import { useEffect, useState } from "react";

interface AuthUser {
  autenticado: boolean;
  usuario_id?: number;
  rol?: string;
}

export const useAuth = () => {
  const [auth, setAuth] = useState<AuthUser | null>(null);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/usuario-actual", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then(setAuth)
      .catch(() => setAuth({ autenticado: false }));
  }, []);

  return auth;
};
