import Link from 'next/link';
import styles from './home.module.css';

export default function Inicio() {
    const Productos = [
        {
            nombre:"Remera",
            imagen:"/Remera-sublimar-hombre--removebg-preview.png"   
    
        },
        {
            nombre:"Short",
            imagen:"/Remera-sublimar-hombre--removebg-preview.png"  
        },
        {
            nombre:"Campera",
            imagen:"/Remera-sublimar-hombre--removebg-preview.png"  
        },
        {
            nombre:"Buzo",
            imagen:"/Remera-sublimar-hombre--removebg-preview.png"  
        },
        {nombre:"Pantalon",
        imagen:"/Remera-sublimar-hombre--removebg-preview.png"  },
    ]

    const locales = [
        {
            imagenLocal: "/local.jpg",
            nombreLocal : "Portsaid",
            direccion:" Villa del parque - campana 2321"
        },
        {
            imagenLocal: "/local.jpg",
            nombreLocal : "Portsaid",
            direccion:" Villa del parque - campana 2321"
        }
        ,
        {
            imagenLocal: "/local.jpg",
            nombreLocal : "Portsaid",
            direccion:" Villa del parque - campana 2321"
        }
    ]

  

    return (
        <>
       <div className={styles.headerPadre}>
        <header className={styles.cabeza}>
            <div className={styles.divCabeza}>
                <form action="" className={styles.divForm} method="GET"> 
                    <button type="submit" className= {styles.lupaBtn}> 
                        <img className={styles.lupaImg} src="/lupa.png" alt=""/>
                    </button> 
                    <input type="text" class="form-control"/>
                </form>
                <svg  id="filter-icon" href="#" role="button"  aria-expanded="false" xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-filter fltro" viewBox="0 0 16 16" aria-label="Filter"><rect width="100%" height="100%" fill="transparent"></rect><path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"/></svg>

            </div>  
               
        </header>
    </div>
            

            

            <section className={styles.ofertas}>
                <div className={styles.container}>
                    <h2>Ofertas de hoy</h2>
                    <p>Mira todas las prendas de nuestros locales, ¡no te las pierdas!</p>
                    <button className={styles.btn}>Ver más</button>
                </div>
            </section>

            <section className={styles.queEstasBuscando}>
                <div className={styles.dentroQueEstasBuscando}>
                    <h2>¿Qué estás buscando?</h2>
                    <Link href="/productos" >Ver todas</Link>
                </div>
                <div className={styles.opciones}>
                {Productos.map((producto, index) => (
                        <div key={index} className={styles.opcion}>
                            <img src={producto.imagen}  />
                            <p>{producto.nombre}</p>
                        </div>
                    ))}
                </div>

                <div className={styles.opciones}>
                {Productos.map((producto, index) => (
                        <div key={index} className={styles.opcion}>
                            <img src={producto.imagen}  />
                            <p>{producto.nombre}</p>
                        </div>
                    ))}
                </div>
            </section>


            <section className={styles.masVendido}>

                <div className={styles.container}>

                    <div className={styles.sectionHeader}>
                        <h2>Lo más vendido <span>🔥🔥</span></h2>
                    </div>

                    <div className={styles.cardsContainer}>

                        <div className={styles.cards}>
                            {locales.map((local, index) => (
                                <div key={index} className={styles.card}> 
                                    <div className="card">
                                        <img src={local.imagenLocal} className={styles.cardImgTop} alt={local.nombreLocal}/>
                                        <div className="card-body">
                                            <h5 className="card-title">{local.nombreLocal}</h5>
                                            <p className="card-text">{local.direccion}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>

                </div>

            </section>

   

        </>
    );
}
