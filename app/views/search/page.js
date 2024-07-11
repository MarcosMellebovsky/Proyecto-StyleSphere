"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './search.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [searchHistory, setSearchHistory] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedHistory = localStorage.getItem('searchHistory');
            return savedHistory ? JSON.parse(savedHistory) : [];
        }
        return [];
    });

    const router = useRouter();

    useEffect(() => {
        if (searchTerm) {
            const fetchResults = async () => {
                try {
                    const response = await fetch(`http://localhost:3001/api/buscador/${searchTerm}`);
                    if (response.ok) {
                        const data = await response.json();
                        setResults(data);
                    } else {
                        setResults([]);
                    }
                } catch (error) {
                    console.error("Error fetching search results:", error);
                    setResults([]);
                }
            };

            fetchResults();
        } else {
            setResults([]);
        }
    }, [searchTerm]);

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleResultClick = (result) => {
        if (!searchHistory.some(historyItem => historyItem.nombre === result.nombre)) {
            const updatedHistory = [result, ...searchHistory];
            setSearchHistory(updatedHistory);
            localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
        }
        router.push(`/views/categorias?idTipoProducto=${result.idTipoProducto}`);
    };

    const clearSearch = () => {
        setSearchTerm('');
        setResults([]);
    };

    const clearHistory = () => {
        setSearchHistory([]);
        localStorage.removeItem('searchHistory');
    };

    const removeFromHistory = (item) => {
        const updatedHistory = searchHistory.filter(historyItem => historyItem.nombre !== item.nombre);
        setSearchHistory(updatedHistory);
        localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    };

    const handleHistoryClick = (item) => {
        router.push(`/views/categorias?idTipoProducto=${item.idTipoProducto}`);
    };

    return (
        <div className={`${styles.searchContainer} slide-in`}>
            <div className={styles.searchHeader}>
                <Link className={styles.AHeader} href="./Inicio">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-chevron-left back-button" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                    </svg>
                </Link>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleChange}
                    className={styles.searchInput}
                    placeholder="Buscar..."
                />
                <button onClick={clearHistory} className={styles.clearButton}>
                    Limpiar
                </button>
            </div>
            <div className={styles.results}>
                {results.length > 0 ? (
                    results.map((result, index) => (
                        <div key={index} className={styles.resultItem} onClick={() => handleResultClick(result)}>
                            <img src={result.imagen} alt={result.nombre} className={styles.resultImage} />
                            <p className={styles.resultName}>{result.nombre}</p>
                        </div>
                    ))
                ) : (
                    searchTerm && <p className={styles.noResults}>No se encontraron resultados</p>
                )}
            </div>
            <div className={styles.searchHistory}>
                <h3>Búsqueda reciente</h3>
                <ul>
                    {searchHistory.map((item, index) => (
                        <li key={index} className={styles.historyItem}>
                            <span onClick={() => handleHistoryClick(item)} className={styles.historyItemText}>{item.nombre}</span>
                            <button onClick={() => removeFromHistory(item)} className={styles.removeItemButton}>
                                <Image className={styles.imgBTN} src={"/borrar.png"} height={30} width={30} alt="Eliminar" />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
