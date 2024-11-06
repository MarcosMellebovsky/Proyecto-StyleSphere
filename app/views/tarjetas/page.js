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
  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevaTarjeta({ ...nuevaTarjeta, [name]: value });
  };

  const handleAgregarTarjeta = () => {
    const { numero, titular, fechaExpiracion, cvv } = nuevaTarjeta;

    let valid = true;
    let nuevosErrores = {};

    // Validación de número de tarjeta (debe ser 16 dígitos)
    if (!/^\d{16}$/.test(numero)) {
      nuevosErrores.numero = 'El número de tarjeta debe tener 16 dígitos';
      valid = false;
    }

    // Validación de titular (solo letras)
    if (!/^[a-zA-Z\s]+$/.test(titular)) {
      nuevosErrores.titular = 'El titular debe contener solo letras';
      valid = false;
    }

    // Validación de fecha de expiración (debe tener el formato MM/AA y ser una fecha real)
    const fechaParts = fechaExpiracion.split('/');
    if (fechaParts.length !== 2 || !/^\d{2}$/.test(fechaParts[0]) || !/^\d{2}$/.test(fechaParts[1])) {
      nuevosErrores.fechaExpiracion = 'La fecha de expiración debe tener el formato MM/AA';
      valid = false;
    }

    // Validación de CVV (debe ser 3 dígitos numéricos)
    if (!/^\d{3}$/.test(cvv)) {
      nuevosErrores.cvv = 'El CVV debe tener 3 dígitos';
      valid = false;
    }

    if (valid) {
      setTarjetas([
        ...tarjetas,
        { id: tarjetas.length + 1, numero: '**** **** **** ' + numero.slice(-4), fechaExpiracion },
      ]);
      setNuevaTarjeta({ numero: '', titular: '', fechaExpiracion: '', cvv: '' });
      setMostrandoCampos(false);
    } else {
      setErrores(nuevosErrores);
    }
  };

  const eliminarTarjeta = (id) => {
    setTarjetas(tarjetas.filter((tarjeta) => tarjeta.id !== id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.VolverHeader}>
        <Link className={styles.AHeader} href="./perfil">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-chevron-left back-button" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
          </svg>
        </Link>
      </div>
      <h1 className={styles.txt}>Mis tarjetas</h1>
      <div className={styles.separator}>
        <hr className={styles.line} />
      </div>

      <p className={styles.txtp}>Tarjetas guardadas:</p>
      <div className={styles.tarjetasContainer}>
        {tarjetas.map((tarjeta) => (
          <div key={tarjeta.id} className={styles.tarjetaCard}>
            <div className={styles.cardInfo}>
              <div className={styles.cardNumber}>
                <span>{tarjeta.numero}</span>
              </div>
              <div className={styles.cardExpDate}>
                <span>{tarjeta.fechaExpiracion}</span>
              </div>
            </div>
            <button onClick={() => eliminarTarjeta(tarjeta.id)} className={styles.eliminarBtn}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 0a.5.5 0 0 1 .5.5V1h5V.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V1h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1v10a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V3H.5A.5.5 0 0 1 0 2.5v-1a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V1h2V.5a.5.5 0 0 1 .5-.5h1zM4 3v10a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V3H4z" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {!mostrandoCampos ? (
        <button onClick={() => setMostrandoCampos(true)} className={styles.agregarBtn}>Agregar tarjeta</button>
      ) : (
        <div className={styles.formContainer}>
          <h2>Agregar tarjeta</h2>
          <div className={styles.inputGroup}>
            <label htmlFor="numero">Número de tarjeta</label>
            <input
              id="numero"
              type="text"
              name="numero"
              value={nuevaTarjeta.numero}
              onChange={handleChange}
              maxLength="16"
              placeholder="XXXX XXXX XXXX XXXX"
            />
            {errores.numero && <div className={styles.error}>{errores.numero}</div>}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="titular">Titular</label>
            <input
              id="titular"
              type="text"
              name="titular"
              value={nuevaTarjeta.titular}
              onChange={handleChange}
              placeholder="Nombre del titular"
            />
            {errores.titular && <div className={styles.error}>{errores.titular}</div>}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="fechaExpiracion">Fecha de expiración (MM/AA)</label>
            <input
              id="fechaExpiracion"
              type="text"
              name="fechaExpiracion"
              value={nuevaTarjeta.fechaExpiracion}
              onChange={handleChange}
              maxLength="5"
              placeholder="MM/AA"
            />
            {errores.fechaExpiracion && <div className={styles.error}>{errores.fechaExpiracion}</div>}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="cvv">CVV</label>
            <input
              id="cvv"
              type="password"
              name="cvv"
              value={nuevaTarjeta.cvv}
              onChange={handleChange}
              maxLength="3"
              placeholder="CVV"
            />
            {errores.cvv && <div className={styles.error}>{errores.cvv}</div>}
          </div>

          <button onClick={handleAgregarTarjeta} className={styles.submitBtn}>Guardar tarjeta</button>
        </div>
      )}
    </div>
  );
};

export default Tarjetas;
