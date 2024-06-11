import styles from './productos.module.css'
<>

<div className={styles.HeaderPadre}>
        <header className={styles.Cabeza}>
            <div class={styles.DivCabeza}>
                <form action="url_a_la_que_enviar.php" className={styles.DivForm} method="GET"> 
                    <button type="submit" className={styles.LupaBtn}> 
                        <img className={styles.LupaImg} src="../img/lupa.png" alt=""/>
                    </button> 
                    <input type="text" className={styles.FormControl}/>
                </form>
                <svg  id="filter-icon" xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-filter fltro" viewBox="0 0 16 16" aria-label="Filter"><rect width="100%" height="100%" fill="transparent"></rect><path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"/></svg>
            </div>
        </header>
    </div>
    <div className={styles.VolverHeader}>
        <a className={styles.AHeader} href="./home.html"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-chevron-left back-button" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/></svg></a>
    </div>

    <div className={styles.HeaderTitle}>
        
        <h1 className={styles.TituloCategorias}>Categorías</h1>
    </div>
    
    
    <section class="container">
        

        <div class={styles.Categories}>
            <div className={styles.CategoriesDentro}>
                <a href="../index.html" className={styles.Category}>
                <img src="../img/buzo-canguro-rustico-beige1-20507034b4a83904cd16880467893341-640-0-removebg-preview (1).png" alt="buzos"/>
                </a>
                <p>Buzos</p>
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