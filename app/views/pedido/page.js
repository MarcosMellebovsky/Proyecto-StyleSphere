"use client";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "@/app/components/contexts/UserContext";
import { useSearchParams } from "next/navigation"; // Importamos useSearchParams
import styles from "./Pedido.module.css"; // Define tu propio CSS aquí para estilizar
import Link from "next/link";

export default function Pedido() {
  const [pedidoInfo, setPedidoInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  // Obtener los parámetros de búsqueda de la URL
  const searchParams = useSearchParams();
  const idDetallePedido = searchParams.get('idDetallePedido'); // Extraemos el idPedido de los parámetros

  useEffect(() => {
    const fetchPedido = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/pedido/${idDetallePedido}`, {
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
      } finally {
        setLoading(false);
      }
    };


    if (user && user.token && idDetallePedido) {
      fetchPedido();
    }
  }, [user, idDetallePedido]);

  if (loading) {
    return <p>Cargando...</p>;
  }
  return (
    <div className={styles.resumenCompra}>
      <Link href="/views/carrito" className={styles.volverCarrito}>
        Volver al carrito
      </Link>
      <h2 className={styles.titulo}>Resumen de la compra</h2>

      <div className={styles.detalleProductos}>
        {pedidoInfo && pedidoInfo.productos && pedidoInfo.productos.length > 0 ? (
          pedidoInfo.productos.map((detalle) => (
            <div key={detalle.idCarrito} className={styles.productoItem}>
              <img 
                src={detalle.imagen} 
                alt={detalle.nombre} 
                className={styles.productoImagen}
              />
              <span className={styles.productoCantidad}>{detalle.cantidad}</span>
              <div className={styles.nombrePrecio}>
                <span className={styles.productoNombre}>{detalle.nombre}</span>
                <span className={styles.productoPrecio}>
                  $ {detalle.precioFinal.toLocaleString('es-AR')}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p>No hay productos en este pedido.</p>
        )}
      </div>

      <div className={styles.totalSeccion}>
        <div className={styles.subtotalRow}>
          <span>Subtotal</span>
          <span>$ {pedidoInfo ? pedidoInfo.precioTotal.toLocaleString('es-AR') : '0'}</span>
        </div>
        <div className={styles.totalRow}>
          <span>Total</span>
          <span>$ {pedidoInfo ? pedidoInfo.precioTotal.toLocaleString('es-AR') : '0'}</span>
        </div>
      </div>
    </div>
  );
}


