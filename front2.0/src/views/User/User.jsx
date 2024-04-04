import { useEffect, useState } from 'react';
import styles from './User.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import axios from 'axios';
import { setUser } from '../../redux/reducers';
import Swal from 'sweetalert2';

export default function User(){
    useEffect(()=>{
        document.title = 'Pureza Liquida | Configuracion'
    }, [])
    
    const userData = useSelector(state => state.data);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // useEffect(()=>{
    //     if(!userData.login || userData.user?.userType === 'admin'){
    //         navigate('/error')
    //     }
    // }, [navigate, userData?.login, userData.user?.userType])

    useEffect(()=>{
        if(!userData.login){
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Debes iniciar sesion para acceder a esta seccion'
            })
            navigate('/login');
        }
        
        if(userData.user?.userType === 'admin'){
            navigate('/error')
        }
    },[navigate, userData?.login, userData.user?.userType, dispatch])

    const initialEmail = {
        email: '',
        prevEmail: '',
        userId: userData.user?._id
    }
    
    const initialPhoneNum = {
        phoneNum: '',
        prevPhoneNum: '',
        userId: userData.user?._id
    }
    
    const initialPassword = {
        password: '',
        prevPassword: '',
        userId: userData.user?._id
    }

    const [newEmail, setNewEmail] = useState(initialEmail);

    const [newPhoneNum, setNewPhoneNum] = useState(initialPhoneNum);

    const [newPassword, setNewPassword] = useState(initialPassword);

    const emailChangeHandler = (event) => {
        setNewEmail({
            ...newEmail,
            [event.target.name]: event.target.value
        })
    }

    const phoneNumChangeHandler = (event) => {
        setNewPhoneNum({
            ...newPhoneNum,
            [event.target.name]: event.target.value
        })
    }

    const passwordChangeHandler = (event) => {
        setNewPassword({
            ...newPassword,
            [event.target.name]: event.target.value
        })
    }

    const emailSumbitHandler = (event) => {
        event.preventDefault()
        if(!newEmail.email||!newEmail.prevEmail){
            Swal.fire({
                icon: 'error',
                title: 'Debes completar ambos campos.'
            })
        } else {
            axios.put('https://projectpuri.onrender.com/users/email', newEmail)
            .then(()=>{
                axios.get(`https://projectpuri.onrender.com/users/${userData.user?._id}`)
                .then(response=>response.data)
                .then(data=>{
                    dispatch(setUser(data))
                })
                .catch(error=>console.log(error.message))
            })
            .then(()=>{
                Swal.fire({
                    icon: 'success',
                    title: 'Email actualizado con exito'
                })
                .then(()=> window.location.reload())
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
    
    const phoneNumSumbitHandler = (event) => {
        event.preventDefault()
        if(!newPhoneNum.phoneNum||!newPhoneNum.prevPhoneNum){
            Swal.fire({
                icon: 'error',
                title: 'Debes completar ambos campos.'
            })
        } else {
            axios.put('https://projectpuri.onrender.com/users/phoneNum', newPhoneNum)
            .then(()=>{
                axios.get(`https://projectpuri.onrender.com/users/${userData.user?._id}`)
                .then(response=>response.data)
                .then(data=>{
                    dispatch(setUser(data))
                })
                .catch(error=>console.log(error.message))
            })
            .then(()=>{
                Swal.fire({
                    icon: 'success',
                    title: 'No. de Celular actualizado exitosamente'
                })
                .then(()=> window.location.reload())
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
    
    const passwordSumbitHandler = (event) => {
        event.preventDefault()
        if(!newPassword.password||!newPassword.prevPassword){
            Swal.fire({
                icon: 'error',
                title: 'Debes completar ambos campos.'
            })
        } else {
            axios.put('https://projectpuri.onrender.com/users/password', newPassword)
            .then(()=>{
                axios.get(`https://projectpuri.onrender.com/users/${userData.user?._id}`)
                .then(response=>response.data)
                .then(data=>{
                    dispatch(setUser(data))
                })
                .catch(error=>console.log(error.message))
            })
            .then(()=>{
                Swal.fire({
                    icon: 'success',
                    title: 'Contraseña actualizada exitosamente'
                })
                .then(()=> window.location.reload())
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

    return(
        <>
        <NavBar/>
        <div className={styles['user-main']}>
            <h2>Configuracion de cuenta</h2>
            <div className={styles['forms']}>
                <h4>Cambiar E-mail</h4>
                <form onSubmit={emailSumbitHandler}>
                    <div className={styles['inner-form']}>
                        <div>
                            <label htmlFor="prevEmail">E-mail Anterior: </label>
                            <input type="email" id='prevEmail' name='prevEmail' onChange={emailChangeHandler}/>
                        </div>
                        <div>
                            <label htmlFor="email">E-mail Nuevo: </label>
                            <input type="email" id='email' name='email' onChange={emailChangeHandler}/>
                        </div>
                    </div>
                    <button type='submit'>Enviar</button>
                </form>
                <h4>Cambiar Numero de Celular</h4>
                <form onSubmit={phoneNumSumbitHandler}>
                    <div className={styles['inner-form']}>
                        <div>
                            <label htmlFor="prevPhoneNum">No. de Celular Anterior: </label>
                            <input type="number" id='prevPhoneNum' name='prevPhoneNum' onChange={phoneNumChangeHandler}/>
                        </div>
                        <div>
                            <label htmlFor="phoneNum">No. de Celular Nuevo: </label>
                            <input type="number" id='phoneNum' name='phoneNum' onChange={phoneNumChangeHandler}/>
                        </div>
                    </div>
                    <button type='submit'>Enviar</button>
                </form>
                <h4>Cambiar Contraseña</h4>
                <form onSubmit={passwordSumbitHandler}>
                    <div className={styles['inner-form']}>
                        <div>
                            <label htmlFor="prevPassword">Contraseña Anterior: </label>
                            <input type="password" id='prevPassword' name='prevPassword' onChange={passwordChangeHandler}/>
                        </div>
                        <div>
                            <label htmlFor="password">Contraseña Nueva: </label>
                            <input type="password" id='password' name='password' onChange={passwordChangeHandler}/>
                        </div>
                    </div>
                    <button type='submit'>Enviar</button>
                </form>
            </div>
            <p>Cambios como el numero de celular o e-mail solo se veran reflejadas en futuros repartos, no en repartos ya existentes</p>
        </div>
        <Footer/>
        </>
    )
}