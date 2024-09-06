"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SearchBar from '../../components/buscador';
import Navegador from '../../components/navegador';
import styles from "./local.module.css";

export default function Inicio() {
    const [productos, setProductos] = useState([]);
    const [locales, setLocales] = useState([]);
    const router = useRouter();
  
    useEffect(() => {
      const fetchProductos = async () => {
        const response = await fetch('http://localhost:3001/api/producto');
        const data = await response.json();
        setProductos(data);
      };
  
      fetchProductos();
    }, []);
  
    useEffect(() => {
      const fetchLocales = async () => {
        const response = await fetch('http://localhost:3001/api/locales');
        const data = await response.json();
        setLocales(data);
      };
  
      fetchLocales();
    }, []);
  
    const handleLocalClick = (local) => {
      router.push(`/views/categorias_locales?idTienda=${local.idTienda}&from=Local`);
    };
    
    
    return(
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
                    <img height={100} width={200} src={local.imagenTienda} className={styles.cardImgTop} alt={local.nombreLocal} />
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
            <Navegador />
        </>
    );
}
