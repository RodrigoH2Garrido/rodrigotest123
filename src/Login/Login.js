import React from 'react'
import './login.css'
import fondo from'./assets/login-background.svg'
import FormLogin from './FormLogin/FormLogin'


export default function Login() {
  return (
    <div className='login-container'>
        <div className='logo-container'>
          <img src={fondo} alt="" style={{height:'100%'}}/>
        </div>
        <div className='input-container'>
          <FormLogin/>
        </div>
    </div>
  )
}