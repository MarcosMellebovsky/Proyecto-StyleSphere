"use client";
import { useEffect, useState, useContext } from "react";
import { useSearchParams } from "next/navigation";
import { UserContext } from "@/app/components/contexts/UserContext";
import styles from "./TarjetaPago.module.css";

export default function TarjetaPago() {
  const [tarjetas, setTarjetas] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const idCliente = searchParams.get("idCliente");
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchTarjetas = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/tarjeta`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTarjetas(data);
        } else {
          console.error("Error al obtener las tarjetas");
        }
      } catch (error) {
        console.error("Error al hacer la solicitud:", error);
      } finally {
        setLoading(false);
      }
    };

    if (idCliente && user && user.token) {
      fetchTarjetas();
    }
  }, [idCliente, user]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div className={styles.tarjetaPagoContainer}>
      <h2 className={styles.titulo}>Selecciona una tarjeta</h2>
      {tarjetas.length > 0 ? (
        <div className={styles.tarjetasGrid}>
          {tarjetas.map((tarjeta) => (
            <div key={tarjeta.idTarjeta} className={styles.tarjeta}>
              <div className={styles.tarjetaChip}></div>
              <p className={styles.tarjetaNumero}>
                **** **** **** {tarjeta.numeroDeTarjeta.slice(-4)}
              </p>
              <p className={styles.tarjetaNombre}>
                {tarjeta.nombreDelTitular || "Nombre Apellido"}
              </p>
              <p className={styles.tarjetaFecha}>
                Vencimiento: {tarjeta.fechavencimiento}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No hay tarjetas disponibles</p>
      )}
    </div>
  );
}
