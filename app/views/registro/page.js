"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from './registro.module.css';
export default function Form() {
  return (
    <>
     <div className={styles.hoad}> 
     <div className={styles.headerRegistro}>
          <Image
            src={"/logo.png"}
            alt="Logo"
            className={styles.logo}
            width={400}
            height={160}
          />
        </div>
     </div>
     <h3 className={styles.bienvenida}>¡Bienvenido/a!</h3>
    <div className={styles.todo}> 
    <form className={styles.form}>   
    
      <p className={styles.title}>Registrate</p>
  
      <div className={styles.flex}>
        <label>
          <input required placeholder="" type="text" className={styles.input} />
          <span>Nombre*</span>
        </label>

        <label>
          <input required placeholder="" type="text" className={styles.input} />
          <span>Apellido*</span>
        </label>
      </div>

      <label>
        <input required placeholder="" type="email" className={styles.input} />
        <span>Correo electronico*</span>
      </label>

      <label>
        <input required placeholder="" type="password" className={styles.input} />
        <span>Contraseña*</span>
      </label>
      
      <label>
        <input required placeholder="" type="password" className={styles.input} />
        <span>Repetir contraseña*</span>
      </label>
      
      <button className={styles.submit}>Siguiente</button>
      <p className={styles.message}>Al registrarse acepta nuestros terminos y condiciones.</p>
      <p className={styles.signin}>Ya tienes cuenta? <Link href={"../views/iniciar_Sesion"}>Iniciar sesion</Link></p>
    </form> </div>
    </>
  );
}
