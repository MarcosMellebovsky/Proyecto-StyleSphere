"use client";
import Navegador from "@/app/components/navegador";
import styles from "./Carrito.module.css";
import Link from "next/link";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "@/app/components/contexts/UserContext";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function Carrito() {
  const [productosCarrito, setProductosCarrito] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
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
    const fetchCarrito = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/carrito/", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setProductosCarrito(data);
        } else {
          console.error("Error al obtener los productos del carrito");
        }
      } catch (error) {
        console.error("Error al hacer la solicitud:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user && user.token) {
      fetchCarrito();
    }
  }, [user]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const updateCantidad = async (productoId, cantidad) => {
    setProductosCarrito((prevProductos) =>
      prevProductos.map((producto) =>
        producto.idProducto === productoId
          ? {
              ...producto,
              cantidadAComprar: Math.max(
                1,
                producto.cantidadAComprar + cantidad
              ),
            }
          : producto
      )
    );
    const productoEnCarrito = productosCarrito.find(
      (producto) => producto.idProducto === productoId
    );

    if (productoEnCarrito) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      };
      try {
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

        if (!response.ok) {
          console.error(
            "Error al actualizar la cantidad del producto en la base de datos"
          );
        }
      } catch (error) {
        console.error("Error en la llamada a la API:", error);
      }
    }
  };

  const eliminarProducto = async (idCarrito) => {
    try {
      const headers = {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      };
      const response = await fetch(
        `http://localhost:3001/api/carrito/${idCarrito}`,
        {
          method: "DELETE",
          headers: headers,
        }
      );

      if (response.ok) {
        setProductosCarrito((prevProductos) =>
          prevProductos.filter((producto) => producto.idCarrito !== idCarrito)
        );
      } else {
        console.error("Error al eliminar el producto del carrito");
      }
    } catch (error) {
      console.error("Error en la llamada a la API:", error);
    }
  };

  if (loading) {
    return <p>Cargando...</p>;
  }
  const handleIrAPagar = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/pedido/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Envía datos del pedido según tus necesidades, como detalles del carrito, método de pago, etc.
        }),
      });
  
      if (response.ok) {
        const nuevoPedido = await response.json(); // Asume que el backend devuelve el idPedido creado
        router.push(`/pedido/${nuevoPedido.idPedido}`); // Redirige a la página de detalles del pedido
      } else {
        console.error('Error al crear el pedido');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div
          className={`${styles.VolverHeader} ${
            isScrolled ? styles.headerScrolled : ""
          }`}
        >
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
          <h1
            className={`${styles.TituloCategorias} ${
              isScrolled ? styles.titleScrolled : ""
            }`}
          >
            {" "}
            Carrito
          </h1>
        </div>

        <div className={styles.productList}>
          {productosCarrito.length > 0 ? (
            productosCarrito.map((producto) => (
              <div key={producto.idCarrito} className={styles.productItem}>
                <div className={styles.imageContainer}>
                  <Link
                    href={`/views/detalle_producto?idProducto=${producto.idProducto}`}
                  >
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      className={styles.productImage}
                    />
                  </Link>
                </div>
                <div className={styles.productDetails}>
                  <p className={styles.productName}>{producto.nombre}</p>
                  <p className={styles.productPrice}>
                    ${producto.precio * producto.cantidadAComprar}
                  </p>
                  <p className={styles.productPrice}>{producto.color}</p>
                  <p className={styles.productPrice}>{producto.talle}</p>
                  <div className={styles.controls}>
                    <div className={styles.botonContainer}>
                      <button
                        className={styles.botonBorrar}
                        onClick={() => eliminarProducto(producto.idCarrito)} // Use idCarrito here
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                    <div className={styles.quantityControl}>
                      <button
                        onClick={() => updateCantidad(producto.idProducto, -1)}
                      >
                        -
                      </button>
                      <span>{producto.cantidadAComprar} </span>
                      <button
                        onClick={() => updateCantidad(producto.idProducto, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className={styles.noProducts}>Tu carrito está vacío</p>
          )}
        </div>
        <div className={styles.checkoutButtonContainer}>
      <button className={styles.checkoutButton} onClick={handleIrAPagar}>
        Ir a Pagar
      </button>
    </div>
      </div>

      <Navegador/>
    </>
  );
}
