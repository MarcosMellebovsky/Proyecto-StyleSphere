"use client";
import React, { useState, useEffect } from 'react';
import styles from './favoritos.module.css';
import Swal from 'sweetalert2';
import Link from 'next/link';

export default function Favoritos() {
    const [favoritos, setFavoritos] = useState([]);

    useEffect(() => {
        console.log('produ favoritos', localStorage.getItem('productosFavoritos'))
        try {
            const productosFavoritos = JSON.parse(localStorage.getItem('productosFavoritos'));
            setFavoritos(Object.values(productosFavoritos));
        }
        catch {
            console.log('No hay productos favoritos')
        }
    }, []);

    const toggleBookmark = (idProducto) => {
        let productosFavoritos = JSON.parse(localStorage.getItem('productosFavoritos'));
        console.log(idProducto)
        console.log(productosFavoritos[idProducto])
        if (productosFavoritos[idProducto]) {
            delete productosFavoritos[idProducto];
            setFavoritos(Object.values(productosFavoritos));
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Este producto no se encuentra en favoritos.',
            });
        }

        localStorage.setItem('productosFavoritos', JSON.stringify(productosFavoritos));
    };

    return (
        <div className={styles.favoritosContainer}>
            <h1>Favoritos</h1>
            <Link className={styles.AHeader} href="../../views/Inicio">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-chevron-left back-button" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                    </svg>
                </Link>
            {favoritos.length > 0 ? (
                <div className={styles.productosGrid}>
                    {favoritos.map((producto) => (
                        <div key={producto.id} className={styles.productItem}>
                            <div className={styles.imageContainer}>
                                <img src={producto.imagen} alt={producto.nombre} className={styles.productImage} />
                                <button onClick={() => toggleBookmark(producto.idProducto)} className={styles.bookmarkButton}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark-fill" viewBox="0 0 16 16">
                                        <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2"/>
                                    </svg>
                                </button>
                            </div>
                            <p className={styles.productName}>{producto.nombre}</p>
                            <p className={styles.productPrice}>${producto.precio}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className={styles.noFavoritos}>No tienes productos en favoritos.</p>
            )}
           
        </div>
    );
}
