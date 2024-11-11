"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "./ayuda.module.css"; // Asegúrate de tener el archivo de estilos
import emailjs from 'emailjs-com';

emailjs.init("1w7YhHERAr_N8BAJz");

export default function Ayuda() {
  const [formData, setFormData] = useState({ nombre: '', email: '', mensaje: '' });
  const [step, setStep] = useState(1);
  const [enviado, setEnviado] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step === 1) {
      setStep(2);
      setSuccessMessage("Tu mensaje ha sido enviado. ¡Gracias por ponerte en contacto!");
    } else {
      const templateParams = {
        reply_to: formData.email,
        message: formData.mensaje,
      };

      try {
        await emailjs.send('default_service', 'template_qfr3bqi', templateParams);
        setEnviado(true);
        setStep(3);
      } catch (error) {
        setErrorMessage("Hubo un problema al enviar tu mensaje. Por favor, inténtalo de nuevo.");
      }
    }
  };

  return (
    <>
      <div className={styles.VolverHeader}>
        <Link className={styles.AHeader} href="/views/perfil">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-chevron-left back-button" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
          </svg>
        </Link>
      </div>
      <div className={styles.container}>
        <h1 className={styles.title}>Centro de Ayuda</h1>

        <p className={styles.subtitulo}>
          {step === 1 && "Si tienes alguna duda o necesitas asistencia, completa el formulario y nos pondremos en contacto contigo lo antes posible."}
         
          {step === 3 && "Formulario enviado exitosamente."}
        </p>

        {step === 1 && (
          <div className={styles.formContainer}>
            <form onSubmit={handleSubmit}>
              <div className={styles.input_container}>
                <label className={styles.checkbox_label}>Tu nombre*</label>
                <input
                  type="text"
                  name="nombre"
                  placeholder="Tu nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </div>
              <div className={styles.input_container}>
                <label className={styles.checkbox_label}>Tu email*</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Tu email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </div>
              <div className={styles.input_container}>
                <label className={styles.checkbox_label}>Tu mensaje*</label>
                <textarea
                  name="mensaje"
                  placeholder="Tu mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  className={styles.textarea}
                />
              </div>
              <button type="submit" className={styles.submitButton}>Enviar</button>
            </form>
          </div>
        )}

        {/* Mensaje de éxito o agradecimiento */}
        {(step === 2 || step === 3) && (
          <div className={styles.messageContainer}>
            {/* Mensaje "Gracias por tu mensaje" */}
            {step === 2 && !enviado && (
              <div className={styles.successMessage}>
                <p className={styles.tick}>✅</p>
              
              </div>
            )}

       {/* Emoji de tick ✅ */}
            <div className={styles.successMessage}>
              <p>¡Gracias por tu mensaje!</p>
              <p>Te responderemos pronto.</p>
            </div>

            {/* Mensaje "Tu mensaje fue enviado con éxito" */}
            {step === 3 && enviado && (
              <div className={styles.successMessage}>
                <p>Tu mensaje fue enviado con éxito.</p>
              </div>
            )}

           

            {errorMessage && (
              <div className={styles.errorMessage}>
                <p>{errorMessage}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
