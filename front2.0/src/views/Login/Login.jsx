import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import styles from './Login.module.css'
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import Swal from 'sweetalert2'
import { setGlobalUser } from "../../redux/reducers";
import Footer from "../../components/Footer/Footer";

export default function Login(){
    useEffect(()=>{
        document.title = 'Pureza Liquida | Login';
    }, [])

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialState = {
        email: '',
        password: ''
    }

    const [newLogin, setNewLogin] = useState(initialState);

    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        setNewLogin({
            ...newLogin,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(newLogin.password && newLogin.email){
            axios.post('http://localhost:3000/users/login', newLogin)
                .then((response) => {
                    dispatch(setGlobalUser(response.data))
                    setNewLogin(initialState);
                    navigate('/home')
                })
                .catch((error) => {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: error.response.data.message
                    });
                })
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Debes poner un email y una contraseña",
            });
        }
    }

    useEffect(() => {
        setErrors(prevErrors => {
            if (!newLogin.email) {
                return { ...prevErrors, email: 'Debes poner un email' };
            } else {
                return { ...prevErrors, email: '' };
            }
        });

        setErrors(prevErrors => {
            if (!newLogin.password) {
                return { ...prevErrors, password: 'Debes poner una contraseña' };
            } else {
                return { ...prevErrors, password: '' };
            }
        });
    }, [newLogin]);

    return(
        <>
            <NavBar/>
            <div className={styles['form-container']}>
            <form onSubmit={handleSubmit}>
                <h2>Iniciar Sesion</h2>
                <div>
                    <label htmlFor="email">E-mail: </label>
                    <input type="email" name="email" id="email" onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="password">Contraseña: </label>
                    <input type="password" name="password" id="password" onChange={handleChange}/>
                </div>
                <div>
                    <ul className={styles['errors']}>
                        {errors.email ? <li>{errors.email}</li> : null}
                        {errors.password ? <li>{errors.password}</li> : null}
                    </ul>
                </div>
                <button value='submit'>Enviar</button>
                <p>No tienes una cuenta? <Link to={'/register'}>Registrate</Link></p>
                <p>Debes estar registrado para acceder a algunas caracteristicas del sitio</p>
            </form>
            </div>
            <Footer/>
        </>
    )
}