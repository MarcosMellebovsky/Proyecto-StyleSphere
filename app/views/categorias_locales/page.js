"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from "./categorias_locales.module.css";
import Link from 'next/link';

export default function CategoriaLocales() {
    const [productos, setProductos] = useState([]);
    const [nombreTienda, setNombreTienda] = useState('');
    const [imagenTienda, setImagenTienda] = useState(''); 

    const searchParams = useSearchParams();
    const from = searchParams.get('from');  
    const idTienda = searchParams.get('idTienda'); 
    const router = useRouter();

    useEffect(() => {
        const fetchProductos = async () => {
            if (idTienda) {
                try {
                    const response = await fetch(`http://localhost:3001/api/producto/tienda/${idTienda}`);
                    const data = await response.json();
                    if (data.length > 0) {
                        setProductos(data);
                        setNombreTienda(data[0].marca); 
                        setImagenTienda(data[0].imagenTienda)
                    }
                } catch (error) {
                    console.error('Error al obtener los productos:', error);
                }
            }
        };

        fetchProductos();
    }, [idTienda]);

    const backLink = from === 'Local' ? '/views/Local' : '/views/Inicio';

    return (
        <>
        <div className={styles.imagenTiendaContainer}>
            <img className={styles.imagenTienda} src={imagenTienda} alt={nombreTienda} />
        </div>
       
        <div className={styles.container}>
       
            <div className={styles.VolverHeader}>
                <Link className={styles.AHeader} href={backLink}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-chevron-left back-button" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                    </svg>
                </Link>
                <h1 className={styles.TituloCategorias}>
                    {nombreTienda ? nombreTienda : 'Cargando...'}
                </h1>
            </div>

            <div className={styles.productosContainer}>
                {productos.length > 0 ? (
                    productos.every(producto => !producto.nombre || producto.nombre === "") ? (
                        <p>No hay productos disponibles para este local.</p>
                    ) : (
                        productos.map((producto, index) => (
                            producto.nombre ? ( 
                                <div key={index} className={styles.productoCard}>
                                    <img src={producto.imagen} alt={producto.nombre} className={styles.productoImg} />
                                    <div className={styles.productoInfo}>
                                        <h2>{producto.nombre}</h2>
                                        <p>Precio: ${producto.precio}</p>
                                    </div>
                                </div>
                            ) : null 
                        ))
                    )
                ) : (
                    <p>No hay productos disponibles para este local.</p>
                )}
            </div>
        </div>
        </>
    );
}
