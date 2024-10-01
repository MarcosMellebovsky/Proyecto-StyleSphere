"use client";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import styles from "./registro.module.css";
import { UserContext } from "../../components/contexts/UserContext"; 
import Link from "next/link";

import { FaCheckCircle, FaTimesCircle  } from "react-icons/fa"; 

export default function Registro() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setName] = useState("");
  const [apellido, setApellido] = useState("");
  const [mailValido, setMailValido] = useState(null);
  const [nombreValido, setNombreValido] = useState(null);
  const [apellidoValido, setApellidoValido] = useState(null);
  const [passwordValido, setPasswordValido] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const { setUser } = useContext(UserContext); 
  const router = useRouter();

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (value === "") {
      setMailValido(null);
    } else {
      const emailRegla = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setMailValido(emailRegla.test(value));
    }
  };
  
  const handleNombreChange = (e) => {
    const value = e.target.value;
    setName(value);
    if (value === "") {
      setNombreValido(null);
    } else {
      setNombreValido(value.length > 0);
    }
  };
  
  const handleApellidoChange = (e) => {
    const value = e.target.value;
    setApellido(value);
    if (value === "") {
      setApellidoValido(null);
    } else {
      setApellidoValido(value.length > 0);
    }
  };
  
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value === "") {
      setPasswordValido(null);
    } else {
      setPasswordValido(value.length >= 6);
    }
  };

  const isFormValid = () => {
    return (
      nombreValido && apellidoValido && mailValido && passwordValido
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    try {
      const response = await fetch("http://localhost:3001/api/cliente/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, nombre, apellido }),
      });

      const responseBody = await response.text();
      if (response.ok && responseBody) {
        const data = JSON.parse(responseBody);
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
        router.push("../../views/iniciar_Sesion");
      } else if (responseBody) {
        const errorData = JSON.parse(responseBody);
        setErrorMessage(errorData.message || "Error al registrar el usuario.");
      } else {
        setErrorMessage("Error desconocido al registrar el usuario.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorMessage("Hubo un problema al comunicarse con el servidor.");
    }
  };

  return (
    <>
      <div className={styles.hoad}>
        <div className={styles.headerRegistro}>
          <img src={"/logo.png"} alt="Logo" className={styles.logo} width={400} height={160} />
        </div>
      </div>

      <div className={styles.contenedor}>
        <form className={styles.form} onSubmit={handleSubmit}>
          
          <div className={styles.contenedor_subHeader}>
            <h1 className={styles.title}>Crear cuenta</h1>
            <p className={styles.p2}>Creemos tu cuenta.</p>
          </div>
          

          <div className={styles.contenedor_inputs}>
            <div className={styles.inputGroup}>
            <label className={styles.label}>Nombre</label>

              <input
                required
                type="text"
                className={`${styles.input} ${nombreValido === false ? styles.inputError : nombreValido === true ? styles.inputSuccess : ''}`}
                value={nombre}
                onChange={handleNombreChange}
                placeholder="Introduzca su nombre"
              />
              {nombreValido !== null && (
                nombreValido ? <FaCheckCircle className={styles.iconSuccess} /> : <FaTimesCircle className={styles.iconError} />
              )}
            </div>

            <div className={styles.inputGroup}>
            <label className={styles.label}>Apellido</label>

              <input
                required
                type="text"
                className={`${styles.input} ${apellidoValido === false ? styles.inputError : apellidoValido === true ? styles.inputSuccess : ''}`}
                value={apellido}
                onChange={handleApellidoChange}
                placeholder="Introduzca su apellido"
              />
              {apellidoValido !== null && (
                apellidoValido ? <FaCheckCircle className={styles.iconSuccess} /> : <FaTimesCircle className={styles.iconError} />
              )}
            </div>

            <div className={styles.inputGroup}>
            <label className={styles.label}>Correo electrónico</label>

              <input
                required
                type="email"
                className={`${styles.input} ${mailValido === false ? styles.inputError : mailValido === true ? styles.inputSuccess : ''}`}
                value={email}
                onChange={handleEmailChange}
                placeholder="Introduzca su mail"
              />
              {mailValido !== null && (
                mailValido ? <FaCheckCircle className={styles.iconSuccess} /> : <FaTimesCircle className={styles.iconError} />
              )}
            </div>

            <div className={styles.inputGroup}>
            <label className={styles.label}>Contraseña</label>

              <input
                required
                type="password"
                className={`${styles.input} ${passwordValido === false ? styles.inputError : passwordValido === true ? styles.inputSuccess : ''}`}
                value={password}
                onChange={handlePasswordChange}
                placeholder="Introduzca su contraseña"
              />
              {passwordValido !== null && (
                passwordValido ? <FaCheckCircle className={styles.iconSuccess} /> : <FaTimesCircle className={styles.iconError} />
              )}
            </div>

          </div>

          {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

          <div className={styles.contenedorBoton}>

            <button
              className={styles.submit}
              type="submit"
              disabled={!isFormValid()}
              style={{ backgroundColor: isFormValid() ? '	#41419b' : 'grey' }}
            >
              Registrarse
            </button>

          </div>
        
         
        </form>

        <div className={styles.separator}>
          <hr className={styles.line} />
            <span>Acceso rapido con</span>
          <hr className={styles.line} />
      </div>
      <div className={styles.containerBtn}> 
    <button className={styles.btnG} onClick={() => window.location.href = 'http://localhost:3001/auth/google'}>
      <img src={"/google.png"} className={styles.iconGoogle}></img>
      Regístrate con Google
    </button>
  </div>

  <p className={styles.signin}>
            Ya tienes cuenta? <Link className={styles.linkFromIniciarSesion} href={"../views/iniciar_Sesion"}>Iniciar sesión</Link>
          </p>
        

      </div>
    </>
  );
}
