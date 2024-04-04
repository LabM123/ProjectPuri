import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";
import styles from './Contact.module.css'
import facebookIcon from '../../assets/facebook-icon.svg'
import whatsappIcon from '../../assets/whatsapp-icon.svg'
import mailIcon from '../../assets/mail-icon.svg'
import phonIcon from '../../assets/phone-icon.svg'
import githubIcon from '../../assets/github-icon.svg'
import linkedinIcon from '../../assets/linkedin-icon.svg'

export default function Contact(){
    return(
        <>
        <NavBar/>
        <div className={styles['contact-main']}>
            <h2>Contacto</h2>
            <p>Para dar seguimiento a alguna consulta, queja o sugerencia respecto al servicio, ajuntamos los siguientes links e informacion:</p>
            <div className={styles['cards-container']}>
                <a href="">
                    <caption>
                        <img src={facebookIcon} alt="" />
                        <figcaption><u>Facebook Oficial</u></figcaption>
                    </caption>
                </a>
                <a href="">
                    <caption>
                        <img src={whatsappIcon} alt="" />
                        <figcaption><u>Chat WhatsApp</u></figcaption>
                    </caption>
                </a>
                <a href="">
                    <caption>
                        <img src={mailIcon} alt="" />
                        <figcaption><u>purezaliquida@gmail.com</u></figcaption>
                    </caption>
                </a>
                <a href="">
                    <caption>
                        <img src={phonIcon} alt="" />
                        <figcaption><u>56 1709 5015</u></figcaption>
                    </caption>
                </a>
            </div>
            <p>Para cualquier consulta, queja o sugerencia respecto al funcionamiento de la pagina, adjuntamos la siguiente informacion de contacto:</p>
            <div className={styles['cards-container']}>
                <a href="">
                    <caption>
                        <img src={githubIcon} alt="" />
                        <figcaption><u>GitHub</u></figcaption>
                    </caption>
                </a>
                <a href="">
                    <caption>
                        <img src={linkedinIcon} alt="" />
                        <figcaption><u>LinkedIn</u></figcaption>
                    </caption>
                </a>
                <a href="">
                    <caption>
                        <img src={mailIcon} alt="" />
                        <figcaption><u>bcdld@hotmail.com</u></figcaption>
                    </caption>
                </a>
                <a href="">
                    <caption>
                        <img src={phonIcon} alt="" />
                        <figcaption><u>56 1709 5015</u></figcaption>
                    </caption>
                </a>
            </div>
        </div>
        <Footer/>
        </>
    )
}