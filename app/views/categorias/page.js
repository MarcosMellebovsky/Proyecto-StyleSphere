"use client";
import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import styles from './categorias.module.css';
import SearchBar from '../../components/buscador';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import Navegador from '@/app/components/navegador';
import { UserContext } from '@/app/components/contexts/UserContext';

export default function Categorias() {
    const [isBookmarked, setIsBookmarked] = useState({});
    const [productos, setProductos] = useState([]);
    const searchParams = useSearchParams();
    const idTipoProducto = searchParams.get('idTipoProducto');
    const from = searchParams.get('from'); 
    const [categoriaNombre, setCategoriaNombre] = useState(''); 
    const router = useRouter();
    const { user } = useContext(UserContext); 

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/producto/productos_id/${idTipoProducto}`);
                const data = await response.json();
                setProductos(data);
                if (data.length > 0) {
                    setCategoriaNombre(data[0].nombrecategoria);
                }
                if (user.idCliente) {
                    const favoritosResponse = await fetch(`http://localhost:3001/api/favorito/`, {
                        headers: {
                            'Authorization': `Bearer ${user.token}`,
                        },
                    });
                    const favoritosData = await favoritosResponse.json();
                    const favoritos = {};
                    favoritosData.forEach(fav => {
                      favoritos[fav.idProducto] = fav.idFavorito; 
                    });
                    setIsBookmarked(favoritos); 
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        if (idTipoProducto) {
            fetchProductos();
        }
    }, [idTipoProducto, user.idCliente]);

    const toggleBookmark = async (producto) => {
        const isAdding = !isBookmarked[producto.idProducto];
        
        try {
            if (!user.token) {
                console.error('Token no disponible');
                return;
            }
    
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`  
            };
    
            if (isAdding) {
                const response = await fetch('http://localhost:3001/api/favorito/', {
                    method: 'POST',
                    headers,
                    body: JSON.stringify({ idProducto: producto.idProducto })
                });
                const result = await response.json();
                console.log('resultado ', result)
                const idFavorito = result[0].idFavorito; // Obtener el idFavorito desde la respuesta
                console.log('el id del producto a marcar es ',producto.idProducto)
                console.log('el id del favorito a marcar es ',idFavorito)
                setIsBookmarked(prev => ({ ...prev, [producto.idProducto]: idFavorito }));
            } else {
                const idFavorito = isBookmarked[producto.idProducto];
                await fetch(`http://localhost:3001/api/favorito/${idFavorito}`, {
                    method: 'DELETE',
                    headers
                }); 
                setIsBookmarked(prev => ({ ...prev, [producto.idProducto]: undefined }));
            }
               
    
            Swal.fire({
                toast: true,
                position: "bottom-end",
                icon: isAdding ? "success" : "info",
                title: isAdding ? "Se añadió a favoritos" : "Se eliminó de tus favoritos",
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true,
            });
        } catch (error) {
            console.error('Error al modificar favoritos:', error);
        }
    };

    const backLink = from === 'productos' ? '/views/productos' : '/views/Inicio';

    return (
        <>

            <div className={styles.VolverHeader}>
                <div className={styles.contendedorHeader}>
                <button onClick={() => router.back()} className={styles.AHeader}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-chevron-left back-button" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                    </svg>
                </button>
                    <h1 className={styles.categoriaTitle}>{categoriaNombre}</h1>
                </div>

                <div className={styles.productsContainer}>
                    <div className={styles.productosGrid}>
                        {productos.length > 0 ? (
                            productos.map((producto) => (
                                <div key={producto.idProducto} className={styles.productItem}>
                                    <div className={styles.imageContainer}>
                                    <Link href={`/views/detalle_producto?idProducto=${producto.idProducto}`} passHref>
                                        <img src={producto.imagen} alt={producto.nombre} className={styles.productImage} />
                                    </Link>
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
