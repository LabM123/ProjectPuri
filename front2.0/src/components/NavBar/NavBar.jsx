import styles from './NavBar.module.css'
import waterdrop from '../../assets/water-fee.svg'
import userIcon from '../../assets/user-icon.svg'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux'
import { resetGlobalUser } from '../../redux/reducers'

export default function NavBar(){
    const dispatch = useDispatch();
    const userData = useSelector(state => state.data);

    const logoutHandler = () => {
        Swal.fire({
            title: "Seguro que quieres cerrar sesion?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, quiero cerrar",
            cancelButtonText: 'Cancelar'
        }).then(result=>{
            if(result.isConfirmed){
                dispatch(resetGlobalUser())
                Swal.fire({
                    title: 'Sesion cerrada',
                    icon: 'success'
                })
            }
        })
    }
    return(
        <>
        <div className={`${styles['navbar-main']}`}>
            <div className={styles['navbar-mobile-menu']}>
                <div className={styles['navbar-mobile-menu-button']}></div>
                <input type="checkbox" className={styles['navbar-mobile-menu-activator']}/>
                <div className={styles['navbar-mobile-links']}>
                    <Link to={'/home'}>Inicio</Link>
                    <Link to={'/orders'}>Repartos</Link>
                    <Link to={'/contact'}>Contacto</Link>
                </div>
            </div>
            <div className={styles['navbar-logo']}>
                <img src={waterdrop} alt="" className={styles['logo-img']}/>
                <div className={styles['logo-letters']}>
                    <p className={styles['pureza']}>Pureza</p>
                    <p className={styles['liquida']}>Liquida</p>
                </div>
            </div>
            <div className={styles['navbar-links']}>
                <Link to={'/home'}>Inicio</Link>
                <Link to={'/orders'}>Repartos</Link>
                <Link to={'/contact'}>Contacto</Link>
            </div>
            <div className={styles["navbar-profile"]}>
                {/* {userData?.login ? 
                <>
                <img src={userIcon} alt="" />
                <input type="checkbox" name="" id="" className={styles['profile-menu-activator']}/>
                <div className={styles['profile-menu']}>
                    <Link to={'/user'}>Configuracion</Link>
                    <Link onClick={logoutHandler}>Cerrar Sesion</Link>
                    <div className={styles['user-welcome']}>Hola, {userData.user.firstName}</div>
                </div> 
                </> 
                : <Link to={'/login'}><span>Inicia Sesion / Registrate</span></Link>} */}
                <img src={userIcon} alt="" />
                <input type="checkbox" name="" id="" className={styles['profile-menu-activator']}/>
                <div className={styles['profile-menu']}>
                    {userData.login?
                    <>
                    <Link to={'/user'}>Configuracion</Link>
                    <Link onClick={logoutHandler}>Cerrar Sesion</Link>
                    <div className={styles['user-welcome']}>Hola, {userData.user.firstName}</div>
                    </>
                    :
                    <>
                    <Link to={'/login'}>Inicia Sesion</Link>
                    <Link to={'/register'}>Registrate</Link>
                    </>
                    }
                </div> 
            </div>
        </div>
        </>
    )
}