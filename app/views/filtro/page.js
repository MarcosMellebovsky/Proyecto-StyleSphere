"use client";
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import styles from './Filtro.module.css'; 

export default function FiltroPage() {
  const [productos, setProductos] = useState([]);
  const [seleccionados, setSeleccionados] = useState([]);
  const router = useRouter(); 

  useEffect(() => {
    const fetchProductos = async () => {
      const response = await fetch('http://localhost:3001/api/tipoProducto');
      const data = await response.json();
      setProductos(data);
    };

    fetchProductos();
  }, []);

  const toggleSeleccionado = (idTipoProducto) => {
    setSeleccionados((prevSeleccionados) =>
      prevSeleccionados.includes(idTipoProducto)
        ? prevSeleccionados.filter((item) => item !== idTipoProducto)
        : [...prevSeleccionados, idTipoProducto]
    );
  };

  const aplicarFiltro = async () => {
    const query = seleccionados.length > 0 ? `?seleccionados=${seleccionados.join(',')}` : '';
    const response = await fetch(`http://localhost:3001/api/producto/productos_filtro${query}`);
    const productosFiltrados = await response.json();
    router.push(`/views/productos_filtro?seleccionados=${seleccionados.join(',')}`);
    
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.VolverHeader}>
        <Link className={styles.AHeader} href="./Inicio">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-chevron-left back-button" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
          </svg>
        </Link>
        <h1 className={styles.title}>Filtro</h1>
      </div>
      <div className={styles.filtroGrid}>
        {productos.map((producto, index) => (
          <div
            key={index}
            className={`${styles.filtroItem} ${seleccionados.includes(producto.idTipoProducto) ? styles.seleccionado : ''}`}
            onClick={() => toggleSeleccionado(producto.idTipoProducto)}
          >
            {seleccionados.includes(producto.idTipoProducto) && (
              <FontAwesomeIcon icon={faCheck} className={styles.tick} />
            )}
            <img src={producto.imagen} className={styles.imagen_filtro} alt={producto.nombre} />
            <div>
              <h5 className={styles.nombe_fil}>{producto.nombre}</h5>
            </div>
          </div>
        ))}
      </div>
      <button onClick={aplicarFiltro} className={styles.botonAplicarFiltro}>
        Aplicar Filtro
      </button>
    </div>
  );
}
