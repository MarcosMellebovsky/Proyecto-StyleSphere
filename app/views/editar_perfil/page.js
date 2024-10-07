"use client";
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../components/contexts/UserContext";
import Navegador from "@/app/components/navegador";
import Link from "next/link";
import styles from "./perfil.module.css";

const EditarPerfil = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const { user } = useContext(UserContext);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setImageSrc(fileURL);
      // Guardar la URL de la imagen en localStorage
      localStorage.setItem("profileImage", fileURL);
    }
  };

  useEffect(() => {
    // Recuperar la imagen desde localStorage cuando el componente se monta
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
      setImageSrc(savedImage);
    }
    console.log("User context:", user);
  }, [user]);

  return (<>
    <div className={styles.container}>
      <header className={styles.header}>
        <Link className={styles.backButton} href="./perfil">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
          </svg>
        </Link>
        <h1 className={styles.title}>Editar Perfil</h1>
      </header>
      <div className={styles.profileHeader}>
          <div className={styles.photoContainer}>
            <input
              type="file"
              onChange={handleFileInputChange}
              className={styles.fileInput}
              id="fileInput"
            />
            <label htmlFor="fileInput" className={styles.photoLabel}>
              {imageSrc ? (
                <img src={imageSrc} alt="✏️" className={styles.profileImage} />
              ) : (
                ""
              )}
            </label>
          </div>
        </div>
        <div className={styles.inputGroup}>
            <label className={styles.label}>Correo electrónico</label>

              <input
                required
                placeholder= {user && user.nombre 
                  ? `${user.nombre}` 
                  : "Cargando..."}
                className={styles.input}
              />
            
            </div>
            <div className={styles.inputGroup}>
            <label className={styles.label}>Contraseña</label>

              <input
                required
                type="password"
                className={styles.input}
                placeholder= {user && user.nombre 
                  ? `${user.nombre}` 
                  : "Cargando..."}
              />
             
            </div>
            <button
                className={styles.submit}
                type="submit"
              
              >
                Iniciar sesion
              </button>
          </div>

      <Navegador />
    

</>
  );
};

export default EditarPerfil;
