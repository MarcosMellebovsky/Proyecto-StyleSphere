import Link from 'next/link';
import styles from './principal.module.css';

export default function Principal() {

    return(
        <div className={styles.padre}>


        <main className={styles.main}>
            <img className={styles.img} src="/logo.png" alt="" img/>
            <h1 className={styles.h1}>¡Bienvenido!</h1>
            <p className={styles.d}>¡Encuentra todo lo que quieras aquí!</p>
            <hr className={styles.clasHR}></hr>
            <div className={styles.bon}>
                <Link className={styles.boton} href="../Home">Iniciar sesion</Link>
                <Link  href="../Home" className={styles.boton}> registrarse</Link>
            </div>

            </main>

        </div>
    )
}