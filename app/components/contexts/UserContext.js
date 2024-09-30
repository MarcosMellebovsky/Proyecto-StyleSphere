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
