import React, { useState } from 'react'
import './join.css'
import logo from '../../images/logo.png'
import { Link } from 'react-router-dom'

let user;
const Join = () => {

    const sendUser = ()=>{
        user = document.getElementById('joinInput').value;
        localStorage.setItem('user',user);
        document.getElementById('joinInput').value ='';
    }

    const [name, setName] = useState('');

  return (
    <div className='joinWrapper'>
        <div className='container'>
            <img width={100} src={logo} alt='logo' />
            <h4>wassapp</h4>

            <input onChange={(e) => setName(e.target.value)} placeholder='Enter Your Name' type='text' id="joinInput" />
           <Link onClick={(e) => !name?e.preventDefault(): null} to='chat'> <button onClick={sendUser} id='joinBtn'>Join</button></Link>
        </div>
    </div>
  )
}

export default Join;
