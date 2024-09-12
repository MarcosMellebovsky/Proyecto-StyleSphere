"use client";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import styles from "./Registro.module.css";
import { UserContext } from "../../components/contexts/UserContext"; 
import Link from "next/link";

export default function Registro() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nombre, setName] = useState("");
  const [apellido, setApellido] = useState("")
  const [mailValido, setMailValido] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const { setUser } = useContext(UserContext); 
  const router = useRouter();

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    const emailRegla = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setMailValido(emailRegla.test(value));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/cliente/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, nombre , apellido}),
      });

      const data = await response.json();
      console.log(data)

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("apellido", JSON.stringify(data));

        setUser(data);
        router.push("../../views/Inicio");
      } else {
        setErrorMessage(data.message || "Error al registrar el usuario.");
      }
    } catch (error) {
      setErrorMessage("Error al conectar con la API");
      console.log(error)
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
          <p className={styles.title}>Crear cuenta</p>

          <label>
            <input
              required
              type="text"
              className={styles.input}
              value={nombre}
              onChange={(e) => setName(e.target.value)}
            />
            <span>Nombre*</span>
          </label>

          <label>
            <input
              required
              type="text"
              className={styles.input}
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            />
            <span>Apellido*</span>
          </label>

          <label>
            <input
              required
              type="email"
              className={styles.input}
              value={email}
              onChange={handleEmailChange}
            />
            <span>Correo electrónico*</span>
          </label>

          <label>
            <input
              required
             type="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span>Contraseña*</span>
           
          </label>

          <label>
            <input
              required
              type="password"
              className={styles.input}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span>Confirmar contraseña*</span>
          </label>

          {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

          <button className={styles.submit} type="submit">
            Registrarse
          </button>

          <p className={styles.message}>
            Al registrarse acepta nuestros términos de uso y política de privacidad.
          </p>
          <p className={styles.signin}>Ya tienes cuenta? <Link href={"../views/iniciar_Sesion"}>Iniciar sesion</Link></p>

        </form>
      </div>
    </>
  );
}
