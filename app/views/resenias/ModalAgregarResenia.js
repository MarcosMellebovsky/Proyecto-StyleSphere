import React, { useState, useEffect } from 'react';
import styles from "./modal.module.css"; 

export default function ModalAgregarResenia({ onClose, onSubmit, initialData }) {
    const [comentario, setComentario] = useState('');
    const [valoracion, setValoracion] = useState(0);

    useEffect(() => {
        if (initialData) {
            setComentario(initialData.comentario);
            setValoracion(initialData.valoracion);
        } else {
            setComentario('');
            setValoracion(0);
        }
    }, [initialData]);

    const handleSubmit = () => {
        if (comentario && valoracion > 0) {
            onSubmit({ comentario, valoracion });
            onClose();
        }
    };

    const renderEstrellas = (valor) => {
        const estrellas = [];
        for (let i = 1; i <= 5; i++) {
            estrellas.push(
                <span
                    key={i}
                    className={i <= valor ? styles.estrellaLlena : styles.estrellaVacia}
                    onClick={() => setValoracion(i)}
                >
                    ★
                </span>
            );
        }
        return <div>{estrellas}</div>;
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2 className={styles.modalTitle}>{initialData ? 'Editar Reseña' : 'Agregar Reseña'}</h2>
                <textarea
                    className={styles.textarea}
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    placeholder="Escribe tu comentario aquí..."
                    rows="4"
                />
                <div className={styles.valoracion}>
                    {renderEstrellas(valoracion)}
                </div>
                <button className={styles.button} onClick={handleSubmit}>
                    {initialData ? 'Actualizar Reseña' : 'Enviar Reseña'}
                </button>
                <button className={`${styles.button} ${styles.closeButton}`} onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
}
