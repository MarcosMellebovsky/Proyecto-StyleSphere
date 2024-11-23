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
    <div className={styles.container}>
      <h1 className={styles.title}>Resumen de la Compra</h1>

      <div className={styles.detalleProductos}>
        {pedidoInfo && pedidoInfo.productos && pedidoInfo.productos.length > 0 ? (
          pedidoInfo.productos.map((detalle) => (
            <div key={detalle.idCarrito} className={styles.productItem}>
              <img src={detalle.imagen} alt={`Producto ${detalle.idCarrito}`} className={styles.productImage} />
              <p>{detalle.nombre}</p>
              <p>Precio: ${detalle.precioFinal}</p>
            </div>
          ))
        ) : (
          <p>No hay productos en este pedido.</p>
        )}
      </div>

      {/* Formas de pago */}
      <div className={styles.formaPago}>
        <h2>Forma de Pago</h2>
        <label>
          <input type="radio" name="pago" value="tarjeta" /> Tarjeta
        </label>
        <label>
          <input type="radio" name="pago" value="mercadopago" /> MercadoPago
        </label>
      </div>

      {/* Resumen */}
      <div className={styles.resumen}>
        <h2>Resumen</h2>
        <p>Subtotal: ${pedidoInfo ? pedidoInfo.precioTotal : 0}</p>
        <p>Total: ${pedidoInfo ? pedidoInfo.precioTotal : 0}</p>
      </div>
    </div>
  );
}


