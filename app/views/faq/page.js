"use client";
import { useState } from 'react';
import styles from './faq.module.css';
import Link from 'next/link';
const PreguntasFrecuentes = () => {
  const [abierto, setAbierto] = useState(null);

  const preguntas = [
    {
      id: 1,
      pregunta: "¿Cómo puedo hacer una compra?",
      respuesta: "Para hacer una compra, navega por nuestros productos, agrégales al carrito y sigue el proceso de pago."
    },
    {
      id: 2,
      pregunta: "¿Qué tipos de productos ofrecen?",
      respuesta: "Ofrecemos una amplia variedad de productos de moda, incluyendo ropa, zapatos, accesorios y más."
    },
    {
      id: 3,
      pregunta: "¿Cómo puedo devolver un producto?",
      respuesta: "Puedes devolver un producto dentro de los 30 días posteriores a la compra. Consulta nuestra política de devoluciones para más detalles."
    },
    {
      id: 4,
      pregunta: "¿Qué métodos de pago aceptan?",
      respuesta: "Aceptamos tarjetas de crédito, débito y PayPal."
    },
    {
      id: 5,
      pregunta: "¿Tienen algún descuento o promoción?",
      respuesta: "Sí, frecuentemente ofrecemos descuentos y promociones. Mantente atento a nuestra página principal para más información."
    },{
      id: 6,
      pregunta: "¿Tienen algún descuento o promoción?",
      respuesta: "Sí, frecuentemente ofrecemos descuentos y promociones. Mantente atento a nuestra página principal para más información."
    },{
      id: 7,
      pregunta: "¿Tienen algún descuento o promoción?",
      respuesta: "Sí, frecuentemente ofrecemos descuentos y promociones. Mantente atento a nuestra página principal para más información."
    },{
      id: 8,
      pregunta: "¿Tienen algún descuento o promoción?",
      respuesta: "Sí, frecuentemente ofrecemos descuentos y promociones. Mantente atento a nuestra página principal para más información."
    },
  ];

  const togglePregunta = (id) => {
    setAbierto(abierto === id ? null : id);
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
         
      <h1 className={styles.title}>Preguntas Frecuentes</h1>
      {preguntas.map(({ id, pregunta, respuesta }) => (
        <div key={id} className={styles.pregunta}>
          <button className={styles.preguntaButton} onClick={() => togglePregunta(id)}>
            {pregunta}
          </button>
          {abierto === id && (
            <div className={styles.respuesta}>
              <p>{respuesta}</p>
            </div>
          )}
        </div>
      ))}
    </div>
    </>
  );
};

export default PreguntasFrecuentes;
