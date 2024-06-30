"use client";
import Link from 'next/link';
import styles from './home.module.css'; 
import React, { useState, useEffect } from 'react';
import SearchBar from '../../components/buscador';
import Navegador from '../../components/navegador';


    
    export default function Inicio() {
        const [productos, setProductos] = useState([]);
       
    
        useEffect(() => {
            const fetchProductos = async () => {
            
                const response = await fetch('http://localhost:3001/api/tipoProducto');
                const data = await response.json();
                setProductos(data);
               
            };
    
            fetchProductos();
        }, []);
    
       
    
      
        const locales = [
            {
                imagenLocal: "/local.jpg",
                nombreLocal : "Portsaid",
                direccion:" Villa del parque - campana 2321"
            },
            {
                imagenLocal: "/local.jpg",
                nombreLocal : "Portsaid",
                direccion:" Villa del parque - campana 2321"
            }
            ,
            {
                imagenLocal: "/local.jpg",
                nombreLocal : "Portsaid",
                direccion:" Villa del parque - campana 2321"
            }
        ]
    
  

    return (
        <>
            <div className={styles.HeaderPadre}>
                <SearchBar/>
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
                    <Link href="/productos" >Ver todas</Link>
                </div>
                <div className={styles.opciones}>
                {productos.map((producto, index) => (
                        <div key={index} className={styles.opcion}>
                            <img src={producto.imagen}  />
                            <p>{producto.nombre}</p>
                        </div>
                    ))}
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
                                        <img src={local.imagenLocal} className={styles.cardImgTop} alt={local.nombreLocal}/>
                                        <div className="card-body">
                                            <h5 className="card-title">{local.nombreLocal}</h5>
                                            <p className="card-text">{local.direccion}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>

                </div>

            </section>

   
            <Navegador/>
            
        </>
    );
}

