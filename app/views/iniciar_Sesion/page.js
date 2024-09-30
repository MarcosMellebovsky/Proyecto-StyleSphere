"use client";
import { useState,useContext  } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import styles from "./iniciar_Sesion.module.css";
import { UserContext } from "../../components/contexts/UserContext"; 


export default function Iniciar_Sesion() {
  const [email, setEmail] = useState("");
  const { setUser } = useContext(UserContext); 

  const [password, setPassword] = useState("");
  const [mailValido, setmailValido] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); 
  const router = useRouter();

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    const emailRegla = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setmailValido(emailRegla.test(value));
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

      if (response.ok) {
        // Guarda el token, nombre y apellido en localStorage y el contexto
        localStorage.setItem("token", data.token); // Guarda el token
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
      <h3 className={styles.bienvenida}>¡Bienvenido/a!</h3>

      <div className={styles.todo}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <p className={styles.title}>Iniciar Sesion</p>

          <label>
            <input
              required
              placeholder=""
              type="email"
              className={styles.input}
              value={email}
              onChange={handleEmailChange}
            />
            <span>Correo electronico*</span>
          </label>

          <label>
            <input
              required
              placeholder=""
              type= "password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span>Contraseña*</span>
            <button
              type="button"
              className={styles.toggleButton}
            >
            </button>
          </label>

          {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

          <button className={styles.submit} type="submit">
            Siguiente
          </button>
          <p className={styles.message}>
            Al continuar acepta nuestros términos de uso y política de
            privacidad.
          </p>
          <div className={styles.links}>
            <Link className={styles.olvidaste} href="../views/Inicio">
              Olvidaste tu contraseña?{" "}
              <strong className={styles.strongA}>Cambiar contraseña</strong>
            </Link>
          </div>

          <p className={styles.signin}>
            ¿No tienes cuenta?{" "}
            <Link href={"../views/registro"}>Registrarse</Link>
          </p>
        </form>
      </div>

      <div className={styles.separator}>
        <hr className={styles.line} />
        <span>O</span>
        <hr className={styles.line} />
      </div>

      <div className={styles.divBtn}>
        <button className={styles.btnG}>
          <svg
            version="1.1"
            width="20"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 512 512"
            style={{ enableBackground: "new 0 0 512 512" }}
            xmlSpace="preserve"
          >
          </svg>
          <button className={styles.btnG} onClick={() => window.location.href = 'http://localhost:3001/auth/google'}>
  Regístrate con Google
</button>

        </button>
      </div>
    </>
  );
}

