import React,{useState,useEffect} from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import firebase from '../services/firebase'
import {login} from '../actions/auth'


import Login from '../Login/Login'
import Home from '../Components/Home/Home'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

export default function Router2() {
    const dispatch = useDispatch()
    const selector = useSelector(selector => selector.auth.conectado)
    const [checking, setChecking] = useState(true)
    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if (user?.uid && (user.email.includes('@spread.cl') || user.email.includes('angie.martinez@sendcargo.cl')|| user.email.includes('rodrigotestcorreo123@gmail.com') || user.email.includes('servicioatencioncliente20@gmail.com') || user.email.includes('@ripley.com') || user.email.includes('@falabella.cl') || user.email.includes('@shipit.cl') || user.email.includes('@paris.cl') ||  user.email.includes('imrodrigo')) ){
                dispatch(login())
            }
            else{
                console.log('Debe ingresar con cuenta spread')
            }
            setChecking(false)
        })
    }, [dispatch,setChecking])
    if (checking){
        return <h1 style={{fontFamily:'Nunito'}}>...Cargando</h1>
    }
    return (
        <Router>
            <Routes>
            
                <Route exact path="/" element={<PublicRoute isAuthenticated={selector} component={<Login/>}/>}/>
            
                <Route
                    path="/home"
                    element={<PrivateRoute isAuthenticated={selector} component={<Home/>}/>}
                />
                
            </Routes>
        </Router>
    )
}
