import React from 'react'
// import FormControl from '@mui/material/FormControl';
// import Input from '@mui/material/Input';
// import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
// import ArrowIcon from './arrow.svg'
import GoogleIcon from './google.svg'
 

import { signInWWithGoogle } from '../../services/firebase';

export default function FormLogin() {
    // const [userEmail, setUserEmail] = useState('');
    // const [userPwd,setUserPwd] = useState('')
    // const handleUserEmailChange = (event) => {
    //     setUserEmail(event.target.value);
    // };
    // const handleUserPwdChange = (event) => {
    //     setUserPwd(event.target.value);
    // }
    //no se para que esta esto de abajo 
    // const [user,setUser] = useState(null)
    // useEffect(()=>{
    //   firebase.auth().onAuthStateChanged(user => {
    //     setUser(user)
    //   })
  
    // },[])
    // console.log(user)
    return (
        <div style= {{display: 'flex',flexDirection:'column',height:'100%'}}>
            
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',marginTop:'15%'}}>
                <h1 style={{color:'#009B78',fontFamily:'Nunito'}}>Iniciar sesión en Spread</h1>   
                <h5 style={{marginTop:'2.5%',color:'#009B78',fontFamily:'Nunito'}}>Inicie sesión con su cuenta para continuar</h5>
            </div>

            <div style={{marginTop:'7.5%',display:'flex',flexDirection:'column',alignItems:'center'}}>

                    {/* <FormControl variant="standard" style={{width:'60%',backgroundColor:'rgba(33, 168, 138, 0.21)',borderRadius:'5px'}}>
                        <InputLabel style={{fontFamily:'Nunito'}} htmlFor="user-email">User Email</InputLabel>
                        <Input style={{fontFamily:'Nunito'}} id="user-email" value={userEmail} onChange={handleUserEmailChange} />
                    </FormControl>
                
                
                    <FormControl variant="standard" style={{width:'60%',backgroundColor:'rgba(33, 168, 138, 0.21)',borderRadius:'5px',marginTop:'3.5%'}}>
                        <InputLabel style={{fontFamily:'Nunito'}} htmlFor="component-simple">User Password</InputLabel>
                        <Input style={{fontFamily:'Nunito'}} id="component-simple" value={userPwd} onChange={handleUserPwdChange} />
                    </FormControl>
                    <a style={{fontFamily:'Nunito'}} href="/#">¿Olvidaste tu contraseña?</a>
                
                
                <div style={{display:'flex',background: 'rgba(33, 168, 138, 0.21)',borderRadius: '10px',width:'fit-content',marginTop:'2.5%'}}>
                    <Button variant="contained" style={{background: '#009B78',fontFamily:'Nunito'}}>
                        Iniciar sesión
                    </Button>
                    <img src={ArrowIcon} alt="" style={{height:'80%',marginTop:'1%'}}/>
                </div> */}
                <h1 style={{fontFamily:'Nunito',color:'#009B78'}}>Aplicación de Detención de Entregas</h1>
                <div style={{display:'flex',background: 'rgba(33, 168, 138, 0.21)',borderRadius: '10px',width:'fit-content',marginTop:'5%'}}>
                    <Button variant="contained" style={{background: '#009B78',fontFamily:'Nunito'}} onClick={signInWWithGoogle}>
                        Ingresar con Google
                    </Button>
                    <img src={GoogleIcon} alt="" style={{height:'80%',marginTop:'1%'}}/>
                </div>
  
            </div>

        </div>
    )
}

