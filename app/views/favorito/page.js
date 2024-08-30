// favorito/page.js
"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './favorito.module.css';
import Navegador from '../../components/navegador';

export default function Favorito() {
    const [favoritos, setFavoritos] = useState([]);
    
    useEffect(() => {
        const fetchFavoritos = async () => {
            const productosGuardados = localStorage.getItem('productosFavoritos'); // Aquí se almacenan los favoritos
            if (productosGuardados) {
                const response = await fetch(`http://localhost:3001/api/producto/productos_guardados${productosGuardados}`);
                const data = await response.json();
                setFavoritos(data);
            }
        };

        fetchFavoritos();
    }, []);

    return (
        <>
            <div className={styles.container}>
                <h1>Productos Guardados</h1>
                <div className={styles.productos}>
                    {favoritos.length === 0 ? (
                        <p>No tienes productos guardados.</p>
                    ) : (
                        favoritos.map((producto, index) => (
                            <div key={index} className={styles.producto}>
                                <img src={producto.imagen} alt={producto.nombre} />
                                <p>{producto.nombre}</p>
                                <p>${producto.precio}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <Navegador />
        </>
    );
}
