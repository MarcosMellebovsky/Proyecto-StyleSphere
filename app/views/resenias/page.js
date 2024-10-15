"use client";
import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'next/navigation';
import ModalAgregarResenia from './ModalAgregarResenia';
import styles from "./resenias.module.css"; 
import { UserContext } from '@/app/components/contexts/UserContext.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
export default function Resenias() {
    const { user } = useContext(UserContext);
    const [resenias, setResenias] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [reseniaEditada, setReseniaEditada] = useState(null);
    const searchParams = useSearchParams();
    const idTienda = searchParams.get('idTienda');

    const fetchResenias = async () => {
        if (idTienda) {
            try {
                const response = await fetch(`http://localhost:3001/api/resenia/${idTienda}`);
                const data = await response.json();
                setResenias(data);
            } catch (error) {
                console.error('Error al obtener las reseñas:', error);
            }
        }
    };

    const agregarResenia = async (resenia) => {
        const response = await fetch(`http://localhost:3001/api/resenia/agregar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({ 
                idTienda,
                comentario: resenia.comentario,
                valoracion: resenia.valoracion
            }),
        });

        if (response.ok) {
            fetchResenias();
            setModalVisible(false); 
        } else {
            console.error('Error al agregar la reseña');
        }
    };

    const editarResenia = async (resenia) => {
        const response = await fetch(`http://localhost:3001/api/resenia/actualizar`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({
                idTienda,
                comentario: resenia.comentario,
                valoracion: resenia.valoracion
            }),
        });

        if (response.ok) {
            fetchResenias();
            setModalVisible(false);
        } else {
            console.error('Error al editar la reseña');
        }
    };

    const borrarResenia = async (idResenia) => {
        const response = await fetch(`http://localhost:3001/api/resenia/borrar/${idResenia}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            },
        });

        if (response.ok) {
            fetchResenias();
        } else {
            console.error('Error al borrar la reseña');
        }
    };

    useEffect(() => {
        if (user.idCliente) {
            fetchResenias();
        }
    }, [idTienda, user.idCliente]);

    const renderEstrellas = (valoracion) => {
        const estrellas = [];
        for (let i = 1; i <= 5; i++) {
            estrellas.push(
                <span key={i} className={i <= valoracion ? styles.estrellaLlena : styles.estrellaVacia}>
                    ★
                </span>
            );
        }
        return <div>{estrellas}</div>;
    };

    const userResenia = resenias.find(reseña => reseña.idCliente == user.idCliente);

    return (
      <>
        <Link className={styles.AHeader} href={`../../views/categorias_locales?idTienda=${idTienda}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-chevron-left back-button" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
          </svg>
        </Link>
        <div className={styles.container}>
            <h1>Reseñas</h1>
            {modalVisible && (
                <ModalAgregarResenia 
                    onClose={() => setModalVisible(false)} 
                    onSubmit={reseniaEditada ? editarResenia : agregarResenia} 
                    initialData={reseniaEditada} 
                />
            )}
            {resenias.length > 0 ? (
                <div className={styles.reseñasContainer}>
                    {resenias.map((reseña) => (
                        <div key={reseña.idReseña} className={styles.reseñaCard}>
                            <p><strong>{reseña.nombre + " " + reseña.apellido}</strong></p>
                            <p>{reseña.comentario}</p>
                            <div className={styles.valoracion}>
                                {renderEstrellas(reseña.valoracion)}
                            </div>
                            {reseña.idCliente == user.idCliente && (
                                <div>
                                    <button 
                                        className={styles.botonEditar} 
                                        onClick={() => {
                                            setReseniaEditada(reseña);
                                            setModalVisible(true);
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button 
                                        className={styles.botonBorrar} 
                                        onClick={() => borrarResenia(reseña.idReseña)}
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p>No hay reseñas para esta tienda.</p>
            )}
            {!userResenia && (
                <button 
                    className={styles.botonAgregar} 
                    onClick={() => {
                        setReseniaEditada(null); 
                        setModalVisible(true);
                    }}
                >
                  Agregar Reseña
                </button>
            )}
        </div></>
    );
}
