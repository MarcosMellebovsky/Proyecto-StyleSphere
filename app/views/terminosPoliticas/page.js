"use client";
import React from "react";
import Link from "next/link";
import styles from "./terminosPoliticas.module.css";
import Navegador from "@/app/components/navegador";

const TerminosPoliticas = () => {
  return (
    <div className={styles.container}>
      <div className={styles.VolverHeader}>
        <Link className={styles.AHeader} href="./Inicio">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-chevron-left back-button" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
          </svg>
        </Link>
      </div>
      <h1 className={styles.title}>Términos y Políticas</h1>
      <div className={styles.content}>
        <h2 className={styles.subtitle}>1. Introducción</h2>
        <p className={styles.text}>
          Bienvenido a StyleSphere. Al utilizar nuestra aplicación, aceptas los siguientes términos y condiciones. Por favor, léelos detenidamente.
        </p>

        <h2 className={styles.subtitle}>2. Uso de la Aplicación</h2>
        <p className={styles.text}>
          Al registrarte y utilizar StyleSphere, garantizas que tienes al menos 18 años o que cuentas con el permiso de tus padres o tutores.
        </p>

        <h2 className={styles.subtitle}>3. Compras y Pagos</h2>
        <p className={styles.text}>
          Al realizar una compra, aceptas pagar el precio indicado en el momento de la transacción. Los métodos de pago aceptados incluyen tarjetas de crédito y débito, así como otros métodos que se especificarán en la aplicación.
        </p>

        <h2 className={styles.subtitle}>4. Envíos y Devoluciones</h2>
        <p className={styles.text}>
          Los plazos de entrega pueden variar dependiendo de la ubicación. Si no estás satisfecho con tu compra, consulta nuestra política de devoluciones para más información.
        </p>

        <h2 className={styles.subtitle}>5. Cambios a los Términos</h2>
        <p className={styles.text}>
          Nos reservamos el derecho de modificar estos términos en cualquier momento. Te notificaremos sobre cambios significativos a través de la aplicación.
        </p>

        <h2 className={styles.subtitle}>6. Contacto</h2>
        <p className={styles.text}>
          Si tienes preguntas sobre estos términos, por favor contáctanos a través de nuestra sección de ayuda en la aplicación.
        </p>
      </div>
      <Navegador />
    </div>
  );
};

export default TerminosPoliticas;
