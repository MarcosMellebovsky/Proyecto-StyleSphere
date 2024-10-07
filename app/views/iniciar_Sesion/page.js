"use client";
import { useState,useContext  } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import styles from "./iniciar_Sesion.module.css";
import { UserContext } from "../../components/contexts/UserContext"; 
import { FaCheckCircle, FaTimesCircle  } from "react-icons/fa"; 




export default function Iniciar_Sesion() {
  const [email, setEmail] = useState("");
  const { setUser } = useContext(UserContext); 
  const { login } = useContext(UserContext); 
  const [password, setPassword] = useState("");
  const [mailValido, setMailValido] = useState(null);
  const [passwordValido, setPasswordValido] = useState(null);

  const [errorMessage, setErrorMessage] = useState(""); 
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
       mailValido && passwordValido
    );
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/cliente/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log(data)
      if (response.ok) {
        login(data); 
        setUser(data);

        router.push("../../views/Inicio");
      } else {
        setErrorMessage("Email o contraseña incorrectos.");
      }
    } catch (error) {
      setErrorMessage("Error al conectar con la API");
    }
};

  return (
    <>
      <div className={styles.hoad}>
        <div className={styles.headerRegistro}>
          <img
            src={"/logo.png"}
            alt="Logo"
            className={styles.logo}
            width={400}
            height={160}
          />
        </div>
      </div>

        <form className={styles.form} onSubmit={handleSubmit}>

          <div className={styles.div_TituloYsubTitulo}>
            <h1 className={styles.title}>Ingrese a su cuenta</h1>
            <p className={styles.subTitulo}>Es genial verte denuevo.</p>
          </div>
          
          <div className={styles.contenedor_inputs}>
            
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

          <div className={styles.links}>
            <Link className={styles.olvidaste} href="../views/Inicio">
              Olvidaste tu contraseña?
              <p className={styles.strongA}>Cambiar contraseña</p>
            </Link>
          </div>


          {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

          <div className={styles.contenedorBoton}>

              <button
                className={styles.submit}
                type="submit"
                disabled={!isFormValid()}
                style={{ backgroundColor: isFormValid() ? '#41419b' : 'grey' }}
              >
                Iniciar sesion
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
      Iniciar sesion con Google
    </button>
  </div>

        <p className={styles.signin}>
            ¿No tienes cuenta?
            <Link className={styles.linkFromIniciarSesion} href={"../views/registro"}>Registrarse</Link>
          </p>

       
    </>
  );
}

