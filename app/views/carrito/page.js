'use client';
import Navegador from "@/app/components/navegador";
import styles from './Carrito.module.css';
import Link from "next/link";
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '@/app/components/contexts/UserContext';

export default function Carrito() {
    const [productosCarrito, setProductosCarrito] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const { user } = useContext(UserContext); 

    
    const fetchCarrito = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/carrito/', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            console.log(user.token)
            if (response.ok) {
                const data = await response.json();
                console.log(data)
                setProductosCarrito(data); 
            } else {
                console.error('Error al obtener los productos del carrito');
            }

        } catch (error) {
            console.error('Error al hacer la solicitud:', error);
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        if (user && user.token) { 
            fetchCarrito();
        }
    }, [user]);
    

    if (loading) {
        return <p>Cargando...</p>; 
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.VolverHeader}>
                    <Link className={styles.AHeader} href="./Inicio">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-chevron-left back-button" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                        </svg>
                    </Link>
                    <h1 className={styles.TituloCategorias}> Carrito</h1>
                </div>  
                
                <div className={styles.productList}>
                    {productosCarrito.length > 0 ? (
                        productosCarrito.map((producto) => (
                            <div key={producto.idProducto} className={styles.productItem}>
                                <div className={styles.imageContainer}>
                                    <Link href={`/views/detalle_producto?idProducto=${producto.idProducto}`}>
                                    <img
                                        src={producto.imagen}
                                        alt={producto.nombre}
                                        className={styles.productImage}
                                    />
                                    </Link>
                                </div>
                                <div className={styles.productDetails}>
                                    <p className={styles.productName}>{producto.nombre}</p>
                                    <p className={styles.productCantidad}>{producto.cantidadAComprar} X ${producto.precio}</p>
                                    <p className={styles.productPrice}>${producto.precio * producto.cantidadAComprar}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className={styles.noProducts}>Tu carrito está vacío</p>
                    )}
                </div>
            </div>

            <Navegador></Navegador>
        </>
    );
}
