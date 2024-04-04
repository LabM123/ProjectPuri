import { useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";
import NavBarBanner from "../../components/NavBarBanner/NavBarBanner";
import styles from './Home.module.css'

export default function Home(){
    useEffect(()=>{
        document.title = 'Pureza Liquida | Inicio'
    }, [])
    return(
        <>
            <NavBar/>
            <NavBarBanner/>
            <div className={styles['home-main']}>
                <section>
                    <div className={styles['slide-container']}>
                        <div className={styles['slide1']}></div>
                    </div>
                    <p> Estamos ubicados a solo 5 min de la estacion Santa Martha de la linea A del metro, especificamente sobre Av. Siervo de la Nacion, Agrupamiento B6, Casa 4, 2da Seccion, C.P. 09180. </p>
                </section>
                <section>
                    <p> Contamos con los filtros de mas alta calidad con carbon activado para garantizar la pureza y calidad de nuestros productos y completa sanidad de nuestras instalaciones. </p>
                    <div className={styles['slide-container']}>
                        <div className={styles['slide2']}></div>
                    </div>
                </section>
                <section>
                    <div className={styles['slide-container']}>
                        <div className={styles['slide3']}></div>
                    </div>
                    <p> Contamos con personal capacitado para el debido trato y atencion de sus garrafones o cualquier problematica que presenten sus garrafones. </p>
                </section>
                <section>
                    <p>Tambien contamos con servicio a domicilio de 10am a 5pm los 365 dias del año (aplican restricciones) limitado de momento a la 2da y 3ra seccion de la Unidad Habitacional Ermita Zaragoza. </p>
                    <div className={styles['slide-container']}>
                        <div className={styles['slide4']}></div>
                    </div>
                </section>
            </div>
            <Footer/>
        </>
    )
}