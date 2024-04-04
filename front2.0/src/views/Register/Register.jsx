import { useEffect, useState } from "react";
import styles from './Register.module.css'
import NavBar from "../../components/NavBar/NavBar";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import axios from "axios";
import Footer from "../../components/Footer/Footer";

export default function Register(){
    useEffect(()=>{
        document.title = 'Pureza Liquida | Register'
    },[])

    const navigate = useNavigate();

    const [errors, setErrors] = useState({})

    const initialState = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNum: '',
        password: '',
        confirmPassword: '',
        userType: 'customer'
    }

    const [newUser, setNewUser] = useState(initialState);

    const handleChange = (event) => {
        setNewUser({
            ...newUser,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(!newUser.firstName||!newUser.lastName||!newUser.email||!newUser.password||!newUser.confirmPassword){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Debes completar todos los campos obligatorios'
            })
        } else if(newUser.password!==newUser.confirmPassword){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ambas contraseñas deben ser iguales'
            })
        } else {
            axios.post('https://projectpuri.onrender.com/users/register', newUser)
                .then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Genial!',
                        text: 'Registro exitoso, ahora inicie sesion'
                    })
                    setNewUser(initialState);
                    navigate('/login')
                })
                .catch(error=>{
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error.response.data.message
                    })
                })
        }
    }

    useEffect(() => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        setErrors(prevErrors => {
            if (!newUser.confirmPassword || !newUser.password) {
                return { ...prevErrors, password: 'Debes poner una contraseña y su confirmacion' };
            } else {
                return { ...prevErrors, password: '' };
            }
        });
        
        setErrors(prevErrors => {
            if (newUser.password !== newUser.confirmPassword) {
                return { ...prevErrors, confirmPassword: 'Ambas contraseñas deben ser iguales' };
            } else {
                return { ...prevErrors, confirmPassword: '' };
            }
        });
        
        setErrors(prevErrors => {
            if (!newUser.email || !emailRegex.test(newUser.email)) {
                return { ...prevErrors, email: 'Debes poner un email valido' };
            } else {
                return { ...prevErrors, email: '' };
            }
        });

        setErrors(prevErrors => {
            if (!newUser.firstName) {
                return { ...prevErrors, firstName: 'Debes poner al menos un nombre' };
            } else {
                return { ...prevErrors, firstName: '' };
            }
        });
        
        setErrors(prevErrors => {
            if (!newUser.lastName) {
                return { ...prevErrors, lastName: 'Debes poner al menos un apellido' };
            } else {
                return { ...prevErrors, lastName: '' };
            }
        });
    }, [newUser]);

    return(
        <>
            <NavBar/>
            <div className={styles['form-container']}>
                <form onSubmit={handleSubmit}>
                    <h2>Registro</h2>
                    <div>
                        <label htmlFor="firstName">Nombre(s): </label>
                        <input type="text" name="firstName" id="firstName" onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="lastName">Apellido(s): </label>
                        <input type="text" name="lastName" id="lastName" onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="phoneNum" className={styles['not-required']}>Telefono: </label>
                        <input type="number" name="phoneNum" id="phoneNum" onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="email">E-mail: </label>
                        <input type="email" name="email" id="email" onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="password">Contraseña: </label>
                        <input type="password" name="password" id="password" onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                        <input type="password" name="confirmPassword" id="confirmPassword" onChange={handleChange}/>
                    </div>
                    <div>
                        <ul className={styles['errors']}>
                            {errors.firstName ? <li>{errors.firstName}</li> : null}
                            {errors.lastName ? <li>{errors.lastName}</li> : null}
                            {errors.email ? <li>{errors.email}</li> : null}
                            {errors.password ? <li>{errors.password}</li> : null}
                            {errors.confirmPassword ? <li>{errors.confirmPassword}</li> : null}
                        </ul>
                    </div>
                    <button className="btn btn-primary">Enviar</button>
                    <p>Ya tienes una cuenta? <Link to={'/login'}>Inicia sesion</Link></p>
                    <p></p>
                </form>
            </div>
            <Footer/>
        </>
    )
}