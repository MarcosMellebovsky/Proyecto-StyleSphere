import Navegador from "@/app/components/navegador";
import styles from './Carrito.module.css'
import Link from "next/link";


export default function Carrito() {
    return(
        <>
        <div className={styles.container}>
            <div className={styles.VolverHeader}>
                <Link className={styles.AHeader} href="./Inicio">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-chevron-left back-button" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                    </svg>
                </Link>
                <h1 className={styles.TituloCategorias}> Carrito</h1>

            </div>  
        </div>
        
        <Navegador></Navegador>
        </>
    )
}