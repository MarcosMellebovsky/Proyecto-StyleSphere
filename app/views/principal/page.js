import Link from 'next/link';
import styles from './principal.module.css';
import Image from 'next/image';

export default function Principal() {
    return (
        <div className={styles.padre}>
            <main className={styles.main}>
                <Image
                    src="/logo.png"
                    width={1000}
                    height={250}
                    alt="Picture of the author"
                    className={styles.img}
                />
                <h1 className={styles.h1}>¡Bienvenido!</h1>
                <p className={styles.d}>¡Encuentra todo lo que quieras aquí!</p>
                <hr className={styles.clasHR} />
                <div className={styles.bon}>
                    <Link className={styles.boton} href="../views/Home">
                        Iniciar sesión
                    </Link>
                    <Link className={styles.boton} href="/home">
                        Registrarse
                    </Link>
                </div>
            </main>
        </div>
    );
}
