"use client";
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../components/contexts/UserContext";
import Navegador from "@/app/components/navegador";
import Link from "next/link";
import styles from "./perfil.module.css";

const EditarPerfil = () => {
  const { user } = useContext(UserContext);

  // Inicializa los valores del formulario con los datos actuales del usuario
  const [formData, setFormData] = useState({
    nombre: user?.nombre || "",
    email: user?.correoElectronico || "",
    password: "********", // No mostramos la contraseña por razones de seguridad
  });

  const [imageSrc, setImageSrc] = useState(null);

  // Manejo de cambio en el archivo de imagen
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setImageSrc(fileURL);
      // Guardar la URL de la imagen en localStorage
      localStorage.setItem("profileImage", fileURL);
    }
  };

  // Actualiza los datos del formulario cuando el usuario cambia los valores
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Maneja el envío del formulario (puedes agregar la lógica para guardar los cambios en la base de datos)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);
    // Aquí deberías agregar la lógica para actualizar el perfil en tu base de datos o hacer la llamada API.
  };

  useEffect(() => {
    // Recupera la imagen del perfil almacenada en el localStorage si existe
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
      setImageSrc(savedImage);
    }
  }, [user]);

  return (
    <>
      <div className={styles.container}>
        <header className={styles.header}>
          <Link className={styles.backButton} href="./perfil">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-chevron-left"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
              />
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
                <img src={imageSrc} alt="Foto de perfil" className={styles.profileImage} />
              ) : (
                <span className={styles.uploadText}>+ Subir Imagen</span>
              )}
            </label>
          </div>
        </div>

        {/* Formulario de edición */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              placeholder="Tu nombre"
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Correo electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Tu correo electrónico"
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Tu contraseña"
              className={styles.input}
              required
            />
          </div>

          <button className={styles.submit} type="submit">
            Guardar cambios
          </button>
        </form>

        <Navegador />
      </div>
    </>
  );
};

export default EditarPerfil;
