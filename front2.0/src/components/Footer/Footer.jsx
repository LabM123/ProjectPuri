import styles from './Footer.module.css'
import facebookIcon from '../../assets/facebook-icon.svg'
import gMapsIcon from '../../assets/google-maps-icon.svg'
import whatsappIcon from '../../assets/whatsapp-icon.svg'

export default function Footer(){
    return(
        <footer>
        <div>
            <h6>Direccion:</h6>
            <p>Av. Siervo de la Nacion, Agrupamiento B6, Casa 4, 2da Seccion, Unidad Ermita Zaragoza, Iztapalapa, CDMX, 09180</p>
        </div>
        <hr />
        <div className={styles['icons']}>
            <a href="">
                <img src={whatsappIcon} alt="" />
            </a>
            <a href="">
                <img src={facebookIcon} alt="" />
            </a>
            <a href="https://www.google.com/maps/place/Purificadora+Pureza+liquida/@19.3626615,-98.9939589,18.5z/data=!4m6!3m5!1s0x85d1e3197bbae94b:0x45a59935c54a746e!8m2!3d19.3623442!4d-98.9930967!16s%2Fg%2F11f7bdj1vf?entry=ttu" target="_blank">
                <img src={gMapsIcon} alt="" />
            </a>
        </div>
        <hr />
        <div>
            <h6>Contacto:</h6>
            <ul>
                <li>
                    <u>purezaliquida@gmail.com</u>
                </li>
                <li>
                    <u>+52 56 1709 5015</u>
                </li>
            </ul>
        </div>
    </footer>
    )
}