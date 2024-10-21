"use client";
import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/app/components/contexts/UserContext";
import Navegador from "@/app/components/navegador";
import styles from "./detalleProducto.module.css";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function DetalleProducto() {
  const [producto, setProducto] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cantidad, setCantidad] = useState(1);
  const [carrito, setCarrito] = useState([]);
  const searchParams = useSearchParams();
  const idProducto = searchParams.get("idProducto");
  const { user } = useContext(UserContext);
  const router = useRouter();

  const colores = {
    rojo: "red",
    azul: "blue",
    verde: "green",
    amarillo: "yellow",
    negro: "black",
    blanco: "white",
    gris: "gray",
    naranja: "orange",
    violeta: "purple",
    rosa: "pink",
    beige: "beige",
  };

  useEffect(() => {
    const fetchProducto = async () => {
      if (idProducto) {
        try {
          const response = await fetch(
            `http://localhost:3001/api/producto/${idProducto}`
          );
          const data = await response.json();
          setProducto(data);
          setLoading(false);
        } catch (error) {
          console.error("Error al obtener el producto:", error);
          setLoading(false);
        }
      }
    };
    fetchProducto();
  }, [idProducto]);

  // Obtener productos en el carrito del usuario
  useEffect(() => {
    const fetchCarrito = async () => {
      if (user?.token) {
        try {
          const response = await fetch("http://localhost:3001/api/carrito", {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          const data = await response.json();
          setCarrito(Array.isArray(data) ? data : []);
        } catch (error) {
          console.error("Error al obtener el carrito:", error);
        }
      }
    };
    fetchCarrito();
  }, [user]);

  // Función para agregar o actualizar producto en el carrito
  const agregarOActualizarProducto = async (productoSeleccionado) => {
    const productoEnCarrito = carrito.find(
      (item) => item.idProducto === productoSeleccionado.idProducto
    );

    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      };

      if (productoEnCarrito) {
        const response = await fetch(
          `http://localhost:3001/api/carrito/${productoEnCarrito.idProducto}`,
          {
            method: "PUT",
            headers,
            body: JSON.stringify({
              cantidad: productoEnCarrito.cantidadAComprar + cantidad,
            }),
          }
        );

        if (response.ok) {
          router.push("/views/carrito");
        } else {
          console.error("Error al actualizar la cantidad en el carrito");
        }
      } else {
        const response = await fetch("http://localhost:3001/api/carrito", {
          method: "POST",
          headers,
          body: JSON.stringify({
            idProducto: productoSeleccionado.idProducto,
            cantidad: cantidad,
          }),
        });

        if (response.ok) {
          router.push("/views/carrito");
        } else {
          console.error("Error al agregar al carrito");
        }
      }
    } catch (error) {
      console.error(
        "Error al agregar o actualizar el producto en el carrito:",
        error
      );
    }
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (producto.length === 0) {
    return <p>No se encontró el producto.</p>;
  }

  return (
    <>
      <div className={styles.VolverHeader}>
        <Link className={styles.AHeader} href="./Inicio">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            className="bi bi-chevron-left back-button"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
            />
          </svg>
        </Link>
        <h1 className={styles.categoriaTitle}>Detalles</h1>

        {/* Mapear sobre el array de productos */}
        {producto.map((prod) => (
          <div className={styles.productItem} key={prod.idProducto}>
            <div className={styles.imageContainer}>
              <img
                src={prod.imagen}
                alt={prod.nombre}
                className={styles.productImage}
              />
            </div>
            <p className={styles.productName}>{prod.nombre}</p>
            <p className={styles.productPrice}>${prod.precio}</p>
            <p className={styles.productPrice}>Talle: {prod.talle}</p>
            <div className={styles.colorContainer}>
              <span>Color:</span>
              <div
                style={{
                  backgroundColor:
                    colores[prod.color.toLowerCase()] || prod.color,
                  width: "20px",
                  height: "20px",
                  display: "inline-block",
                  marginLeft: "10px",
                  border: "1px solid #000",
                }}
              ></div>
            </div>

            <div className={styles.cantidadContainer}>
              <label htmlFor="cantidad">Cantidad:</label>
              <input
                type="number"
                id="cantidad"
                value={cantidad}
                onChange={(e) => setCantidad(Number(e.target.value))}
                min="1"
              />
            </div>

            <div className={styles.boton}>
              <button
                className={styles.botonAgregar}
                onClick={() => agregarOActualizarProducto(prod)}
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        ))}
      </div>
      <Navegador />
    </>
  );
}
