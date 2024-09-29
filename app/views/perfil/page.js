"use client";
import React, { useState, useEffect,useContext  } from 'react';
import styles from './perfil.module.css';
import { UserContext } from '../../components/contexts/UserContext';

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
    <div className={styles.container}>
      <div className={styles.headerRegistro}>
      <h1 className={styles.username}>          
        {user && user.nombre && user.apellido ? `${user.nombre} ${user.apellido}` : "Cargando..."}
      </h1>
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
                'Selecciona un archivo'
              )}
            </label>
          </div>
        </div>
      </div>
      <div className={styles.separator}>
        <hr className={styles.line} />
        <span></span>
        <hr className={styles.line} />
      </div>
      <div className={styles.menu2}>
        <div className={styles.menuItem}>
          <span className={styles.icon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person-vcard" viewBox="0 0 16 16">
              <path d="M5 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4m4-2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5M9 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 9 8m1 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5"/>
              <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.96q.04-.245.04-.5C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 1 1 12z"/>
            </svg>
          </span>
          <span>Editar Perfil</span>
        </div>
        <div className={styles.menuItem}>
          <span className={styles.icon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-credit-card-fill" viewBox="0 0 16 16">
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1H0zm0 3v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7zm3 2h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1"/>
            </svg>
          </span>
          <span>Mis tarjetas</span>
        </div>
        <div className={styles.menuItem}>
          <span className={styles.icon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-box2-heart" viewBox="0 0 16 16">
              <path d="M8 7.982C9.664 6.309 13.825 9.236 8 13 2.175 9.236 6.336 6.31 8 7.982"/>
              <path d="M3.75 0a1 1 0 0 0-.8.4L.1 4.2a.5.5 0 0 0-.1.3V15a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4.5a.5.5 0 0 0-.1-.3L13.05.4a1 1 0 0 0-.8-.4zm0 1H7.5v3h-6zM8.5 4V1h3.75l2.25 3zM15 5v10H1V5z"/>
            </svg>
          </span>
          <span>Mis Pedidos</span>
        </div>
        <div className={styles.separator}>
          <hr className={styles.line} />
          <span></span>
          <hr className={styles.line} />
        </div>
        <div className={styles.menuItem}>
          <span className={styles.icon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-question-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
              <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927s1.01-.394 1.01-.927c0-.534-.425-.928-1.01-.928s-1.01.394-1.01.928"/>
            </svg>
          </span>
          <span>Ayuda</span>
        </div>
        <div className={styles.menuItem}>
          <span className={styles.icon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
              <path d="m8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
            </svg>
          </span>
          <span>Terminos y Politicas</span>
        </div>
        <div className={styles.separator}>
          <hr className={styles.line} />
          <span></span>
          <hr className={styles.line} />
        </div>

        
        <div className={styles.menuItemLog}>
          <span className={styles.icon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-box2-heart" viewBox="0 0 16 16">
            <path d="M8 7.982C9.664 6.309 13.825 9.236 8 13 2.175 9.236 6.336 6.31 8 7.982"/>
              <path d="M3.75 0a1 1 0 0 0-.8.4L.1 4.2a.5.5 0 0 0-.1.3V15a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4.5a.5.5 0 0 0-.1-.3L13.05.4a1 1 0 0 0-.8-.4zm0 1H7.5v3h-6zM8.5 4V1h3.75l2.25 3zM15 5v10H1V5z"/>
            </svg>
          </span>
          <span className={styles.logout}>Cerrar Sesión</span>
        </div>
      </div>
      <Navegador />
    </div>
  );
};

export default UserProfile;
