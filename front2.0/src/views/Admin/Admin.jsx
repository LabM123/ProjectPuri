import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import styles from './Admin.module.css'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function Admin(){
    useEffect(()=>{
        document.title = 'Pureza Liquida | Admin'
    }, [])

    const userData = useSelector(state => state.data);
    const navigate = useNavigate();

    useEffect(()=>{
        if(!userData.login || userData.user?.userType !== 'admin'){
            navigate('/error')
        }
    }, [navigate, userData?.login, userData.user?.userType])

    const [allOrders, setAllOrders] = useState([])

    const date = new Date()
    const [initialDate, setInitialDate] = useState(`${date.getUTCDate()}-${date.getUTCMonth()+1}-${date.getUTCFullYear()}`);

    useEffect(()=>{
        axios.get('http://localhost:3000/orders')
            .then(response => response.data)
            .then(data => {
                setAllOrders(data);
                const filteredOrders = data.filter(order => order.date === initialDate);
                setOrders(filteredOrders);
            })
            .catch(error => console.log(error))
    }, [initialDate])

    const filteredOrders = allOrders.filter(order => order.date === initialDate)

    const [orders, setOrders] = useState(filteredOrders);

    console.log(orders);
    console.log(filteredOrders);

    const dateChangeHandler = (event) => {
        setInitialDate(event.target.value)
        const filteredOrders = allOrders.filter(order => order.date === event.target.value)
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
        // if (!orders || !Array.isArray(orders)) {
        //     return <div className={styles['orders-order-row']}><b>No hay ninguna orden</b></div>;
        // } else if(orders.length===0){
        if(orders.length===0){
            return <div className={styles['orders-order-row']}><b>No hay ninguna orden</b></div>;
        } else {
            return orders.map((order, index)=>{
                return (
                    <div key={index} className={styles['orders-order-row']} id={order._id}>
                        <span>{order.extNum}</span>
                        <span>{order.intNum}</span>
                        <span>{order.section}</span>
                        <span>{order.jugsNum}</span>
                        <span className={styles['order-description']}>{order.description}</span>
                        <span>{order.user?.firstName}</span>
                        <span>{order.user?.phoneNum}</span>
                        <span>{order.time}</span>
                        <span>{order.status}</span>
                        <span><button disabled={order.status !== 'Activo'} onClick={()=>cancelHandler(order._id)} className={styles['cancelButton']}>Cancelar</button><button disabled={order.status !== 'Activo'} onClick={()=>finishHandler(order._id)} className={styles['finishButton']}>Terminar</button><button disabled={order.status === 'Activo'} onClick={()=>activateHandler(order._id)} className={styles['activateButton']}>Reactivar</button></span>
                    </div>
                )
            })
        }
    }

    const cancelHandler = (id) => {
        Swal.fire({
            title: 'Seguro que quieres cancelar el reparto?',
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

    const finishHandler = (id) => {
        Swal.fire({
            title: 'Seguro que quieres terminar el reparto?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, quiero terminarlo",
            cancelButtonText: 'Lo pienso mejor'
        }).then(result => {
            if(result.isConfirmed){
                axios.put(`http://localhost:3000/orders/finish/${id}`)
                    .then(()=>{
                        Swal.fire({
                            title: 'Reparto Terminado',
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

    const activateHandler = (id) => {
        Swal.fire({
            title: 'Seguro que quieres reactivar el reparto?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, quiero reactivarlo",
            cancelButtonText: 'Lo pienso mejor'
        }).then(result => {
            if(result.isConfirmed){
                axios.put(`http://localhost:3000/orders/activate/${id}`)
                    .then(()=>{
                        Swal.fire({
                            title: 'Reparto Reactivado',
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

    return(
        <>
            <NavBar/>
            <div className={styles['admin-main']}>
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
                        <span>Nombre del Usuario</span>
                        <span>Telefono</span>
                        <span>Hora</span>
                        <span>Estado</span>
                        <span></span>
                    </div>
                    {displayOrders()}
                </div>
            </div>
        </>
    )
}