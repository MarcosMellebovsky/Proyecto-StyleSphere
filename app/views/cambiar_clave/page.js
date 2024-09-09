"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "./cambiar_clave.module.css";

export default function cambiarContra() {
    return(
    
    <>
     <div className={styles.container}>
  <div className={styles.VolverHeader}>
                <Link className={styles.AHeader} href="./Inicio">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-chevron-left back-button" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                    </svg>
                </Link>
            </div>  
            </div>
            <div className={styles.padreTitulo}>
         <h1 className={styles.TituloCategorias}> Olvidaste tu contraseña</h1>
         </div>
         <div className={styles.padreSubtitulo}>
         <p className={styles.subtitulo}>Ingresa tu correo electronico para el proceso de verificacion. 
            Le enviaremos un codigo de 4 digitos a su correo electronico.</p>
            </div>
            <div className={styles.todo}> 
         <form className={styles.form}>   
            <div className={styles.input_container}>
            <label required className={styles.checkbox_label}> Email* </label>
        <input required placeholder="" type="email" className={styles.input} />

     
     <Link href="../views/Inicio"> <button className={styles.submit_button}>Siguiente</button></Link>
            </div>
            </form> </div>
    </>)
}