"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from "./categorias_locales.module.css";
import Link from 'next/link';

export default function CategoriaLocales() {
    const [productos, setProductos] = useState([]);
    const [nombreTienda, setNombreTienda] = useState('');
    const [imagenTienda, setImagenTienda] = useState(''); 
    const [direccionTienda, setDireccionTienda] = useState('')
    const [horarioApertura, sethorarioApertura] = useState(''); 
    const [horarioClausura, sethorarioClausura] = useState('')

    const searchParams = useSearchParams();
    const from = searchParams.get('from');  
    const idTienda = searchParams.get('idTienda'); 
    const router = useRouter();

    useEffect(() => {
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
                        sethorarioApertura(data[0].horarioApertura);
                        sethorarioClausura(data[0].horarioClausura);
                    } else {
                        // Si no hay productos, configurar sólo los detalles del local sin horario
                        setNombreTienda('Nombre del Local');
                        setImagenTienda('URL_DE_LA_IMAGEN_POR_DEFECTO');
                        setDireccionTienda('Dirección del local');
                        sethorarioApertura('');
                        sethorarioClausura('');
                    }
                } catch (error) {
                    console.error('Error al obtener los productos:', error);
                }
            }
        };

        fetchProductos();
    }, [idTienda]);

    const backLink = from === 'Local' ? '/views/Local' : '/views/Inicio';

    return (
        <>
            <div className={styles.imagenTiendaContainer}>
                <img className={styles.imagenTienda} src={imagenTienda} alt={nombreTienda} />
            </div>

            <div className={styles.container}>
                <div className={styles.VolverHeader}>
                    <Link className={styles.AHeader} href={backLink}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-chevron-left back-button" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                        </svg>
                    </Link>
                    <h1 className={styles.TituloCategorias}>
                        {nombreTienda ? nombreTienda : 'Cargando...'}
                    </h1>
                </div>

                <div className={styles.containerDetalleTienda}>
                    <div className={styles.containerDireccion}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                            <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
                            <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                        </svg>
                        <h2 className={styles.direccion}>{direccionTienda}</h2>
                    </div>
                    <div className={styles.containerHorario}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16">
                            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/>
                        </svg>
                        <h3>{productos.length > 0 ? `Hoy: ${horarioApertura}hs - ${horarioClausura}hs` : 'Próximamente'}</h3>
                    </div>
                </div>

                <div className={styles.productosContainer}>
                    {productos.length > 0 ? (
                        productos.every(producto => !producto.nombre || producto.nombre === "") ? (
                            <p>No hay productos disponibles para este local.</p>
                        ) : (
                            productos.map((producto, index) => (
                                producto.nombre ? ( 
                                    <div key={index} className={styles.productoCard}>
                                        <img src={producto.imagen} alt={producto.nombre} className={styles.productoImg} />
                                        <div className={styles.productoInfo}>
                                            <p>${producto.precio}</p>
                                            <h2>{producto.nombre}</h2>
                                            <button className={styles.botonCard}>Agregar al carrito</button>
                                        </div>
                                    </div>
                                ) : null 
                            ))
                        )
                    ) : (
                        <p>No hay productos disponibles para este local.</p>
                    )}
                </div>
            </div>
        </>
    );
}
