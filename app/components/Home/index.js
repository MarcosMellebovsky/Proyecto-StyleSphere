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
                    <a href="../productos/index.js">Ver todas</a>
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

    <div className={styles.navegador}>

        <div className={styles.primeros2}>

            <div className={styles.itemsNav}>
                <a href="./index.html">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16" aria-label="Home"><path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/></svg>
                    <p>Home</p>
                </a>
            </div>

            <div className={styles.itemsNav}>
                <a href="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16" aria-label="Cart"><path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/></svg>
                    <p>Carrito</p>
                </a>
            </div>
            
        </div>

        <div className={styles.favoritos}>
            <a href="">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-bookmark" viewBox="0 0 16 16" aria-label="Favorites"><path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87a.5.5 0 0 0 .74-.439V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2M8 12.067L3 14.568V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v12.568l-5-2.501z"/></svg>
                
            </a>
        </div>

        <div className={styles.ultimos2}>
            <div className={styles.itemsNav}>
                <a href="./index.html">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16" aria-label="Home"><path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/></svg>
                    <p>Locales</p>
                </a>
            </div>
            <div className={styles.itemsNav}>
                <a href="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16" aria-label="Cart"><path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/></svg>
                    <p>Perfil</p>
                </a>
            </div>
        </div>
    </div>

        </>
    );
}
