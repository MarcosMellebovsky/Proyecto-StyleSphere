"use client";
import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/app/components/contexts/UserContext";
import Navegador from "@/app/components/navegador";
import styles from "./detalleProducto.module.css";
import { useSearchParams } from "next/navigation";

export default function DetalleProducto() {
  const [producto, setProducto] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cantidad, setCantidad] = useState(1);
  const [carrito, setCarrito] = useState([]);
  const [colorSeleccionado, setColorSeleccionado] = useState(null);
  const [talleSeleccionado, setTalleSeleccionado] = useState(null);
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

  const agregarOActualizarProducto = async (
    productoSeleccionado,
    colorSeleccionado,
    talleSeleccionado
  ) => {
    // Check if there's an existing product in the cart with the same ID, color, and size
    const productoEnCarrito = carrito.find(
      (item) =>
        item.idProducto === productoSeleccionado.idProducto &&
        item.color === colorSeleccionado &&
        item.talle === talleSeleccionado
    );
  
    if (!colorSeleccionado || !talleSeleccionado) {
      alert("Por favor selecciona un color y un talle.");
      return;
    }
  
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      };
  
      if (productoEnCarrito) {
        // If the product already exists in the cart, update its quantity
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
        // If it's a new combination, add it to the cart
        const response = await fetch(
          "http://localhost:3001/api/carrito/agregar",
          {
            method: "POST",
            headers,
            body: JSON.stringify({
              idProducto: productoSeleccionado.idProducto,
              cantidad: cantidad,
              color: colorSeleccionado,
              talle: talleSeleccionado,
            }),
          }
        );
  
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

  if (producto.length == 0) {
    return <p>No se encontró el producto.</p>;
  }

  return (
    <>
      <div className={styles.VolverHeader}>
        <button onClick={() => router.back()} className={styles.AHeader}>
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
        </button>
        <h1 className={styles.categoriaTitle}>Detalles</h1>

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

            <div className={styles.coloresContainer}>
              <p>Colores disponibles:</p>
              <div className={styles.colores}>
                {(() => {
                  const colorElements = [];
                  for (let i = 0; i < prod.colores_disponibles.length; i++) {
                    const color = prod.colores_disponibles[i];
                    colorElements.push(
                      <div
                        key={color}
                        className={`${styles.colorBox} ${
                          colorSeleccionado === color ? styles.selected : ""
                        }`}
                        style={{
                          backgroundColor: colores[color.toLowerCase()],
                        }}
                        onClick={() => setColorSeleccionado(color)}
                        title={color}
                      />
                    );
                  }
                  return colorElements;
                })()}
              </div>
            </div>

            <div className={styles.tallasContainer}>
              <p>Talles disponibles:</p>
              <div className={styles.tallas}>
                {(() => {
                  const tallaElements = [];
                  for (let i = 0; i < prod.talles_disponibles.length; i++) {
                    const talla = prod.talles_disponibles[i];
                    tallaElements.push(
                      <span
                        key={talla}
                        className={`${styles.talla} ${
                          talleSeleccionado === talla ? styles.selected : ""
                        }`}
                        onClick={() => setTalleSeleccionado(talla)}
                      >
                        {talla}
                      </span>
                    );
                  }
                  return tallaElements;
                })()}
              </div>
            </div>

            <div className={styles.boton}>
              <button
                className={styles.botonAgregar}
                onClick={() =>
                  agregarOActualizarProducto(
                    prod,
                    colorSeleccionado,
                    talleSeleccionado
                  )
                }
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
