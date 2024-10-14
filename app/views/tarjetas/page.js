"use client";
import { useState } from 'react';
import styles from './tarjetas.module.css';
import Link from 'next/link';
const Tarjetas = () => {
  const [tarjetas, setTarjetas] = useState([
    { id: 1, numero: '**** **** **** 1234', fechaExpiracion: '12/25' },
    { id: 2, numero: '**** **** **** 5678', fechaExpiracion: '11/24' },
  ]);

  const [nuevaTarjeta, setNuevaTarjeta] = useState({
    numero: '',
    titular: '',
    fechaExpiracion: '',
    cvv: '',
  });

  const [mostrandoCampos, setMostrandoCampos] = useState(false);

  const agregarTarjeta = () => {
    if (
      nuevaTarjeta.numero.length === 12 &&
      nuevaTarjeta.fechaExpiracion &&
      nuevaTarjeta.cvv.length === 3
    ) {
      setTarjetas([
        ...tarjetas,
        { id: tarjetas.length + 1, numero: nuevaTarjeta.numero, fechaExpiracion: nuevaTarjeta.fechaExpiracion },
      ]);
      setNuevaTarjeta({ numero: '', titular: '', fechaExpiracion: '', cvv: '' });
      setMostrandoCampos(false);
    }
  };

  const eliminarTarjeta = (id) => {
    setTarjetas(tarjetas.filter(tarjeta => tarjeta.id !== id));
  };

  return (
    
    <div className={styles.container}>
     <div className={styles.VolverHeader}>
          <Link className={styles.AHeader} href="./perfil">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-chevron-left back-button" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
            </svg>
          </Link>
          </div>    
      <h1 className={styles.title}>Mis Tarjetas</h1>
      <ul className={styles.cardList}>
        
        {tarjetas.map(tarjeta => (
          <li key={tarjeta.id} className={styles.cardItem}>
           <div className="flex items-center justify-center relative w-10 h-6 bg-gray-800 border border-white border-opacity-20 rounded-md">
          <svg
            className="text-white fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="23"
            viewBox="0 0 48 48"
          >
            <path
              fill="#ff9800"
              d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z"
            ></path>
            <path
              fill="#d50000"
              d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z"
            ></path>
            <path
              fill="#ff3d00"
              d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z"
            ></path>
          </svg>
        </div> {tarjeta.numero} 
            <button className={styles.deleteButton} onClick={() => eliminarTarjeta(tarjeta.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <button className={styles.addButton} onClick={() => setMostrandoCampos(!mostrandoCampos)}>
        {mostrandoCampos ? 'Cancelar' : 'Agregar Tarjeta'}
      </button>
      <svg
      class="text-white fill-current"
      xmlns="http://www.w3.org/2000/svg"
      width="23"
      height="23"
      viewBox="0 0 48 48"
    />
      <path
        fill="#ff9800"
        d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z"
      ></path>
      <path
        fill="#d50000"
        d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z"
      ></path>
      <path
        fill="#ff3d00"
        d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z"
      ></path>
      {mostrandoCampos && (
        <div className={styles.formContainer}>
          <input
            className={styles.input}
            type="text"
            maxLength="12"
            placeholder="Número de tarjeta (12 dígitos)"
            value={nuevaTarjeta.numero}
            onChange={(e) => setNuevaTarjeta({ ...nuevaTarjeta, numero: e.target.value })}
          />
          <input
            className={styles.input}
            type="text"
            placeholder="Nombre del titular"
            value={nuevaTarjeta.titular}
            onChange={(e) => setNuevaTarjeta({ ...nuevaTarjeta, titular: e.target.value })}
          />
          <input
            className={styles.input}
            type="text"
            placeholder="Fecha de vencimiento (MM/AA)"
            value={nuevaTarjeta.fechaExpiracion}
            onChange={(e) => setNuevaTarjeta({ ...nuevaTarjeta, fechaExpiracion: e.target.value })}
          />
          <input
            className={styles.input}
            type="text"
            maxLength="3"
            placeholder="CVV (3 dígitos)"
            value={nuevaTarjeta.cvv}
            onChange={(e) => setNuevaTarjeta({ ...nuevaTarjeta, cvv: e.target.value })}
          />
          <button className={styles.confirmButton} onClick={agregarTarjeta}>Confirmar</button>
        </div>
        
      )}
    </div>
  );
};

export default Tarjetas;
