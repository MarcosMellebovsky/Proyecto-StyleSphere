"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './detalleProducto.module.css'; // Recuerda crear este archivo de estilos.
import Link from 'next/link';

export default function DetalleProducto() {
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { idProducto } = router.query;

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
            <Link href="/views/categorias">
                <button className={styles.backButton}>Volver</button>
            </Link>

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
        </div>
    );
}
