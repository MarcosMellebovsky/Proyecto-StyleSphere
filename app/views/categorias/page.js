"use client";
import Link from 'next/link';
import styles from './muchosprodu.module.css';
import SearchBar from '../../components/buscador';
import Navegador from '../../components/navegador';
import React, { useState } from 'react';

export default function Categorias() {
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
                <SearchBar value={searchQuery} onChange={handleSearchChange} onSearch={handleSearch} />
            </div>

            <div className={styles.VolverHeader}>
                <Link className={styles.AHeader} href="./productos">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-chevron-left back-button" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                    </svg>
                </Link>
            </div>

            <div className={styles.HeaderTitle}>
                <h1 className={styles.TituloCategorias}>Productos</h1>
            </div>

            <div className={styles.padreCarta}>
                {[...Array(7)].map((_, index) => (
                    <div key={index} className={styles.carta}>
                        <img className={styles.imgCarta} src="../imgaa.jpg" alt="Producto" />
                        <img className={styles.huevo} src="../ico.png" alt="Icono Favorito"/>
                        <div className={styles.texto}>
                            <h4 className={styles.h1mucho}>Remera negra</h4>
                            <p className={styles.h1mucho}>$5400</p>
                        </div>
                    </div>
                ))}
            </div>

            <Navegador />
        </>
    );
}
