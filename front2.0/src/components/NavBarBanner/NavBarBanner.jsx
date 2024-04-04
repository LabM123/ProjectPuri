import { Link } from 'react-router-dom'
import styles from './NavBarBanner.module.css'

export default function NavBarBanner(){
    return(
        <div className={`${styles['div']}`}>
            Registrate y haz tus pedidos <Link to={'/orders'}>aqui</Link>!
        </div>
    )
}