"use client";
import { useState } from 'react';
import styles from './ayuda.module.css';
import Link from 'next/link';
const Ayuda = () => {
  const [formData, setFormData] = useState({ nombre: '', email: '', mensaje: '' });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías agregar la lógica para enviar el formulario
    setEnviado(true);
  };

  return (
    <div className={styles.container}>
         <div className={styles.VolverHeader}>
          <Link className={styles.AHeader} href="/views/perfil">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-chevron-left back-button" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
            </svg>
          </Link>
          </div>
      <h1 className={styles.title}>Centro de Ayuda</h1>

      <section className={styles.faq}>
        <h2>Preguntas Frecuentes</h2>
        <div className={styles.question}>
          <h3>¿Cómo puedo hacer una compra?</h3>
          <p>Para hacer una compra, navega por nuestros productos, agrégales al carrito y sigue el proceso de pago.</p>
        </div>
        <div className={styles.question}>
          <h3>¿Qué métodos de pago aceptan?</h3>
          <p>Aceptamos tarjetas de crédito, débito y PayPal.</p>
        </div>
        <div className={styles.question}>
          <h3>¿Cómo puedo devolver un producto?</h3>
          <p>Puedes devolver un producto dentro de los 30 días posteriores a la compra. Consulta nuestra política de devoluciones para más detalles.</p>
        </div>
      </section>

      <section className={styles.contact}>
        <h2>Contáctanos</h2>
        {enviado ? (
          <p className={styles.successMessage}>¡Gracias por tu mensaje! Te responderemos pronto.</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="nombre"
              placeholder="Tu nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className={styles.input}
            />
            <input
              type="email"
              name="email"
              placeholder="Tu email"
              value={formData.email}
              onChange={handleChange}
              required
              className={styles.input}
            />
            <textarea
              name="mensaje"
              placeholder="Tu mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              required
              className={styles.textarea}
            />
            <button type="submit" className={styles.submitButton}>Enviar</button>
          </form>
        )}
      </section>
    </div>
  );
};

export default Ayuda;
