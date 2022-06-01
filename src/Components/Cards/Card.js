import React from 'react'
import spreadlogo from '../../assets/Spread.svg'
import spreadlogo2 from '../../assets/Spread2.svg'
import Button from '@mui/material/Button'
// import ErrorAlert from '../Alertas/Alerta'

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from 'axios'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    border: '2px solid #009B78',
    boxShadow: 24,
    p: 4,
  };



export default function Card({vertical, bodyImg,cliente}) {
  let Cardsita = vertical ? VerticalCard : HorizontalCard
    return (
        <Cardsita clientIMG={bodyImg} cliente={cliente}/>
    )
}



const VerticalCard = ({clientIMG,cliente}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [confirmationOpen, setConfirmationOpen] = React.useState(false);
    const handleConfirmationOpen = () => setConfirmationOpen(true);
    const handleConfirmationClose = () => setConfirmationOpen(false);
    // const [errorAlert,setErrorAlert] = React.useState(false);
    // const handleErrorAlert = () => setErrorAlert(true);
    // const handleErrorAlertClose = () => setErrorAlert(false);

    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);
    const {height, width} = useWindowDimensions();
 
    console.log(height,width)
    let data = {
        correos:['rodrigo.henriquez@spread.cl'],
        cliente:'Paris',
        start_date:startDate,
        end_date:endDate
    }
    let BarraVerde = (width <=1151) ? DivNada : BarraHorizontal


    return(
        <div style = {{display:'flex',flexDirection:'column',width:'15%',justifyContent:'center',border:'#009B78 solid 1px',borderRadius:'20px 20px 20px 20px'}}>
            <div style={{color:'#009B78',fontFamily:'Nunito',backgroundColor:'white',borderRadius:'20px 20px 0px 0px',padding:'5%'}}>
                <img alt='clientLogo' src={clientIMG} style={{width:'100%'}}/>
            </div>
            <div style={{backgroundColor:'#009B78',display:'flex',flexDirection:'column',alignItems:'center',borderRadius:'0px 0px 20px 20px'}}>
                <img src={spreadlogo} alt="spreadlogo" style={{marginTop:'10%',width:'100%'}}/>
                <Button style={{backgroundColor:'white',color:'#009B78',marginTop:'3%',fontFamily:'Nunito',position:'relative'}} onClick={handleOpen}>Continuar</Button>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                   <div style={{display:'flex',flexDirection:'column'}}>
                        <img src={spreadlogo2}  alt="spreadlogo" style={{marginTop:'5%',width:'50%',alignSelf:'center'}}/>
                        <h1 style={{fontFamily:'Nunito',textAlign:'center'}}> Solo debe escoger una opción </h1>
                        <div style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly',flexWrap:'wrap'}}>
                            <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',marginTop:'5%'}}>
                                <h2 style={{fontFamily:'Nunito',textAlign:'center'}}>Seleccione el rango de fechas</h2>
                                <label style={{fontFamily:'Nunito'}} htmlFor="start-date">Fecha Inicio</label>
                                <input style={{fontFamily:'Nunito'}} type="date" id="start-date" min={'2022-05-01'} onChange={()=>{
                                    setStartDate(document.getElementById('start-date').value)
                                }}/>
                                <label style={{fontFamily:'Nunito'}} htmlFor="end-date">Fecha Termino</label>
                                <input style={{fontFamily:'Nunito'}} type="date" id="end-date" min={'2022-05-01'} onChange={()=>{
                                    setEndDate(document.getElementById('end-date').value)
                                }}/>
                            </div>
                            <BarraVerde/>
                            <div style={{display:'flex',flexDirection:'column',marginTop:'5%'}}>
                                <h2 style={{fontFamily:'Nunito',textAlign:'center'}}>Ingrese Archivo</h2>
                                <input style={{fontFamily:'Nunito',marginTop:'5%'}} type="file" id="file-input" disabled  onChange={()=>{
                                    // setStartDate(document.getElementById('file-input').value)
 
                                }}/>
                            </div>
                        </div>
                        <div style={{marginTop:'5%',textAlign:'center'}}>
                            <Button style={{backgroundColor:'white',color:'#009B78',border:'#009B78 solid 1px',fontFamily:'Nunito'}} onClick={()=>{
                                console.log(data)
                                axios.post('http://localhost:7071/api/HttpTriggerDetallesMensuales',data).then( (response)=>{
                                    console.log(response)
                                }).catch( (error)=>{
                                    console.log(error)
                                })
                                handleClose()
                                handleConfirmationOpen()
                            }}>Obtener</Button>
                        </div>
                    </div>
                </Box>
            </Modal>
            <Modal
                open={confirmationOpen}
                onClose={handleConfirmationClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h1>Solicitud procesada con exito le llegara un correo con la respuesta</h1>
                </Box>
            </Modal>
            {/* <Modal
                open={errorAlert}
                onClose={handleErrorAlertClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <ErrorAlert/>
                </Box>
            </Modal> */}
        </div>
    )
}


const HorizontalCard = ({clientIMG})=>{
    return(
        <div style = {{display:'flex',flexDirection:'row',justifyContent:'center',width:'60%',flexWrap:'wrap    '}}>
            <div style={{color:'white',fontFamily:'Nunito',backgroundColor:'#009B78',borderRadius:'20px 0px 0px 20px',padding:'5%',width:'50%'}}>
                <img alt='clientLogo' src={clientIMG} style={{width:'100%'}}/>
            </div>
            <div style={{backgroundColor:'rgba(33, 168, 138, 0.21)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'space-between',borderRadius:'0px 20px 20px 0px'}}>
                <img src={spreadlogo2} alt="spreadlogo" style={{marginTop:'20%'}}/>
                <Button style={{backgroundColor:'white',color:'#009B78',fontFamily:'Nunito',marginBottom:'10%'}}>Aceptar</Button>
            </div>
        </div>
    )
}



const getWindowDimensions = () => {
    const {innerWidth: width, innerHeight: height} = window;
    return{
        width,
        height
    }
}

const BarraHorizontal = () => {
    return(
        <div style={{backgroundColor:'#009B78',marginTop:'8%',height:'120px',width:'2px'}}></div>
    )
}

const DivNada = ()=>{
    return(
        <div></div>
    )
}

const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = React.useState(getWindowDimensions());
  
    React.useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    return windowDimensions;
  }