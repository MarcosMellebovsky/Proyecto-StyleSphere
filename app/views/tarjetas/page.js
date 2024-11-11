"use client";
import { useState, useEffect, useContext } from "react";
import styles from "./tarjetas.module.css";
import Link from "next/link";
import { UserContext } from "@/app/components/contexts/UserContext";

const Tarjetas = () => {
  const { user } = useContext(UserContext);
  const [tarjetas, setTarjetas] = useState([]);
  const [mostrandoCampos, setMostrandoCampos] = useState(false);
  const [errores, setErrores] = useState({});
  const [formTarjeta, setFormTarjeta] = useState({
    numero: "",
    titular: "",
    fechavencimiento: "",
    fechadesde: "",
    cvv: "",
  });

  // Define fetchTarjetas outside of useEffect
  const fetchTarjetas = async () => {
    try {
      const token = user?.token;
      const response = await fetch("http://localhost:3001/api/tarjeta", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setTarjetas(data);
      } else {
        console.error("Error al obtener las tarjetas:", data);
      }
    } catch (error) {
      console.error("Error en la conexión con la API:", error);
    }
  };

  useEffect(() => {
    if (user?.token) {
      fetchTarjetas();
    }
  }, [user?.token]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "numero") {
      // Elimina los espacios y agrégales cada 4 dígitos para la visualización
      const formattedValue = value
        .replace(/\s+/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim();
      setFormTarjeta((prevForm) => ({
        ...prevForm,
        [name]: formattedValue,
      }));
    } else if (name === "fechavencimiento" || name === "fechadesde") {
      // Asegura que solo se ingresen números
      let sanitizedValue = value.replace(/[^\d]/g, "");

      // Restringe la longitud máxima a 4 caracteres (MMYY)
      if (sanitizedValue.length > 4) {
        sanitizedValue = sanitizedValue.slice(0, 4);
      }

      // Agrega la barra automáticamente después de los dos primeros dígitos (MM/YY)
      if (sanitizedValue.length >= 3) {
        sanitizedValue = `${sanitizedValue.slice(0, 2)}/${sanitizedValue.slice(
          2
        )}`;
      }

      // Permite la edición al borrar (sin duplicar barras)
      setFormTarjeta((prevForm) => ({
        ...prevForm,
        [name]: sanitizedValue,
      }));
    } else {
      setFormTarjeta((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };

  const handleAgregarTarjeta = async () => {
    const { numero, titular, fechavencimiento, fechadesde, cvv } = formTarjeta;

    let valid = true;
    let nuevosErrores = {};
    // Validación de número de tarjeta (debe ser 16 dígitos)
    const numeroSinEspacios = numero.replace(/\s+/g, "");
    if (!/^\d{16}$/.test(numeroSinEspacios)) {
      nuevosErrores.numero = "El número de tarjeta debe tener 16 dígitos";
      valid = false;
    }

    // Validación de titular (solo letras)
    if (!/^[a-zA-Z\s]+$/.test(titular)) {
      nuevosErrores.titular = "El titular debe contener solo letras";
      valid = false;
    }

    const fechaPartsDesde = fechadesde.split("/");
    const fechaPartsVenc = fechavencimiento.split("/");

    if (fechaPartsDesde.length !== 2 || fechaPartsVenc.length !== 2) {
      if (fechaPartsDesde.length !== 2) {
        nuevosErrores.fechadesde =
          "La fecha de inicio debe tener el formato MM/AA";
      }
      if (fechaPartsVenc.length !== 2) {
        nuevosErrores.fechavencimiento =
          "La fecha de vencimiento debe tener el formato MM/AA";
      }
      valid = false;
    } else {
      const [mesDesde, anoDesde] = fechaPartsDesde.map(Number);
      const [mesVenc, anoVenc] = fechaPartsVenc.map(Number);

      // Validar que los valores numéricos de los meses están en el rango correcto antes de cualquier otra validación
      if (isNaN(mesDesde) || mesDesde < 1 || mesDesde > 12) {
        nuevosErrores.fechadesde = "El mes debe estar entre 01 y 12";
        valid = false;
      }
      if (isNaN(mesVenc) || mesVenc < 1 || mesVenc > 12) {
        nuevosErrores.fechavencimiento = "El mes debe estar entre 01 y 12";
        valid = false;
      }

      // Realiza la comparación solo si las fechas son válidas
      if (valid) {
        const fechaDesdeValida = new Date(`20${anoDesde}`, mesDesde - 1);
        const fechaVencValida = new Date(`20${anoVenc}`, mesVenc - 1);

        if (fechaDesdeValida > fechaVencValida) {
          nuevosErrores.fechadesde =
            "La fecha de inicio no puede ser mayor a la fecha de vencimiento";
          valid = false;
        }
      }
    }

    // Validación de CVV (debe ser 3 dígitos numéricos)
    if (!/^\d{3}$/.test(cvv)) {
      nuevosErrores.cvv = "El CVV debe tener 3 dígitos";
      valid = false;
    }

    if (valid) {
      const token = user?.token || localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:3001/api/tarjeta/agregar",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formTarjeta,
            numero: numeroSinEspacios, // Enviamos el número sin los espacios
          }),
        }
      );

      if (response.ok) {
        const nuevaTarjetaCreada = await response.json();
        setTarjetas((prevTarjetas) => [...prevTarjetas, nuevaTarjetaCreada]);
        setFormTarjeta({
          numero: "",
          titular: "",
          fechavencimiento: "",
          fechadesde: "",
          cvv: "",
        });
        setMostrandoCampos(false);
        fetchTarjetas();
      } else {
        console.error("Error al agregar la tarjeta");
      }
    } else {
      setErrores(nuevosErrores);
    }
  };

  const eliminarTarjeta = async (idTarjeta) => {
    const token = user?.token || localStorage.getItem("token");
    const response = await fetch(
      `http://localhost:3001/api/tarjeta/borrar/${idTarjeta}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      fetchTarjetas();
    } else {
      console.error("Error al eliminar la tarjeta");
    }
  };

  const formatearNumeroTarjeta = (numero) => {
    if (!numero) return "";
    // Asegura que el número solo contenga dígitos
    const soloNumeros = numero.replace(/\D/g, "");
    // Agrega un espacio cada 4 dígitos
    return soloNumeros.replace(/(.{4})/g, "$1 ").trim();
  };

  return (
    <div className={styles.container}>
      <div className={styles.VolverHeader}>
        <Link className={styles.AHeader} href="./perfil">
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
      </div>
      <h1 className={styles.txt}>Mis tarjetas</h1>
      <div className={styles.separator}>
        <hr className={styles.line} />
      </div>

      <p className={styles.txtp}>Tarjetas guardadas:</p>
      <div className={styles.tarjetasContainer}>
        {tarjetas.map((tarjeta, index) => (
          <div key={tarjeta.idTarjeta || index} className={styles.tarjetaCard}>
            <div className={styles.cardInfo}>
              <div className={styles.cardNumber}>
                <span>{formatearNumeroTarjeta(tarjeta.numeroDeTarjeta)}</span>
              </div>

              <div className={styles.cardNumber}>
                <span>{tarjeta.nombreDelTitular}</span>
              </div>
              <div className={styles.cardExpDate}>
                <span>{tarjeta.fechadesde}</span>
              </div>
              <div className={styles.cardExpDate}>
                <span>{tarjeta.fechavencimiento}</span>
              </div>
            </div>
            <button
              onClick={() => eliminarTarjeta(tarjeta.idTarjeta)}
              className={styles.eliminarBtn}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-trash"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 0a.5.5 0 0 1 .5.5V1h5V.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V1h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1v10a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V3H4z" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {!mostrandoCampos ? (
        <button
          onClick={() => setMostrandoCampos(true)}
          className={styles.agregarBtn}
        >
          Agregar tarjeta
        </button>
      ) : (
        <div className={styles.formContainer}>
          <h2>Agregar tarjeta</h2>
          <div className={styles.inputGroup}>
            <label htmlFor="numero">Número de tarjeta</label>
            <input
              id="numero"
              type="text"
              name="numero"
              value={formTarjeta.numero}
              onChange={handleChange}
              maxLength="19" // Maximo 16 números + 3 espacios
              placeholder="Número de tarjeta"
            />
            {errores.numero && (
              <div className={styles.error}>{errores.numero}</div>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="titular">Titular</label>
            <input
              id="titular"
              type="text"
              name="titular"
              value={formTarjeta.titular}
              onChange={handleChange}
              placeholder="Titular"
            />
            {errores.titular && (
              <div className={styles.error}>{errores.titular}</div>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="fechavencimiento">
              Fecha de vencimiento (MM/AA)
            </label>
            <input
              id="fechavencimiento"
              type="text"
              name="fechavencimiento"
              value={formTarjeta.fechavencimiento}
              onChange={handleChange}
              placeholder="MM/AA"
            />
            {errores.fechavencimiento && (
              <div className={styles.error}>{errores.fechavencimiento}</div>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="fechadesde">Fecha de inicio (MM/AA)</label>
            <input
              id="fechadesde"
              type="text"
              name="fechadesde"
              value={formTarjeta.fechadesde}
              onChange={handleChange}
              placeholder="MM/AA"
            />
            {errores.fechadesde && (
              <div className={styles.error}>{errores.fechadesde}</div>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="cvv">CVV</label>
            <input
              id="cvv"
              type="text"
              name="cvv"
              value={formTarjeta.cvv}
              onChange={handleChange}
              maxLength="3"
              placeholder="CVV"
            />
            {errores.cvv && <div className={styles.error}>{errores.cvv}</div>}
          </div>

          <div className={styles.btnGroup}>
            <button
              onClick={handleAgregarTarjeta}
              className={styles.guardarBtn}
            >
              Guardar
            </button>
            <button
              onClick={() => setMostrandoCampos(false)}
              className={styles.cancelarBtn}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tarjetas;
