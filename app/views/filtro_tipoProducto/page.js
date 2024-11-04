"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './filtro_tipoProducto.module.css';

export default function Filtros() {
    const router = useRouter();
    const [talle, setTalle] = useState('');
    const [color, setColor] = useState('');
    const [precioMin, setPrecioMin] = useState('');
    const [precioMax, setPrecioMax] = useState('');
    const idTipoProducto = new URLSearchParams(window.location.search).get('idTipoProducto');

    const handleApplyFilters = () => {
        router.push(`/views/categorias?idTipoProducto=${idTipoProducto}&talle=${talle}&color=${color}&precioMin=${precioMin}&precioMax=${precioMax}`);
    };

    return (
        <div className={styles.filtrosContainer}>
            <h1>Aplicar Filtros</h1>
            <div className={styles.filtro}>
                <label htmlFor="talle">Talle:</label>
                <input 
                    type="text" 
                    id="talle" 
                    value={talle} 
                    onChange={(e) => setTalle(e.target.value)} 
                />
            </div>
            <div className={styles.filtro}>
                <label htmlFor="color">Color:</label>
                <input 
                    type="text" 
                    id="color" 
                    value={color} 
                    onChange={(e) => setColor(e.target.value)} 
                />
            </div>
            <div className={styles.filtro}>
                <label htmlFor="precioMin">Precio Mínimo:</label>
                <input 
                    type="number" 
                    id="precioMin" 
                    value={precioMin} 
                    onChange={(e) => setPrecioMin(e.target.value)} 
                />
            </div>
            <div className={styles.filtro}>
                <label htmlFor="precioMax">Precio Máximo:</label>
                <input 
                    type="number" 
                    id="precioMax" 
                    value={precioMax} 
                    onChange={(e) => setPrecioMax(e.target.value)} 
                />
            </div>
            <button onClick={handleApplyFilters} className={styles.applyButton}>Aplicar Filtros</button>
        </div>
    );
}
