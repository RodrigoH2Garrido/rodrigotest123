import React from 'react'
import Button from '@mui/material/Button'
import AlertImage from '../../assets/error_alerta.png'
export default function Alerta() {
  return (
    <div style={{display:'flex',flexDirection:'column',width:'100%',border:'2px #EA4335 solid',borderRadius:'20px',alignItems:'center'}}>
        <div style={{width:'fit-content'}}>
            <img src={AlertImage} alt="alerta_img" />
        </div>
        <div style={{marginTop:'3%'}}>
            <h2 style={{fontFamily:'Nunito'}}>Esta funcionalidad todavia no está implementada</h2>
        </div>
        <div style={{marginTop:'1.5%'}}>   
            <Button style={{backgroundColor:'#EA4335',color:'white',marginTop:'3%',fontFamily:'Nunito'}}>Entendido</Button>
        </div>
    </div>
  )
}
