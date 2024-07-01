"use client";
import Link from 'next/link';
import styles from './muchosprodu.module.css';
import SearchBar from '../../components/buscador';
import Navegador from '../../components/navegador';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

export default function Categorias() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isBookmarked, setIsBookmarked] = useState(Array(7).fill(false));

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = () => {
        alert(`Searching for: ${searchQuery}`);
    };

    const toggleBookmark = (index) => {
        setIsBookmarked(prevState => {
            const newBookmarks = [...prevState];
            newBookmarks[index] = !newBookmarks[index];
            return newBookmarks;
        });

        const Toast = Swal.mixin({
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });

        const isAdding = !isBookmarked[index];
        Toast.fire({
            icon: isAdding ? "success" : "info",
            title: isAdding ? "Se añadió a favoritos" : "Se eliminó de tus favoritos"
        });
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
                        <svg 
                            onClick={() => toggleBookmark(index)}
                            className={styles.huevo} 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="16" 
                            height="16" 
                            fill="currentColor" 
                            viewBox="0 0 16 16"
                        >
                            {isBookmarked[index] ? (
                                <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2"/>
                            ) : (
                                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"/>
                            )}
                        </svg>
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
