"use client";
import Link from 'next/link';
import styles from './home.module.css';
import React, { useState } from 'react';
import SearchBar from '../buscador';

export default function Inicio() {
    const Productos = [
        {
            nombre:"Remera",
            imagen:"/Remera-sublimar-hombre--removebg-preview.png"   
    
        },
        {
            nombre:"Short",
            imagen:"/Remera-sublimar-hombre--removebg-preview.png"  
        },
        {
            nombre:"Campera",
            imagen:"/Remera-sublimar-hombre--removebg-preview.png"  
        },
        {
            nombre:"Buzo",
            imagen:"/Remera-sublimar-hombre--removebg-preview.png"  
        },
        {nombre:"Pantalon",
        imagen:"/Remera-sublimar-hombre--removebg-preview.png"  },
    ]

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

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = () => {
        alert(`Searching for: ${searchQuery}`);
    };

  

    return (
        <>
            <div className={styles.HeaderPadre}>
                <SearchBar value={searchQuery} onChange={handleSearchChange} onSearch={handleSearch}/>
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
                {Productos.map((producto, index) => (
                        <div key={index} className={styles.opcion}>
                            <img src={producto.imagen}  />
                            <p>{producto.nombre}</p>
                        </div>
                    ))}
                </div>

                <div className={styles.opciones}>
                {Productos.map((producto, index) => (
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

   

        </>
    );
}
