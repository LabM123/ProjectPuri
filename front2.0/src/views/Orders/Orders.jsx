import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from 'axios'
import { setUser } from "../../redux/reducers";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import styles from './Orders.module.css';

export default function Orders(){
    useEffect(()=>{
        document.title = 'Pureza Liquida | Repartos'
    },[])

    const dispatch = useDispatch();
    const userData = useSelector(state => state.data);
    const navigate = useNavigate();

    useEffect(()=>{
        if(!userData.login){
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Debes iniciar sesion para acceder a esta funcion'
            })
            navigate('/login');
        }
        
        if(userData.user?.userType === 'admin'){
            navigate('/admin')
        }
    },[navigate, userData?.login, userData.user?.userType, dispatch])
    
    useEffect(()=>{
        axios.get(`http://localhost:3000/users/${userData.user?._id}`)
            .then(response=>response.data)
            .then(data=>{
                dispatch(setUser(data))
            })
            .catch(error=>console.log(error.message))
    }, [dispatch, userData.user?._id])

    const userOrders = userData.user?.orders;

    const date = new Date()
    const [initialDate, setInitialDate] = useState(`${date.getUTCDate()}-${date.getUTCMonth()+1}-${date.getUTCFullYear()}`);

    const filteredOrders = userOrders?.filter(order => order.date === initialDate)

    const [orders, setOrders] = useState(filteredOrders)

    const dateChangeHandler = (event) => {
        setInitialDate(event.target.value)
        const filteredOrders = userOrders.filter(order => order.date === event.target.value)
        setOrders(filteredOrders)
    }

    const dateOptions = Array.from({length: 7}, (_, index) => {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - index);
        const diff = (new Date() - currentDate) / (1000 * 60 * 60 * 24);
        let text = '';
        if (diff === 0) {
            text = 'Hoy';
        } else if (diff === 1) {
            text = 'Ayer';
        } else {
            text = `Hace ${diff} días`;
        }
        return { date: `${currentDate.getUTCDate()}-${currentDate.getUTCMonth()+1}-${currentDate.getUTCFullYear()}`, text };
    });

    const displayOrders = () => {
        if (!orders || !Array.isArray(orders)) {
            return <div className={styles['orders-order-row']}><b>No tienes ninguna orden</b></div>;
        } else if(orders.length===0){
            return <div className={styles['orders-order-row']}><b>No tienes ninguna orden</b></div>;
        } else {
            return orders.map((order, index)=>{
                return (
                    <div key={index} className={styles['orders-order-row']} id={order._id}>
                        <span>{order.extNum}</span>
                        <span>{order.intNum}</span>
                        <span>{order.section}</span>
                        <span>{order.jugsNum}</span>
                        <span className={styles['order-description']}>{order.description}</span>
                        <span>{order.status}</span>
                        <span><button disabled={order.status !== 'Activo'} onClick={()=>cancelHandler(order._id)}>Cancelar</button></span>
                    </div>
                )
            })
        }
    }

    const cancelHandler = (id) => {
        Swal.fire({
            title: 'Seguro que quieres cancelar tu reparto?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, quiero cancelar",
            cancelButtonText: 'Lo pienso mejor'
        }).then(result => {
            if(result.isConfirmed){
                axios.put(`http://localhost:3000/orders/cancel/${id}`)
                    .then(()=>{
                        axios.get(`http://localhost:3000/users/${userData.user?._id}`)
                        .then(response=>response.data)
                        .then(data=>{
                            dispatch(setUser(data))
                        })
                        .catch(error=>console.log(error.message))
                    })
                    .then(()=>{
                        Swal.fire({
                            title: 'Reparto Cancelado',
                            icon: 'success'
                        })
                        .then(()=>{
                            window.location.reload()
                        })
                    })
                    .catch(error=>{
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: error.response.data.message
                        });
                    })
            }
        })
    }

    const initialState = {
        userId : userData.user?._id,
        extNum : '',
        intNum: '',
        section: '',
        jugsNum: '',
        description: '',
        date: `${date.getUTCDate()}-${date.getUTCMonth()+1}-${date.getUTCFullYear()}`,
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
    }

    const [newOrder, setNewOrder] = useState(initialState)

    const changeHandler = (event) => {
        setNewOrder({
            ...newOrder,
            [event.target.name]: event.target.value,
            time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
        })
    }

    const submitHandler = (event) => {
        event.preventDefault()
        if(errors.extNum||errors.intNum||errors.section||errors.jugsNum){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Debes completar todos los campos requeridos'
            })
        } else {
            axios.post('http://localhost:3000/orders/schedule', newOrder)
                .then(()=>{
                        axios.get(`http://localhost:3000/users/${userData.user?._id}`)
                        .then(response=>response.data)
                        .then(data=>{
                            dispatch(setUser(data))
                        })
                        .catch(error=>console.log(error.message))
                })
                .then(()=>{
                    Swal.fire({
                        icon: 'success',
                        title: 'Reparto programado exitosamente'
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

    //* Errors handling

    const [errors, setErrors] = useState({})

    useEffect(() => {
        setErrors(prevErrors => {
            if (!newOrder.extNum) {
                return { ...prevErrors, extNum: 'Debes poner una Mz / Agrup' };
            } else {
                return { ...prevErrors, extNum: '' };
            }
        });
        setErrors(prevErrors => {
            if (!newOrder.intNum) {
                return { ...prevErrors, intNum: 'Debes poner un Lt / Casa' };
            } else {
                return { ...prevErrors, intNum: '' };
            }
        });
        setErrors(prevErrors => {
            if (!newOrder.section) {
                return { ...prevErrors, section: 'Debes poner una seccion' };
            } else {
                return { ...prevErrors, section: '' };
            }
        });
        setErrors(prevErrors => {
            if (!newOrder.jugsNum) {
                return { ...prevErrors, jugsNum: 'Debes poner el numero de garrafones' };
            } else {
                return { ...prevErrors, jugsNum: '' };
            }
        });

    }, [newOrder]);

    return(
        <>
            <NavBar/>
            <div className={styles['orders-main']}>
                <div className={styles['orders-container']}>
                    <div className={styles['orders-header']}>
                        <h2>Tus Repartos</h2>
                        <select onChange={dateChangeHandler}>
                            {dateOptions.map((dateOption, index) => (
                                <option key={index} value={dateOption.date}>{dateOption.text}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles['orders-main-row']}>
                        <span>Numero Ext. (Mz/Agrup)</span>
                        <span>Numero Int. (Lt/Casa)</span>
                        <span>Seccion</span>
                        <span>No. de Garrafones</span>
                        <span className={styles['order-description']}>Descripcion</span>
                        <span>Estado</span>
                        <span></span>
                    </div>
                    {displayOrders()}
                </div>
                <div className={styles['orders-form']}>
                    <h2>Haz un nuevo pedido</h2>
                    <form onSubmit={submitHandler}>
                        <div className={styles['form-container']}>
                        <div>
                            <label htmlFor="extNum" className={styles['required']}>Numero Ext:</label>
                            <input type="text" name='extNum' id='extNum' placeholder='Mz / Agrup' onChange={changeHandler}/>
                        </div>
                        <div>
                            <label htmlFor="intNum" className={styles['required']}>Numero Int:</label>
                            <input type="text" name='intNum' id='intNum' placeholder='Lt / Casa' onChange={changeHandler}/>
                        </div>
                        <div>
                            <label htmlFor="section" className={styles['required']}>Seccion:</label>
                            <select name="section" id="section" onChange={changeHandler}>
                                <option value="">Seleccione una seccion</option>
                                <option value="2da">2da</option>
                                <option value="3ra">3ra</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="jugsNum" className={styles['required']}>No. de Garrafones:</label>
                            <input type="number" name='jugsNum' id='jugsNum' min='1' max='20' placeholder='min(1) max(20)' onChange={changeHandler}/>
                        </div>
                        <div>
                            <label htmlFor="description">Descripcion:</label>
                            <textarea name='description' id='description' placeholder='Casa blanca, puerta negra...' onChange={changeHandler}/>
                        </div>
                        </div>
                        <ul>
                            {errors.extNum ? <li>{errors.extNum}</li> : null}
                            {errors.intNum ? <li>{errors.intNum}</li> : null}
                            {errors.section ? <li>{errors.section}</li> : null}
                            {errors.jugsNum ? <li>{errors.jugsNum}</li> : null}
                        </ul>
                        <button type='submit'>Enviar</button>
                    </form>
                </div>
            </div>
            <Footer/>
        </>
    )
}