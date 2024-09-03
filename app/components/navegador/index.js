"use client";

import Link from 'next/link';
import styles from '../navegador/navegador.module.css';
import { usePathname } from 'next/navigation';

const Navegador = () => {
  const pathname = usePathname();

  return (
    <div className={styles.navegador}>
      <div className={styles.primeros2}>
        <div className={`${styles.itemsNav} ${pathname === '/views/Inicio' ? styles.active : ''}`}>
          <Link className={styles.linkNav} href="../../views/Inicio">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-house" viewBox="0 0 16 16" aria-label="Home">
              <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
            </svg>
            <p className={`${styles.itemsNav} ${pathname === '/views/Inicio' ? styles.active : ''}`}>Home</p>
          </Link>
        </div>

        <div className={`${styles.itemsNav} ${pathname === '/views/carrito' ? styles.active : ''}`}>
          <Link className={styles.linkNav} href="../../views/carrito">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16" aria-label="Cart">
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
            </svg>
            <p className={`${styles.itemsNav} ${pathname === '/views/carrito' ? styles.active : ''}`}>Carrito</p>
          </Link>
        </div>
      </div>

      <div className={styles.favoritos}>
        <Link className={`${styles.linkNav} ${pathname === '/views/favoritos' ? styles.active : ''}`} href="../../views/favoritos">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-bookmark" viewBox="0 0 16 16" aria-label="Favorites">
            <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87a.5.5 0 0 0 .74-.439V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2M8 12.067L3 14.568V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v12.568l-5-2.501z" />
          </svg>
        </Link>
      </div>

      <div className={styles.ultimos2}>
        <div className={`${styles.itemsNav} ${pathname === '/views/Local' ? styles.active : ''}`}>
          <Link className={styles.linkNav} href="../../views/Local">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-house" viewBox="0 0 16 16" aria-label="Home">
              <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
            </svg>
            <p className={`${styles.itemsNav} ${pathname === '/views/Local' ? styles.active : ''}`}>Locales</p>
          </Link>
        </div>
        <div className={`${styles.itemsNav} ${pathname === '/views/perfil' ? styles.active : ''}`}>
          <Link className={styles.linkNav} href="../views/perfil">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
            </svg>
            <p className={`${styles.itemsNav} ${pathname === '/views/perfil' ? styles.active : ''}`}>Perfil</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navegador;
