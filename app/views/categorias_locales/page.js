    "use client";
    import React, { useState, useEffect } from 'react';
    import { useSearchParams } from 'next/navigation';
    import styles from "./categorias_locales.module.css";
    import Link from 'next/link';

    export default function CategoriaLocales() {
        const [productos, setProductos] = useState([]);
        const searchParams = useSearchParams();
        const idTienda = searchParams.get('idTienda'); // Obteniendo el idTienda de los parámetros de búsqueda

        useEffect(() => {
            const fetchProductos = async () => {
                if (idTienda) {
                    const response = await fetch(`http://localhost:3001/api/producto/${idTienda}`);
                    const data = await response.json();
                    setProductos(data);
                }
            };

            fetchProductos();
        }, [idTienda]);

        return (
            <div className={styles.container}>
                <div className={styles.VolverHeader}>
                <Link className={styles.AHeader} href="./Inicio">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-chevron-left back-button" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                    </svg>
                </Link>
                <h1 className={styles.TituloCategorias}>Nombre</h1>

            </div>
                <div className={styles.productosContainer}>
                    {productos.length > 0 ? (
                        productos.map((producto, index) => (
                            <div key={index} className={styles.productoCard}>
                                <img src={producto.imagen} alt={producto.nombre} className={styles.productoImg} />
                                <div className={styles.productoInfo}>
                                    <h2>{producto.nombre}</h2>
                                    <p>Precio: ${producto.precio}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No hay productos disponibles para este local.</p>
                    )}
                </div>
            </div>
        );
    }
