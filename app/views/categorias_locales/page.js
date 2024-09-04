"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from "./categorias_locales.module.css";

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
            <h1>Productos del Local</h1>
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
