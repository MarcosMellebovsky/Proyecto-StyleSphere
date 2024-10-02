"use client";
import React, { useState, useContext } from "react";
import { UserContext } from "../../components/contexts/UserContext";
import Navegador from "@/app/components/navegador";
import Link from "next/link";
import styles from "./perfil.module.css";

const UserProfile = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const { user } = useContext(UserContext);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setImageSrc(fileURL);
    }
  };

  return (
    <div className={styles.container}>
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
              <img src={imageSrc} alt="Perfil" className={styles.profileImage} />
            ) : (
              "✏️"
            )}
          </label>
        </div>
        <div>
          <h1 className={styles.username}>
          {user ? `${user.nombre} ${user.apellido}` : "Cargando..."}
          </h1>
          <p>{user.email}</p>
        </div>
      </div>

      <div className={styles.menu}>
        <div className={styles.menuSection}>
          <strong>Perfil:</strong>
          <Link href="/editar-perfil" className={styles.menuItem}>Editar perfil</Link>
          <Link href="/mis-tarjetas" className={styles.menuItem}>Mis tarjetas</Link>
          <Link href="/mis-pedidos" className={styles.menuItem}>Mis pedidos</Link>
        </div>

        <div className={styles.menuSection}>
          <strong>Accesibilidad:</strong>
          <Link href="/ayuda" className={styles.menuItem}>Ayuda</Link>
          <Link href="/terminos-y-politicas" className={styles.menuItem}>Términos y políticas</Link>
        </div>

        <div className={styles.menuSection}>
          <Link href="#" className={styles.menuItem}>Cerrar sesión</Link>
        </div>
      </div>

      <Navegador />
    </div>
  );
};

export default UserProfile;
