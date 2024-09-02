"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import styles from './categorias.module.css';
import SearchBar from '../../components/buscador';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import Navegador from '@/app/components/navegador';

export default function Categorias() {
    const [isBookmarked, setIsBookmarked] = useState({});
    const [productos, setProductos] = useState([]);
    const searchParams = useSearchParams();
    const idTipoProducto = searchParams.get('idTipoProducto');
    const router = useRouter();

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/producto/${idTipoProducto}`);
                if (!response.ok) {
                    throw new Error('Error al obtener los productos');
                }
                const data = await response.json();
                setProductos(data);

                const favoritosGuardados = JSON.parse(localStorage.getItem('productosFavoritos')) || {};
                setIsBookmarked(favoritosGuardados);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        if (idTipoProducto) {
            fetchProductos();
        }
    }, [idTipoProducto]);

    const agregarAFavoritos = (producto) => {
        let favoritosGuardados = { ...isBookmarked };
        console.log('isBookmarked', isBookmarked)

        if (favoritosGuardados[producto.idProducto]) {
            delete favoritosGuardados[producto.idProducto];
        } else {
            favoritosGuardados[producto.idProducto] = producto;
        }

        localStorage.setItem('productosFavoritos', JSON.stringify(favoritosGuardados));
        setIsBookmarked(favoritosGuardados);
    };

    const toggleBookmark = (producto) => {
        agregarAFavoritos(producto);

        const isAdding = !isBookmarked[producto.idProducto];
        Swal.fire({
            toast: true,
            position: "bottom-end",
            icon: isAdding ? "success" : "info",
            title: isAdding ? "Se añadió a favoritos" : "Se eliminó de tus favoritos",
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
    };

    return (
        <>
            <div className={styles.HeaderPadre}>
                <SearchBar onFocus={() => router.push('/views/search')} />
            </div>

            <div className={styles.VolverHeader}>
                <Link className={styles.AHeader} href="../../views/Inicio">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-chevron-left back-button" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                    </svg>
                </Link>
                <div className={styles.productsContainer}>
                    <div className={styles.productosGrid}>
                        {productos.length > 0 ? (
                            productos.map((producto) => (
                                <div key={producto.idProducto} className={styles.productItem}>
                                    <div className={styles.imageContainer}>
                                        <img src={producto.imagen} alt={producto.nombre} className={styles.productImage} />
                                        <button 
                                            onClick={() => toggleBookmark(producto)} 
                                            className={styles.bookmarkButton}
                                        >
                                            {isBookmarked[producto.idProducto] ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark-fill" viewBox="0 0 16 16">
                                                    <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2"/>
                                                </svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark" viewBox="0 0 16 16">
                                                    <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"/>
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                    <p className={styles.productName}>{producto.nombre}</p>
                                    <p className={styles.productPrice}>${producto.precio}</p>
                                </div>
                            ))
                        ) : (
                            <p className={styles.noProducts}>No se encontraron productos para esta categoría</p>
                        )}
                    </div>
                </div>
            </div>
            <Navegador />
        </>
    );
}
