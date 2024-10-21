"use client";
import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../components/contexts/UserContext";
import Navegador from "@/app/components/navegador";
import styles from "./perfil.module.css";
import { useRouter } from "next/navigation";

const UserProfile = () => {
  const [imageSrc, setImageSrc] = useState(null); // Añadido estado para la imagen
  const { user } = useContext(UserContext);
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(`${path}?from=Perfil`);
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setImageSrc(fileURL); // Actualiza el estado con la URL del archivo

      // Subir la imagen al servidor
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch(`http://localhost:3001/api/upload`, { // Cambia la ruta si es necesario
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Error al subir la imagen');
        }

        const data = await response.json();
        await updateProfileImage(data.url); // Actualiza la imagen en la base de datos

      } catch (error) {
        console.error(error);
      }
    }
  };

  const updateProfileImage = async (imageUrl) => {
    user.fotoPerfil = imageUrl; // Actualiza la foto en el objeto user
    try {
      const response = await fetch(`http://localhost:3001/api/perfil/${user.idCliente}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}` // Asegúrate de que tienes el token del usuario
        },
        body: JSON.stringify({ fotoPerfil: imageUrl }), // Envía solo el campo necesario
      });

      if (!response.ok) {
        throw new Error('Error al actualizar la imagen en la base de datos');
      }

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Cargar la imagen del perfil guardada en el localStorage si existe
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
      setImageSrc(savedImage);
    }
  }, [user]);

  return (
    <div className={styles.container}>
      <div className={styles.profileHeader}>
        <div className={styles.photoContainer}>
          <input
            type="file"
            onChange={handleFileInputChange} // Usa la función para manejar la carga de archivos
            className={styles.fileInput}
            id="fileInput"
          />
          <label htmlFor="fileInput" className={styles.photoLabel}>
            {imageSrc ? (
              <img src={imageSrc} alt="Perfil" className={styles.profileImage} />
            ) : (
              "✏️"
            )}
          </label>
        </div>
        <div>
          <h1 className={styles.username}>
            {user && user.nombre && user.apellido 
              ? `${user.nombre} ${user.apellido}` 
              : "Cargando..."}
          </h1>
          <p className={styles.correo_p}>
            {user && user.correoElectronico
              ? `${user.correoElectronico}` 
              : "Cargando..."}
          </p>
        </div>
      </div>
      <div className={styles.menu}>
        <Navegador />
      </div>
    </div>
  );
};

export default UserProfile;
