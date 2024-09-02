"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './home.module.css';
import SearchBar from '../../components/buscador';
import Navegador from '../../components/navegador';

export default function Inicio() {
    const [productos, setProductos] = useState([]);
    const [locales, setLocales] = useState([]);
    const router = useRouter();
  
    useEffect(() => {
      const fetchProductos = async () => {
        const response = await fetch('http://localhost:3001/api/tipoProducto');
        const data = await response.json();
        setProductos(data);
      };
  
      fetchProductos();
    }, []);
  
    useEffect(() => {
      const fetchLocales = async () => {
        const response = await fetch('http://localhost:3001/api/locales/top3');
        const data = await response.json();
        setLocales(data);
      };
  
      fetchLocales();
    }, []);
  
    const handleProductClick = (producto) => {
      router.push(`/views/categorias?idTipoProducto=${producto.idTipoProducto}`);
    };
  
    return (
      <>
        <div className={styles.HeaderPadre}>
          <SearchBar />
        </div>
  
        <section className={styles.ofertas}>
          <div className={styles.container}>
            <h2>Ofertas de hoy</h2>
            <p>Mira todas las prendas de nuestros locales, ¡no te las pierdas!</p>
            <button className={styles.btn}>Ver más</button>
          </div>
        </section>
  
        <section className={styles.queEstasBuscando}>
          <div className={styles.dentroQueEstasBuscando}>
            <h2>¿Qué estás buscando?</h2>
            <Link href="./productos">Ver todas</Link>
          </div>
  
          <div className={styles.opciones}>
            <div className={styles.opcionesArriba}>
              {productos.slice(0, 4).map((producto, index) => (
                <div key={index} className={styles.opcion} onClick={() => handleProductClick(producto)}>
                  <img width={200} height={100} src={producto.imagen} alt={`Imagen de ${producto.nombre}`} />
                  <p>{producto.nombre}</p>
                </div>
              ))}
            </div>
  
            <div className={styles.opcionesAbajo}>
              {productos.slice(4, 8).map((producto, index) => (
                <div key={index} className={styles.opcion} onClick={() => handleProductClick(producto)}>
                  <img width={200} height={100} src={producto.imagen} alt={`Imagen de ${producto.nombre}`} />
                  <p>{producto.nombre}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
  
        <section className={styles.masVendido}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2>Lo más vendido <span>🔥🔥</span></h2>
            </div>
            <div className={styles.cardsContainer}>
              <div className={styles.cards}>
                {locales.map((local, index) => (
                  <div key={index} className={styles.card}>
                    <div className="card">
                      <img height={100} width={200} src={local.imagen} className={styles.cardImgTop} alt={local.nombreLocal} />
                      <div className="card-body">
                        <h5 className="card-title">{local.nombre}</h5>
                        <p className="card-text">{local.direccion}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
  
        <Navegador />
      </>
    );
  }