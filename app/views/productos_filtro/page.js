"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import styles from './ProductosFiltro.module.css';
import SearchBar from '@/app/components/buscador';
import Link from 'next/link';
import Swal from 'sweetalert2';

export default function ProductosFiltro() {
    const [isBookmarked, setIsBookmarked] = useState(Array(7).fill(false));
    const [productos, setProductos] = useState([]);
    const searchParams = useSearchParams();
    const seleccionados = searchParams.get('seleccionados');

    const handleSearchFocus = () => {
        router.push('/views/search');
    };

    const toggleBookmark = (index) => {
        setIsBookmarked(prevState => {
            const newBookmarks = [...prevState];
            newBookmarks[index] = !newBookmarks[index];
            return newBookmarks;
        });

        const Toast = Swal.mixin({
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });

        const isAdding = !isBookmarked[index];
        Toast.fire({
            icon: isAdding ? "success" : "info",
            title: isAdding ? "Se añadió a favoritos" : "Se eliminó de tus favoritos"
        });
    };

    useEffect(() => {
        const fetchProductosFiltrados = async () => {
            const response = await fetch(`http://localhost:3001/api/producto/productos_filtro?seleccionados=${seleccionados}`);
            const data = await response.json();
            setProductos(data);
        };

        if (seleccionados) {
            fetchProductosFiltrados();
        }
    }, [seleccionados]);

    return (
        <>
            <div className={styles.HeaderPadre}>
                <SearchBar onFocus={handleSearchFocus} />
            </div>
            <div className={styles.VolverHeader}>
                <Link className={styles.AHeader} href="../../views/Inicio">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-chevron-left back-button" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                    </svg>
                </Link>
            </div>

            <div className={styles.productsContainer}>
                <div className={styles.productosGrid}>
                    {productos.map((producto, index) => (
                        <div key={producto.idProducto} className={styles.productItem}>
                            <div className={styles.imageContainer}>
                                <img src={producto.imagen} className={styles.productImage} alt={producto.nombre} />
                                <button onClick={() => toggleBookmark(index)} className={styles.bookmarkButton}>
                                    {isBookmarked[index] ? (
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
                            <h3 className={styles.productName}>{producto.nombre}</h3>
                            <p className={styles.productPrice}>{`Precio: $${producto.precio}`}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
