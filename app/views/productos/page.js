"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Importa useRouter de 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import styles from './productos.module.css'; 
import Navegador from '@/app/components/navegador';

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

  const toggleSeleccionado = (nombre) => {
    setSeleccionados((prevSeleccionados) =>
      prevSeleccionados.includes(nombre)
        ? prevSeleccionados.filter((item) => item !== nombre)
        : [...prevSeleccionados, nombre]
    );
  };
  const handleProductClick = (producto) => {
    router.push(`/views/categorias?idTipoProducto=${producto.idTipoProducto}`);
  };

 

  return (
    <>
    <div className={styles.container_padre}>


    
        <div className={styles.VolverHeader}>
            <Link className={styles.AHeader} href="./Inicio">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-chevron-left back-button" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                </svg>
            </Link>
            <h1 className={styles.TituloCategorias}>Categorías</h1>

        </div>
       

       
    
        <section className={styles.Container}>
            <div className={styles.Categories}>
                {productos.map((producto, index) => (
                    <div key={index} className={styles.CategoriesDentro} onClick={() => handleProductClick(producto)}>
                        <Link href="./categorias" className={styles.Category}>
                            <img src={producto.imagen} alt={producto.nombre}/>
                            
                        </Link>
                        <p>{producto.nombre}</p>
                        
                    </div>
                ))}
            </div>
        </section>
        </div>        
        <Navegador/>
    </>
);

}
