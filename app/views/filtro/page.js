"use client";
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import styles from './Filtro.module.css'; // Asegúrate de que el nombre del archivo CSS esté correctamente escrito

export default function FiltroPage() {
  const [productos, setProductos] = useState([]);
  const [seleccionados, setSeleccionados] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      const response = await fetch('http://localhost:3001/api/tipoProducto');
      const data = await response.json();
      setProductos(data);
    };

    fetchProductos();
  }, []);

  const toggleSeleccionado = (nombre) => {
    setSeleccionados((prevSeleccionados) =>
      prevSeleccionados.includes(nombre)
        ? prevSeleccionados.filter((item) => item !== nombre)
        : [...prevSeleccionados, nombre]
    );
  };

  return (
    <div className={styles.container}>
      <h1>Filtro</h1>
      <div className={styles.filtroGrid}>
        {productos.map((producto, index) => (
          <div
            key={index}
            className={`${styles.filtroItem} ${seleccionados.includes(producto.nombre) ? styles.seleccionado : ''}`}
            onClick={() => toggleSeleccionado(producto.nombre)}
          >
            {seleccionados.includes(producto.nombre) && (
              <FontAwesomeIcon icon={faCheck} className={styles.tick} />
            )}
            <img src={producto.imagen} className={styles.imagen_filtro} alt={producto.nombre} />
            <div>
              <h5 className={styles.nombe_fil}>{producto.nombre}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
