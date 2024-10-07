"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './detalleProducto.module.css'; 
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
export default function DetalleProducto() {
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();
    const idProducto = searchParams.get('idProducto');
    const [isBookmarked, setIsBookmarked] = useState({});
    useEffect(() => {
        const fetchProducto = async () => {
            if (idProducto) {
                try {
                    const response = await fetch(`http://localhost:3001/api/producto/${idProducto}`);
                    const data = await response.json();
                    setProducto(data);
                    setLoading(false);
                } catch (error) {
                    console.error('Error al obtener el producto:', error);
                    setLoading(false);
                }
            }
        };

        fetchProducto();
    }, [idProducto]);

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (!producto) {
        return <p>No se encontró el producto.</p>;
    }

    return (
        <div className={styles.detalleContainer}>
            <Link href="/views/Inicio">
                <button className={styles.backButton}>Volver</button>
            </Link>
            {producto.length > 0 ? (
                producto.map((product) => (
                    <div key={product.idProducto} className={styles.productItem}>
                        <div className={styles.imageContainer}>
                            <img src={product.imagen} alt={product.nombre} className={styles.productImage} />
                            <button 
                                onClick={() => toggleBookmark(product)} 
                                className={styles.bookmarkButton}
                            >
                                {isBookmarked[product.idProducto] ? (
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
                        <p className={styles.productName}>{product.nombre}</p>
                        <p className={styles.productPrice}>${product.precio}</p>
                    </div>
                ))
            ) : (
                <p className={styles.noProducts}>No se encontraron productos para esta categoría</p>
            )}
        </div>
    );
}
 
        /*<div className={styles.detalleContainer}>
            

            <div className={styles.productoDetalle}>
                <div className={styles.imageContainer}>
                    <img src={producto.imagen} alt={producto.nombre} className={styles.productImage} />
                </div>

                <div className={styles.productInfo}>
                    <h1 className={styles.productName}>{producto.nombre}</h1>
                    <p className={styles.productPrice}>Precio: ${producto.precio}</p>
                    <p className={styles.productStock}>Stock disponible: {producto.cantidadStock}</p>
                    <p className={styles.productColor}>Color: {producto.color}</p>
                    <p className={styles.productTalle}>Talle: {producto.talle}</p>
                    <p className={styles.productVentas}>Cantidad de ventas: {producto.cantidadVentas}</p>
                    <p className={styles.productCategory}>Categoría: {producto.nombrecategoria}</p>
                </div>
            </div>
        </div>*/