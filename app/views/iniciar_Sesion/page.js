"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "./iniciar_Sesion.module.css"

export default function Iniciar_Sesion (){
    return(
        <>
            <section className={styles.padre}>
        <div class={styles.headerRegistro}>
            <Image
            src={"/logo.png" }
            alt="Logo"
            className={styles.logo}
            width={400}
            height={160}
            />
            
            <h1>Ingrese a su cuenta</h1>
            <p>Es genial verte de nuevo</p>
        </div>

        <form className={styles.formContainer}>


            <div className={styles.input_container}>
                <label className={styles.input_label} for="email_field">Email</label>
                <svg fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg" className={styles.icon}>
                    <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="#141B34" d="M7 8.5L9.94202 10.2394C11.6572 11.2535 12.3428 11.2535 14.058 10.2394L17 8.5"></path>
                    <path stroke-linejoin="round" stroke-width="1.5" stroke="#141B34" d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z"></path>
                </svg>
                <input placeholder="nombre@mail.com" title="Inpit title" name="input-name" type="text" className={styles.input_field} id="email_field"/>
            </div>

            <div className={styles.input_container}>
                <label className={styles.input_label} for="password_field">Contraseña</label>
                <svg fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg" className={styles.icon}>
                    <path stroke-linecap="round" stroke-width="1.5" stroke="#141B34" d="M18 11.0041C17.4166 9.91704 16.273 9.15775 14.9519 9.0993C13.477 9.03404 11.9788 9 10.329 9C8.67911 9 7.18091 9.03404 5.70604 9.0993C3.95328 9.17685 2.51295 10.4881 2.27882 12.1618C2.12602 13.2541 2 14.3734 2 15.5134C2 16.6534 2.12602 17.7727 2.27882 18.865C2.51295 20.5387 3.95328 21.8499 5.70604 21.9275C6.42013 21.9591 7.26041 21.9834 8 22"></path>
                    <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="#141B34" d="M6 9V6.5C6 4.01472 8.01472 2 10.5 2C12.9853 2 15 4.01472 15 6.5V9"></path>
                    <path fill="#141B34" d="M21.2046 15.1045L20.6242 15.6956V15.6956L21.2046 15.1045ZM21.4196 16.4767C21.7461 16.7972 22.2706 16.7924 22.5911 16.466C22.9116 16.1395 22.9068 15.615 22.5804 15.2945L21.4196 16.4767ZM18.0228 15.1045L17.4424 14.5134V14.5134L18.0228 15.1045ZM18.2379 18.0387C18.5643 18.3593 19.0888 18.3545 19.4094 18.028C19.7299 17.7016 19.7251 17.1771 19.3987 16.8565L18.2379 18.0387ZM14.2603 20.7619C13.7039 21.3082 12.7957 21.3082 12.2394 20.7619L11.0786 21.9441C12.2794 23.1232 14.2202 23.1232 15.4211 21.9441L14.2603 20.7619ZM12.2394 20.7619C11.6914 20.2239 11.6914 19.358 12.2394 18.82L11.0786 17.6378C9.86927 18.8252 9.86927 20.7567 11.0786 21.9441L12.2394 20.7619ZM12.2394 18.82C12.7957 18.2737 13.7039 18.2737 14.2603 18.82L15.4211 17.6378C14.2202 16.4587 12.2794 16.4587 11.0786 17.6378L12.2394 18.82ZM14.2603 18.82C14.8082 19.358 14.8082 20.2239 14.2603 20.7619L15.4211 21.9441C16.6304 20.7567 16.6304 18.8252 15.4211 17.6378L14.2603 18.82ZM20.6242 15.6956L21.4196 16.4767L22.5804 15.2945L21.785 14.5134L20.6242 15.6956ZM15.4211 18.82L17.8078 16.4767L16.647 15.2944L14.2603 17.6377L15.4211 18.82ZM17.8078 16.4767L18.6032 15.6956L17.4424 14.5134L16.647 15.2944L17.8078 16.4767ZM18.6032 15.6956L20.6242 17.7187L21.785 16.5365L19.764 14.5134L18.6032 15.6956ZM19.3987 18.028L21.7854 15.6956L20.6242 14.5134L18.2379 16.8565L19.3987 18.028ZM15.4211 21.9441C15.9676 21.3976 15.9676 20.533 15.4211 19.9865L13.0995 22.3078L14.2603 23.4901L16.582 21.1688C17.1285 20.6223 17.1285 19.7576 16.582 19.2111L15.4211 20.3934C14.8746 19.8469 13.9623 19.8469 13.4158 20.3934L15.4211 22.3987C16.582 23.5597 17.1285 23.5597 18.2379 22.3987L19.3987 21.2165L15.4211 18.82L16.582 17.6378C17.1285 18.1843 17.1285 19.0502 16.582 19.5977L15.4211 18.82ZM16.647 17.6378L14.2603 20.7619L15.4211 21.9441L17.8078 18.82L16.647 17.6378ZM18.6032 18.028L16.647 19.9865L17.8078 21.1688L19.764 19.2111L18.6032 18.028Z"></path>
                </svg>
                <input placeholder="Ingresa tu contraseña" title="Inpit title" name="input-name" type="password" className={styles.input_field} id="password_field"/>
            </div>

           
            <div className={styles.divSumbit}>
            <Link className={styles.submit_button} href={"#"}>Iniciar sesión</Link> 
            </div>
            

           
        </form>

        <div className={styles.links}>
                <Link className={styles.olvidaste} href="#">Olvidaste tu contraseña? <strong className={styles.strongA}>Cambiar contraseña</strong></Link>
        </div>

            

        <div className={styles.separator}>
          <hr className={styles.line}/>
          <span>O</span>
          <hr className={styles.line}/>
        </div>
        
    
        <div className={styles.divBtn}>

        <button className={styles.btnG}>
            <svg version="1.1" width="20" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style={{ enableBackground: "new 0 0 512 512" }} xmlSpace="preserve">
                <path style={{ fill: "#FBBB00" }} d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256 c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456 C103.821,274.792,107.225,292.797,113.47,309.408z"></path>
                <path style={{ fill: "#518EF8" }} d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451 c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z"></path>
                <path style={{ fill: "#28B446" }} d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512 c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771 c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z"></path>
                <path style={{ fill: "#F14336" }} d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012 c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h0.014C71.23,56.123,157.06,0,256,0C318.115,0,375.068,22.126,419.404,58.936z"></path>
            </svg>
            Registrate con Google
        </button>

        </div>

        <div className={styles.divRegistro}>

        <Link href="#">No tienes cuenta? <strong>Regístrate</strong></Link>
        
        </div>

        
    

    </section>
        
        </>
    )
}