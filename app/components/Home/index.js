export default function Inicio() {
    return (
        <>
            <form>
                <button> 
                    <img src="/lupa.png" alt="Lupa" />
                </button> 
                <input type="text" />
            </form>

            <div>
                <svg id="filter-icon" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-filter fltro" viewBox="0 0 16 16" aria-label="Filter">
                    <rect width="100%" height="100%" fill="transparent" />
                    <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
                </svg>
            </div>

            <section className="ofertas">
                <div className="container">
                    <h2>Ofertas de hoy</h2>
                    <p>Mira todas las prendas de nuestros locales, ¡no te las pierdas!</p>
                    <button className="btn btn-dark">Ver más</button>
                </div>
            </section>

            <section className="que_estas_buscando">
                <div className="dentro-que-estas-buscando">
                    <h2>¿Qué estás buscando?</h2>
                    <a href="#">Ver todas</a>
                </div>
                <div className="opciones">
                    <div className="opcion">
                        <img src="/Remera-sublimar-hombre--removebg-preview.png" alt="Remera" />
                        <p>Remeras</p>
                    </div>
                </div>
            </section>


            <section class="mas-vendido">
        <div class="container">
            <div class="section-header">
                <h2>Lo más vendido <span>🔥🔥</span></h2>
            </div>
            <div class="cards-container">
                <div class="cards">
                    <div class="col-md-6 card"> 
                        <div class="card">
                            <img src="/local.jpg" class="card-img-top" alt="Portsaid"/>
                            <div class="card-body">
                                <h5 class="card-title">Portsaid</h5>
                                <p class="card-text">Villa del parque - Campana 2375</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 card"> 
                            <img src="/local.jpg" class="card-img-top" alt="Portsaid"/>
                            <div class="card-body">
                                <h5 class="card-title">Portsaid</h5>
                                <p class="card-text">Villa del parque - Campana 2375</p>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
    </section>

    <div class="navegador">
        <div class="primeros2">
            <div class="items-nav">
                <a href="./index.html">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16" aria-label="Home"><path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/></svg>
                    <p>Home</p>
                </a>
            </div>
            <div class="items-nav">
                <a href="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16" aria-label="Cart"><path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/></svg>
                    <p>Carrito</p>
                </a>
            </div>
        </div>

        <div class="items-nav favoritos">
            <a href="">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-bookmark" viewBox="0 0 16 16" aria-label="Favorites"><path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87a.5.5 0 0 0 .74-.439V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2M8 12.067L3 14.568V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v12.568l-5-2.501z"/></svg>
                
            </a>
        </div>

        <div class="ultimos2">
            <div class="items-nav">
                <a href="./index.html">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16" aria-label="Home"><path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/></svg>
                    <p>Locales</p>
                </a>
            </div>
            <div class="items-nav">
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
