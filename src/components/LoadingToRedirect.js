import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom';

const LoadingToRedirect = () => {
    const [count,setCount] = useState(3);
    const navigate = useNavigate();
    useEffect(()=>{
        const interval = setInterval(()=>{
            setCount((currentCount)=> --currentCount)
        },1000)
        count ===0 && navigate("/login");
        return()=>clearInterval(interval);
    },[count,navigate])
  return (
    <div style={{marginTop:'100px'}} className='center'>
        <h5>Redirecting you in {count} seconds.</h5>
    </div>
  );
};

export default LoadingToRedirect;