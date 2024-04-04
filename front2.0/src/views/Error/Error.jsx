import { useEffect, useState } from 'react';
import styles from './Error.module.css'
import { useNavigate } from 'react-router-dom';

export default function Error(){
    useEffect(()=>{
        document.title = 'Pureza Liquida | Error'
    }, [])

    const navigate = useNavigate()

    const [countDownValue, setCountDownValue] = useState(10);
    
    useEffect(() => {
        if(countDownValue > 0) {
            const timer = setTimeout(() => {
                setCountDownValue(countDownValue - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            navigate('/home');
        }
    }, [countDownValue, navigate]);
    return(
        <div className={styles['body']}>
            <h2>Error <span>404</span></h2>
            <p>Redirigiendo a /home en <span>{countDownValue}</span></p>
        </div>
    )
}