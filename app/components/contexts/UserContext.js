'use client'
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
 
const login = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    
  };
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); 
    }
  }, [setUser]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const user = urlParams.get('user');
    const token = urlParams.get('token');

    if (user && token) {
        const parsedUser = JSON.parse(user);
        const userData = { 
            ...parsedUser, 
            token // Almacenar también el token generado
        };

        setUser(userData);  // Actualiza el contexto con los datos del usuario
        localStorage.setItem('user', JSON.stringify(userData));  // Guardar en localStorage
    }
}, []);
  

  /*const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("idCliente");

    setUser({ token: null, idCliente: null });
  };*/


  return (
    <UserContext.Provider value={{ user, setUser, login/*, logout*/ }}>
      {children}
    </UserContext.Provider>
  );
};
