"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "./cambiar_clave.module.css";
import emailjs from 'emailjs-com';
import { useRouter } from "next/navigation";

emailjs.init("1w7YhHERAr_N8BAJz");

export default function CambiarContra() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [step, setStep] = useState(1);
    const [verificationCode, setVerificationCode] = useState("");
    const [generatedCode, setGeneratedCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const router = useRouter();

    const generateCode = () => {
        return Math.floor(1000 + Math.random() * 9000).toString();
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        const code = generateCode();
        setGeneratedCode(code);

        const templateParams = {
            reply_to: email,
            message: code,
        };

        emailjs.send('default_service', 'template_qfr3bqi', templateParams)
            .then(() => {
                setMessage("Código enviado a tu correo. Verifica tu bandeja de entrada.");
                setError("");
                setStep(2);
            })
            .catch((error) => {
                setError("Error al enviar el correo. Por favor, intenta de nuevo.");
                setMessage(""); 
            });
    };

    const handleVerificationSubmit = (e) => {
        e.preventDefault();
        if (verificationCode === generatedCode) {
            setMessage("Código verificado correctamente.");
            setError("");
            setStep(3);
        } else {
            setError("Código incorrecto. Intenta de nuevo.");
            setMessage("");
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        
        const response = await fetch('http://localhost:3001/api/cliente/actualizarContra    ', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                contraseña: newPassword,
            }),
        });

        const result = await response.json();

        if (response.ok) {
            setMessage("Contraseña cambiada con éxito.");
            setError("");
            router.push("/views/iniciar_Sesion");
        } else {
            setError(result[0]); // Mensaje de error desde la API
            setMessage("");
        }
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.VolverHeader}>
                    <Link className={styles.AHeader} href="./iniciar_Sesion">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-chevron-left back-button" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                        </svg>
                    </Link>
                </div>
                <h1 className={styles.TituloCategorias}>Olvidaste tu contraseña</h1>
                <p className={styles.subtitulo}>
                    {step === 1 && "Ingresa tu correo electrónico para el proceso de verificación."}
                    {step === 2 && "Ingresa el código que hemos enviado a tu correo."}
                    {step === 3 && "Ingresa tu nueva contraseña."}
                </p>
                <div className={styles.formContainer}> 
                    {step === 1 && (
                        <form className={styles.form} onSubmit={handleEmailSubmit}>   
                            <div className={styles.input_container}>
                                <label className={styles.checkbox_label}> Email* </label>
                                <input 
                                    required 
                                    placeholder="Tu correo electrónico" 
                                    type="email" 
                                    className={styles.input} 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <button className={styles.submit_button} type="submit">Siguiente</button>
                            </div>
                        </form>
                    )}
                    {step === 2 && (
                        <form className={styles.form} onSubmit={handleVerificationSubmit}>   
                            <div className={styles.input_container}>
                                <label className={styles.checkbox_label}> Código de verificación* </label>
                                <input 
                                    required 
                                    placeholder="Código recibido" 
                                    type="text" 
                                    className={styles.input} 
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                />
                                <button className={styles.submit_button} type="submit">Verificar</button>
                            </div>
                        </form>
                    )}
                    {step === 3 && (
                        <form className={styles.form} onSubmit={handlePasswordChange}>   
                            <div className={styles.input_container}>
                                <label className={styles.checkbox_label}> Nueva Contraseña* </label>
                                <input 
                                    required 
                                    placeholder="Nueva contraseña" 
                                    type="password" 
                                    className={styles.input} 
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <button className={styles.submit_button} type="submit">Cambiar Contraseña</button>
                            </div>
                        </form>
                    )}
                    {message && <p className={styles.successMessage}>{message}</p>}
                    {error && <p className={styles.errorMessage}>{error}</p>}
                </div>
            </div>
        </>
    );
}
