"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import styles from './productos.module.css';
import SearchBar from '../../components/buscador';
import Navegador from '../../components/navegador';
export default function Productos() {
    const [productos, setProductos] = useState([]);
       
    
    useEffect(() => {
        const fetchProductos = async () => {
        
            const response = await fetch('http://localhost:3001/api/tipoProducto');
            const data = await response.json();
            setProductos(data);
           
        };

        fetchProductos();
    }, [productos]);

    

    return (
        <>
            <div className={styles.HeaderPadre}>
                <SearchBar/>
            </div>
                        

            <div className={styles.VolverHeader}>
                <Link className={styles.AHeader} href="./Inicio">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-chevron-left back-button" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                    </svg>
                </Link>
            </div>

            <div className={styles.HeaderTitle}>
                <h1 className={styles.TituloCategorias}>Categorías</h1>
            </div>
        
            <section className={styles.Container}>
                <div className={styles.Categories}>
                    {productos.map((seccion, index) => (
                        <div key={index} className={styles.CategoriesDentro}>
                            <Link href="./categorias" className={styles.Category}>
                                <img src={seccion.imagen} alt=""/>
                                <p>{seccion.nombre}</p>
                            </Link>
                            
                        </div>
                    ))}
                </div>
            </section>
            <Navegador/>
        </>
    );
}
