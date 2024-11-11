"use client";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "@/app/components/contexts/UserContext";
import { useSearchParams } from "next/navigation"; // Importamos useSearchParams
import styles from "./Pedido.module.css"; // Define tu propio CSS aquí para estilizar
import Link from "next/link";

export default function Pedido() {
  const [detallesPedido, setDetallesPedido] = useState([]);
  const [pedidoInfo, setPedidoInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  // Obtener los parámetros de búsqueda de la URL
  const searchParams = useSearchParams();
  const idPedido = searchParams.get('idPedido'); // Extraemos el idPedido de los parámetros

  useEffect(() => {
    const fetchPedido = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/pedido/${idPedido}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPedidoInfo(data);
        } else {
          console.error("Error al obtener la información del pedido");
        }
      } catch (error) {
        console.error("Error al hacer la solicitud:", error);
      }
    };

    const fetchDetallesPedido = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/detallePedido/${idPedido}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setDetallesPedido(data);
        } else {
          console.error("Error al obtener los detalles del pedido");
        }
      } catch (error) {
        console.error("Error al hacer la solicitud:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user && user.token && idPedido) {
      fetchPedido();
      fetchDetallesPedido();
    }
  }, [user, idPedido]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Detalles del Pedido</h1>

      {/* Lista de productos */}
      <div className={styles.detalleProductos}>
        {detallesPedido.length > 0 ? (
          detallesPedido.map((detalle) => (
            <div key={detalle.idDetallePedido} className={styles.productItem}>
              <p>Producto ID: {detalle.idProducto}</p>
              <p>Cantidad: {detalle.cantidad}</p>
              {/* Aquí podrías incluir más detalles si tienes información del producto */}
            </div>
          ))
        ) : (
          <p>No hay productos en este pedido.</p>
        )}
      </div>

      {/* Información del pedido */}
      {pedidoInfo && (
        <div className={styles.pedidoInfo}>
          <h2>Información del Pedido</h2>
          <p>Método de Pago: {pedidoInfo.metodoDePago}</p>
          <p>Tarifa de Servicio: ${pedidoInfo.tarifaDeServicio}</p>
          <p>Descuento: ${pedidoInfo.descuento}</p>
          <p>Precio Final: ${pedidoInfo.precioFinal}</p>
        </div>
      )}
    </div>
  );
}
