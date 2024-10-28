"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from "./categorias_locales.module.css";
import Link from 'next/link';

export default function CategoriaLocales() {
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]); 
    const [nombreTienda, setNombreTienda] = useState('');
    const [imagenTienda, setImagenTienda] = useState('');
    const [direccionTienda, setDireccionTienda] = useState('');
    const [horarioApertura, setHorarioApertura] = useState('');
    const [horarioClausura, setHorarioClausura] = useState('');
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null); 

    const searchParams = useSearchParams();
    const idTienda = searchParams.get('idTienda');
    const router = useRouter();
  
    const fetchProductos = async () => {
        if (idTienda) {
            try {
                const response = await fetch(`http://localhost:3001/api/producto/tienda/${idTienda}`);
                const data = await response.json();
                if (data.length > 0) {
                    setProductos(data);
                    setNombreTienda(data[0].marca);
                    setImagenTienda(data[0].imagenTienda);
                    setDireccionTienda(data[0].direccion);
                    setHorarioApertura(data[0].horarioApertura);
                    setHorarioClausura(data[0].horarioClausura);
                } else {
                    setNombreTienda(data[0].marca);
                    setImagenTienda(data[0].imagenTienda);
                    setDireccionTienda(data[0].direccion);
                    setHorarioApertura(data[0].horarioApertura);
                    setHorarioClausura(data[0].horarioClausura);
                }
            } catch (error) {
                console.error('Error al obtener los productos:', error);
            }
        }
    };

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/tipoProducto');
                const data = await response.json();
                setCategorias(data);
            } catch (error) {
                console.error('Error al obtener las categorías:', error);
            }
        };

        fetchProductos();
        fetchCategorias(); 
    }, [idTienda]);

    const fetchProductosFiltrados = async (idTipoProducto) => {
        try {
            const response = await fetch(`http://localhost:3001/api/producto/productos_filtro2?seleccionados=${idTipoProducto}&idTienda=${idTienda}`);
            const data = await response.json();
            setProductos(data); 
            setCategoriaSeleccionada(idTipoProducto); 
        } catch (error) {
            console.error('Error al filtrar los productos:', error);
        }
    };

    return (
        <>
            <div className={styles.imagenTiendaContainer}>
                <img className={styles.imagenTienda} src={imagenTienda} alt={nombreTienda} />
            </div>

            <div className={styles.container}>
                <button onClick={() => router.back()} className={styles.AHeader}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-chevron-left back-button" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                    </svg>
                </button>

                <h1 className={styles.TituloCategorias}>{nombreTienda || 'Cargando...'}</h1>
                <div className={styles.containerDetalleTienda}>
                    <h2 className={styles.direccion}>{direccionTienda}</h2>
                    <Link href={`/views/resenias?idTienda=${idTienda}`} className={styles.botonResenas}>
                        Ver Reseñas
                    </Link>
                    <h3>Hoy: {horarioApertura}hs - {horarioClausura}hs</h3>
                </div>

                <div className={styles.filtrosContainer}>
                    <button onClick={() => fetchProductos(idTienda)} className={!categoriaSeleccionada ? styles.botonActivo : ''}>Todos</button>
                    {categorias.map(categoria => (
                        <button 
                            key={categoria.idTipoProducto} 
                            onClick={() => fetchProductosFiltrados(categoria.idTipoProducto)} 
                            className={categoriaSeleccionada === categoria.idTipoProducto ? styles.botonActivo : ''}
                        >
                            {categoria.nombre}
                        </button>
                    ))}
                </div>

                <div className={styles.productosContainer}>
                    {productos.length > 0 ? (
                        productos.map((producto, index) => (
                            <div key={index} className={styles.productoCard}>
                                <img src={producto.imagen} alt={producto.nombre} className={styles.productoImg} />
                                <div className={styles.productoInfo}>
                                    <p>${producto.precio}</p>
                                    <h2>{producto.nombre}</h2>
                                    <Link href={`/views/detalle_producto?idProducto=${producto.idProducto}`} passHref>
                                        <button className={styles.botonCard}>Ver más</button>
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No hay productos disponibles para esta categoría.</p>
                    )}
                </div>
            </div>
        </>
    );
}
