"use client";
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import styles from './local.module.css'
import SearchBar from '@/app/components/buscador';
import Navegador from '@/app/components/navegador';

export default function Locales() {
  const [productos, setProductos] = useState([]);
  const [locales, setLocales] = useState([]);
  const router = useRouter();

  useEffect(() => {
      const fetchLocales = async () => {
          const response = await fetch('http://localhost:3001/api/locales');
          const data = await response.json();
          setLocales(data);
      };

      fetchLocales();
  }, []);

  const handleLocalClick = async (local) => {
      const response = await fetch(`http://localhost:3001/api/producto/${local.idTienda}`);
      const data = await response.json();

      if (response.ok) {
          setProductos(data);
      } else {
          console.error('Error al obtener productos:', data);
      }

      router.push(`/views/categorias?idTienda=${local.idTienda}`);
  };

  return (
      <>
          <div className={styles.HeaderPadre}>
              <SearchBar />
          </div>
          <div className={styles.cardsContainer}>
              <div className={styles.cards}>
                  {locales.map((local, index) => (
                      <div 
                          key={index} 
                          className={styles.card} 
                          onClick={() => handleLocalClick(local)} 
                      >
                          <img height={100} width={200} src={local.imagen} className={styles.cardImgTop} alt={local.nombreLocal} />
                          <div className={styles.padre_divs}>
                              <p className={styles.card_title}>{local.nombre}</p>
                              <div className={styles.card_body}>
                                  <p className={styles.card_text}>{local.direccion}</p>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
          <div className={styles.productosContainer}>
              {productos.length > 0 ? (
                  productos.map((producto, index) => (
                      <div key={index} className={styles.productoCard}>
                          <img src={producto.imagen} alt={producto.nombre} className={styles.productoImg} />
                          <p>{producto.nombre}</p>
                          <p>{producto.precio}</p>
                      </div>
                  ))
              ) : (
                  <p>No hay productos disponibles para este local.</p>
              )}
          </div>
          <Navegador />
      </>
  );
}
