"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './todos_los_productos.module.css';

export default function Todos_los_productos() {
    const [productos, setProductos] = useState([]);
    const searchParams = useSearchParams();
    const tipoProducto = searchParams.get('tipo');

    useEffect(() => {
        if (tipoProducto) {
            const fetchProductos = async () => {
                try {
                    const response = await fetch(`http://localhost:3001/api/productos?tipo=${tipoProducto}`);
                    const data = await response.json();
                    setProductos(data);
                } catch (error) {
                    console.error("Error fetching productos:", error);
                }
            };

            fetchProductos();
        }
    }, [tipoProducto]);

    return (
        <div className={styles.productosContainer}>
            <h2>{`Productos de tipo: ${tipoProducto}`}</h2>
            <div className={styles.productosGrid}>
                {productos.map((producto, index) => (
                    <div key={index} className={styles.productoCard}>
                        <img src={producto.imagen} alt={`Imagen de ${producto.nombre}`} className={styles.productoImagen} />
                        <p>{producto.nombre}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
