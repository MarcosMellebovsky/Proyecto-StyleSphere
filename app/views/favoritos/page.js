"use client";
import React, { useState, useEffect, useContext } from 'react';
import styles from './favoritos.module.css';
import Swal from 'sweetalert2';
import Link from 'next/link';
import Navegador from '@/app/components/navegador';
import { UserContext } from '@/app/components/contexts/UserContext';

export default function Favoritos() {
    const { user } = useContext(UserContext);
    const [favoritos, setFavoritos] = useState([]);
  
    useEffect(() => {
      const fetchFavoritos = async () => {
        try {
          const token = localStorage.getItem('token'); // O el método que uses para obtener el token
          const response = await fetch(`http://localhost:3001/api/favorito`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          setFavoritos(data);
        } catch (error) {
          console.error('Error al obtener favoritos:', error);
        }
      };
  
      if (user.idCliente) {
        fetchFavoritos();
      }
    }, [user.idCliente]);
  
    const toggleBookmark = async (idFavorito) => {
        try {
          const response = await fetch(`http://localhost:3001/api/favorito/${idFavorito}`, {
            method: 'DELETE'
          });
      
          if (!response.ok) {
            throw new Error('Error al eliminar el favorito');
          }
      
          setFavoritos(prev => prev.filter(favorito => favorito.idFavorito !== idFavorito));
      
          Swal.fire({
            toast: true,
            position: "bottom-end",
            icon: "info",
            title: "Se eliminó de tus favoritos",
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
          });
        } catch (error) {
          console.error('Error al eliminar favorito:', error);
        }
      };

    return (
        <div className={styles.favoritosContainer}>

            <div className={styles.VolverHeader}>
                <Link className={styles.AHeader} href="./Inicio">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-chevron-left back-button" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                    </svg>
                </Link>
                <h1 className={styles.TituloCategorias}> Favoritos</h1>
            </div>

            {favoritos.length > 0 ? (
                <div className={styles.productosGrid}>
                    {favoritos.map((producto) => (
                        <div key={producto.idProducto} className={styles.productItem}>
                            <div className={styles.imageContainer}>
                                <img src={producto.imagen} alt={producto.nombre} className={styles.productImage} />
                                <button onClick={() => toggleBookmark(producto.idFavorito)} className={styles.bookmarkButton}>
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
                <div className={styles.container_noHay}>
                    <div className={styles.div_noHay}>
                            <img src='/favoritos.png'></img>
                            <p className={styles.noFavoritos_principal}>¡No tienes productos en favoritos!</p>
                            <div className={styles.div_links}>
                                <p className={styles.noFavoritos}>Agrega los productos que mas te gusten a favoritos<Link href='../../views/productos'>Aqui</Link></p>
                            </div>
                    </div>
                </div>
                
            )}
                 <Navegador />
        </div>
        
    );
}
