"use client";
import React, { useState, useContext } from 'react';
import styles from './perfil.module.css';
import { UserContext } from '../../components/contexts/UserContext';
import Link from 'next/link';
import Navegador from '@/app/components/navegador';

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
    <>
      <div className={styles.azullejo}>
        <div className={styles.headerRegistro}>
          {/* Botón de volver */}
          <div className={styles.VolverHeader}>
            <Link className={styles.AHeader} href="./Inicio">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-chevron-left back-button" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
              </svg>
            </Link>
          </div>

      

          {/* Imagen de perfil superpuesta */}
          <div className={styles.padrefoto}>
            <div className={styles.FotoPerfil}>
              <input 
                type="file" 
                onChange={handleFileInputChange} 
                className={styles.cambiafoto} 
                style={{ display: 'none' }} 
                id="fileInput"
              />
              <label htmlFor="fileInput" className={styles.cambiafoto}>
                {imageSrc ? (
                  <img src={imageSrc} alt="Perfil" className={styles.profileImage} />
                ) : (
                  <img src="/defaultProfileImage.png" alt="" className={styles.profileImage} />
                )}
              </label>
            </div>
            <p className={styles.p}>Cambiar imagen</p>
          </div>
        </div>

        {/* Formulario */}
        <div className={styles.formContainer}>
          <form className={styles.formPerfil}>
            <label className={styles.labell} htmlFor="nombre">Nombres</label>
            <input className={styles.inputt} type="text" id="nombre" name="nombre" defaultValue={user ? `${user.nombre}` : "Cargando..."} />

            <label className={styles.labell} htmlFor="apellidos">Apellidos</label>
            <input className={styles.inputt} type="text" id="apellidos" name="apellidos" defaultValue={user ? `${user.apellido}` : "Cargando..."} />

            <label className={styles.labell} htmlFor="telefono">Número celular</label>
            <input className={styles.inputt} type="tel" id="telefono" name="telefono" defaultValue={user ? `${user.telefono}` : "Cargando..."} />
            <button className={styles.botonModificar} type="submit">
        Modificar
          </button>
          </form>

        
        </div>
       
        {/* Navegador */}
        <Navegador />
      </div>
    </>
  );
};

export default UserProfile;
