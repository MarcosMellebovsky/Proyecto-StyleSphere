import Link from 'next/link'
import styles from './productos.module.css'

export default function Productos(){

    const seccionProductos = [
        { img:"/Remera-sublimar-hombre--removebg-preview.png", text: "Buzos"},
        { img:"/Remera-sublimar-hombre--removebg-preview.png", text: "Buzos"},
        { img:"/Remera-sublimar-hombre--removebg-preview.png", text: "Buzos"},
        { img:"/Remera-sublimar-hombre--removebg-preview.png", text: "Buzos"},
        { img:"/Remera-sublimar-hombre--removebg-preview.png", text: "Buzos"},
        { img:"/Remera-sublimar-hombre--removebg-preview.png", text: "Buzos"},
        { img:"/Remera-sublimar-hombre--removebg-preview.png", text: "Buzos"},
        { img:"/Remera-sublimar-hombre--removebg-preview.png", text: "Buzos"},
        { img:"/Remera-sublimar-hombre--removebg-preview.png", text: "Buzos"},
        { img:"/Remera-sublimar-hombre--removebg-preview.png", text: "Buzos"},
        { img:"/Remera-sublimar-hombre--removebg-preview.png", text: "Buzos"},
    ];

    return (
        <>

            <div className={styles.HeaderPadre}>
                <header className={styles.Cabeza}>
                    <div className={styles.DivCabeza}>
                        <form action="url_a_la_que_enviar.php" className={styles.DivForm} method="GET"> 
                            <button type="submit" className={styles.LupaBtn}> 
                                <img className={styles.LupaImg} src="../img/lupa.png" alt=""/>
                            </button> 
                            <input type="text" className={styles.FormControl}/>
                        </form>
                        <svg  id="filter-icon" xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-filter fltro" viewBox="0 0 16 16" aria-label="Filter"><rect width="100%" height="100%" fill="transparent"></rect><path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"/></svg>
                    </div>
                </header>
            </div>

            <div className={styles.VolverHeader}>
                <Link className={styles.AHeader} href="/"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-chevron-left back-button" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/></svg></Link>
            </div>

            <div className={styles.HeaderTitle}>
                <h1 className={styles.TituloCategorias}>Categorías</h1>
            </div>
        
            <section className={styles.Container}>
                <div className={styles.Categories}>
                    {seccionProductos.map((seccion, index) => (
                        <div key={index} className={styles.CategoriesDentro}>
                            <Link href="/" className={styles.Category}>
                                <img src={seccion.img} alt="buzos"/>
                            </Link>
                            <p>{seccion.text}</p>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}
