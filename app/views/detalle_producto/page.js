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
       
       <div className={styles.VolverHeader}>
          <Link className={styles.AHeader} href="./Inicio">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-chevron-left back-button" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
            </svg>
          </Link>
          <h1 className={styles.categoriaTitle}>Detalles</h1>
     
            {producto.length > 0 ? (
                producto.map((product) => (
                    <div key={product.idProducto} className={styles.productItem}>
                        <div className={styles.imageContainer}>
                            <img src={product.imagen} alt={product.nombre} className={styles.productImage} />
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