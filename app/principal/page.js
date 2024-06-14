import Link from 'next/link';
import styles from './principal.module.css';

export default function Inicio() {

    return(
        <body className={styles.bodyy}>
        <main className={styles.main}>
    <img className={styles.img} src="/logo.png" alt="" img/>
    <h1 className={styles.h1}>¡Bienvenido!</h1>
    <p className={styles.d}>¡Encuentra todo lo que quieras aquí!</p>
    
    <div className={styles.bon}>
        
    <button type="button" className={styles.kali}>Ingresar</button>
    <button type="button" className={styles.kali}> registrarse</button>
    </div>
    <p  className={styles.d}><Link  className={styles.d} href="/"> Continuar como invitado</Link></p>
    
        </main>
    
    
    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    </body>
    )
}