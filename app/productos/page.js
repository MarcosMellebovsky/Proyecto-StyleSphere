"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './productos.module.css';
import Categorias from '../muchosprodu/page';
import SearchBar from '../buscador/index';

export default function Productos() {
    const [searchQuery, setSearchQuery] = useState('');

    const seccionProductos = [
        { img:"/Remera-sublimar-hombre--removebg-preview.png", text: "Buzos"},
        { img:"/Remera-sublimar-hombre--removebg-preview.png", text: "Buzos"},
        { img:"/Remera-sublimar-hombre--removebg-preview.png", text: "Buzos"},
        { img:"/Remera-sublimar-hombre--removebg-preview.png", text: "Buzos"},
        { img:"/Remera-sublimar-hombre--removebg-preview.png", text: "Buzos"},
        { img:"/Remera-sublimar-hombre--removebg-preview.png", text: "Buzos"},
        { img:"/Remera-sublimar-hombre--removebg-preview.png", text: "Buzos"},
        { img:"/Remera-sublimar-hombre--removebg-preview.png", text: "Buzos"},
        { img:"/Remera-sublimar-hombre--removebg-preview.png", text: "Buzos"},
        { img:"/Remera-sublimar-hombre--removebg-preview.png", text: "Buzos"},
        { img:"/Remera-sublimar-hombre--removebg-preview.png", text: "Buzos"},
        
    ];

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
                        

            <div className={styles.VolverHeader}>
                <Link className={styles.AHeader} href="/">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-chevron-left back-button" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                    </svg>
                </Link>
            </div>

            <div className={styles.HeaderTitle}>
                <h1 className={styles.TituloCategorias}>Categorías</h1>
            </div>
        
            <section className={styles.Container}>
                <div className={styles.Categories}>
                    {seccionProductos.map((seccion, index) => (
                        <div key={index} className={styles.CategoriesDentro}>
                            <Link href="/muchosprodu" className={styles.Category}>
                                <img src={seccion.img} alt="buzos"/>
                            </Link>
                            <p>{seccion.text}</p>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
