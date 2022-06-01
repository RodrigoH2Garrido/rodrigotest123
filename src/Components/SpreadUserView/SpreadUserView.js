import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress';


function getNow(){
    let today = new Date();     
    let chile_current_date = today.toLocaleString("en-GB", {timeZone: "America/Santiago"})
    let fecha = chile_current_date.split(',')
    fecha = fecha[0] + ' '+ fecha[1]
    //console.log(fecha)
    return fecha
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: 'background.paper',
    border: '2px solid #009B78',
    boxShadow: 24,
    p: 4,
};

export default function SpreadUserView({correo}) {
    const [alertaModal, setMostrarAlertModal] = React.useState(false)
    const handleAlertModalChange = (value) => {
        setMostrarAlertModal(value)
    }
    const [cargando, setCargando] = useState(true) // cambiar esto a true
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [ingresoOpen, setIngresoOpen] = React.useState(false);
    const handleIngresoOpen = () => setIngresoOpen(true);
    const handleIngresoClose = () => setIngresoOpen(false);
    const [filas,setFilas] = useState([])
    const [dataModal,setDataModal] = useState({})

    const columns = [
        { field: 'guia', headerName: 'Guía', width: 150, },
        { field: 'region', headerName: 'Región', width: 156 },
        { field: 'cliente', headerName: 'Cliente', width: 156 },
        { field: 'motivo', headerName: 'Motivo', width: 150 },
        { field: 'comentario', headerName: 'Comentario', width: 150 },
        { field: 'fecha_creacion', headerName: 'Fecha Ingreso', width: 150 },
        { 
            field: 'responder', 
            headerName: 'Responder', 
            width: 150, 
            renderCell: (params) => {
                const onClick = (e) => {
                    setDataModal(params.row)
                    handleOpen()
                };
          
                return <Button onClick={onClick} style={{color:'#009B78'}}>Ver más ...</Button>;
              }
        },

    ]
    useEffect(()=>{
        let data = {
            datos:[],
            accion:'obtener',
            user:'spread'
        }
        setCargando(true)
        axios.post(process.env.REACT_APP_URL_AZURE_FUNCTION,data).then((response)=>{
            let data_list = response.data.rows
            data_list.forEach((element)=>{
                element.responder = <Button style={{fontFamily:'Nunito',backgroundColor:'#009B78',color:'white'}} />
            })
            //console.log(data_list)

            setFilas(response.data.rows)
            setCargando(false)
        })
        .catch((error)=>{
            console.log(error)
            setCargando(false)
        })
    },[])
    return (
        <div style={{display:'flex',flexDirection:'column',width:'100%',alignItems:'center'}}>
        <div>
            <Button style={{fontFamily:'Nunito',marginTop:'1%',backgroundColor:'#009B78',color:'white'}} onClick={handleIngresoOpen} >Ingreso de Guías</Button>
        </div>
        { filas.length>0 && <div style={{height:'400px',marginTop:'2.5%',width:'90%',alignSelf:'center',marginBottom:'2%'}}>

            <DataGrid
                style={{borderColor:'rgb(0, 155, 120)'}}
                density={'comfortable'}
                rows={filas}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                
            />
        </div>}
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div style={{display:'flex',flexDirection:'column'}}>

                        <div style={{alignSelf:'center'}}>
                            <h3 style={{fontFamily:'Nunito',fontWeight:'bold',color:'#009B78'}}>Información de la Guía</h3>
                        </div>
                        <div style={{display:'flex',justifyContent:'space-around',marginTop:'5%',flexWrap:'wrap'}}>
                            <div style={{display:'flex',flexDirection:'column'}}>
                                <div style={{display:'flex',flexDirection:'column'}}>
                                    <h4 style={{fontFamily:'Nunito',fontWeight:'bold',color:'#000000'}}>Guía</h4>
                                    <h4 style={{fontFamily:'Nunito',fontWeight:'bold',color:'#000000'}}>{dataModal.guia}</h4>
                                </div>
                                <div style={{display:'flex',flexDirection:'column',marginTop:'5%'}}>
                                    <h4 style={{fontFamily:'Nunito',fontWeight:'bold',color:'#000000'}}>Región</h4>
                                    <h4 style={{fontFamily:'Nunito',fontWeight:'bold',color:'#000000'}}>{dataModal.region}</h4>
                                </div>
                                <div style={{display:'flex',flexDirection:'column',marginTop:'5%'}}>
                                    <h4 style={{fontFamily:'Nunito',fontWeight:'bold',color:'#000000'}}>Cliente</h4>
                                    <h4 style={{fontFamily:'Nunito',fontWeight:'bold',color:'#000000'}}>{dataModal.cliente}</h4>
                                </div>
                            </div>
                            <div style={{display:'flex',flexDirection:'column'}}>
                                <div style={{display:'flex',flexDirection:'column'}}>
                                    <h4 style={{fontFamily:'Nunito',fontWeight:'bold',color:'#000000'}}>Motivo</h4>
                                    <h4 style={{fontFamily:'Nunito',fontWeight:'bold',color:'#000000'}}>{dataModal.motivo}</h4>
                                </div>
                                <div style={{display:'flex',flexDirection:'column',marginTop:'5%'}}>
                                    <h4 style={{fontFamily:'Nunito',fontWeight:'bold',color:'#000000'}}>Fecha Ingreso</h4>
                                    <h4 style={{fontFamily:'Nunito',fontWeight:'bold',color:'#000000'}}>{dataModal.fecha_creacion}</h4>
                                </div>
                                <div style={{display:'flex',flexDirection:'column',marginTop:'5%'}}>
                                    <h4 style={{fontFamily:'Nunito',fontWeight:'bold',color:'#000000'}}>Correo</h4>
                                    <h4 style={{fontFamily:'Nunito',fontWeight:'bold',color:'#000000'}}>{dataModal.correo_cliente}</h4>
                                </div>
                            </div>
                        </div>
                        <div style={{marginTop:'2%',display:'flex',flexDirection:'column'}}>
                            <h4 style={{fontFamily:'Nunito',fontWeight:'bold',color:'#000000',alignSelf:'center'}}>Comentario</h4>
                            <h4 style={{fontFamily:'Nunito',fontWeight:'bold',color:'#000000',alignSelf:'center'}}>{dataModal.comentario}</h4>
                        </div>

                    <div style={{display:'flex',flexDirection:'column',marginTop:'5%',alignItems:'center'}}>
                        <div style={{alignSelf:'center'}}>
                            <h3 style={{fontFamily:'Nunito',fontWeight:'bold',color:'#009B78'}}>Respuesta</h3>
                        </div>
                        <div style={{marginTop:'2%',display:'flex',alignItems:'center',justifyContent:'space-evenly',width:'100%',flexWrap:'wrap'}}>
                            <div>
                                <select id='motivo-respuesta-input' style={{fontFamily:'Nunito',fontSize:'var(--bs-body-font-size)'}}>
                                    <option value='1'>Seleccione Motivo</option>
                                    <option value='Desconocimiento de Entrega'>Desconocimiento de Entrega</option>
                                    <option value='Anulación de Entrega'>Anulación de Entrega</option>
                                    <option value='Atraso de Entrega'>Atraso de Entrega</option>
                                    <option value='Incidencias'>Incidencias</option>
                                    <option value='Fraude'>Fraude</option>
                                </select>
                            </div>
                            <div style={{display:'flex',flexDirection:'column'}}>                         
                                <label htmlFor='respuesta-input' style={{fontFamily:'Nunito',fontSize:'var(--bs-body-font-size)',marginTop:'2%'}}>Comentario</label>
                                <textarea id='respuesta-input' style={{fontFamily:'Nunito',fontSize:'var(--bs-body-font-size)',width:'max-content'}}></textarea>
                            </div>

                        </div>
                        <Button style={{fontFamily:'Nunito',marginTop:'2%',backgroundColor:'#009B78',color:'white'}} onClick={()=>{
                            if( document.getElementById('motivo-respuesta-input').value === '1'  || document.getElementById('respuesta-input').value === '' 
                                || document.getElementById('respuesta-input').value === undefined || document.getElementById('respuesta-input').value === null
                                || document.getElementById('respuesta-input').value === ''){
                                    setMostrarAlertModal(true)
                            }
                            else{
                                dataModal.motivo_respuesta = document.getElementById('motivo-respuesta-input').value;
                                dataModal.comentario_respuesta = document.getElementById('respuesta-input').value;
                                dataModal.fecha_actualizacion = getNow()
                                dataModal.estado = 'contestado'
                                dataModal.correo_respuesta = correo
                                //console.log(dataModal)
                                let data ={
                                    item:dataModal,
                                    accion:'respuesta_guia',
                                    user:'spread'
                                }
                                setCargando(true)
                                axios.post(process.env.REACT_APP_URL_AZURE_FUNCTION,data).then( res => {
                                    //console.log(res)
                                    let actualizado = filas.filter((value,index,arr)=>{
                                        return value.guia !== dataModal.guia
                                    })
                                    //console.log(actualizado)
                                    setFilas(actualizado)
                                    setCargando(false)
                                    handleClose()
                                }).catch(err => {
                                    console.log(err)
                                })
                            }
                        }} >Contestar</Button>
                    </div>
                    { alertaModal && <ChildModal mostrar={alertaModal} returnMostrar={handleAlertModalChange} />}

                    { cargando && <Cargando/>}

                </div>
            </Box>
      </Modal>

      <Modal
       open={ingresoOpen}
       onClose={handleIngresoClose}
       aria-labelledby="modal-modal-title"
       aria-describedby="modal-modal-description"
       >
            <Box sx={style}>
                <div style={{display:'flex', justifyContent:'space-evenly',flexWrap:'wrap'}}>
                        <div style={{display:'flex',flexDirection:'column'}}>
                            <label htmlFor='guia-input' style={{fontFamily:'Nunito',fontSize:'var(--bs-body-font-size)',marginTop:'2%'}}>Guia</label>
                            <input type='text' id='guia-input' style={{fontFamily:'Nunito',fontSize:'var(--bs-body-font-size)',width:'max-content'}}/>

                            <label htmlFor='region-input' style={{fontFamily:'Nunito',fontSize:'var(--bs-body-font-size)',marginTop:'2%'}}>Región</label>
                            <select id='region-input' style={{fontFamily:'Nunito',fontSize:'var(--bs-body-font-size)',marginTop:'2%'}}>
                                <option value='1'>Seleccione Región</option>
                                <option value='5ta'>5ta</option>
                                <option value='6ta'>6ta</option>
                                <option value='Metropolitana'>Metropolitana</option>
                            </select>                            
                            

                        </div>

                        <div style={{display:'flex',flexDirection:'column'}}>
                        
                            <label htmlFor='motivo-input' style={{fontFamily:'Nunito',fontSize:'var(--bs-body-font-size)', marginTop:'2%'}}>Motivo</label>
                            <select id='motivo-input' style={{fontFamily:'Nunito',fontSize:'var(--bs-body-font-size)',marginTop:'2%'}}>
                                <option value='1'>Seleccione Motivo</option>
                                <option value='Desconocimiento de Entrega'>Desconocimiento de Entrega</option>
                                <option value='Anulación de Entrega'>Anulación de Entrega</option>
                                <option value='Atraso de Entrega'>Atraso de Entrega</option>
                                <option value='Incidencias'>Incidencias</option>
                                <option value='Fraude'>Fraude</option>
                            </select>   
                        
                            <label htmlFor='cliente-input' style={{fontFamily:'Nunito',fontSize:'var(--bs-body-font-size)', marginTop:'2%'}}>Correo Cliente</label>
                            <select id='cliente-input' style={{fontFamily:'Nunito',fontSize:'var(--bs-body-font-size)',marginTop:'2%'}}>
                                <option value='1'>Seleccione Cliente</option>
                                <option value='Corona'>Corona</option>
                                <option value='Falabella'>Falabella</option>
                                <option value='Ripley'>Ripley</option>
                                <option value='Shipit'>Shipit</option>
                                <option value='Paris'>Paris</option>
                                <option value='TEST'>TEST</option>
                            </select>
                        
                            <label htmlFor='correo-input' style={{fontFamily:'Nunito',fontSize:'var(--bs-body-font-size)', marginTop:'2%'}}>Correo</label>
                            <input type='email' id='correo-input' style={{fontFamily:'Nunito',fontSize:'var(--bs-body-font-size)',marginTop:'2%',width:'max-content'}}/>
                        </div>
                        <div style={{display:'flex',flexDirection:'column',height:'max-content',justifyContent:'space-between'}}>
                            <label htmlFor='comentario-input' style={{fontFamily:'Nunito',fontSize:'var(--bs-body-font-size)', marginTop:'2%'}}>Comentario</label>
                            <textarea id='comentario-input' style={{fontFamily:'Nunito',fontSize:'var(--bs-body-font-size)',width:'max-content'}}></textarea>
                            <Button style={{fontFamily:'Nunito',marginTop:'1%',backgroundColor:'#009B78',color:'white'}} onClick={(event)=>{

                                if (document.getElementById('guia-input').value === ''
                                    || document.getElementById('region-input').value === '1'
                                    || document.getElementById('motivo-input').value === '1'
                                    || document.getElementById('cliente-input').value === '1'
                                    || document.getElementById('correo-input').value === ''
                                    || document.getElementById('comentario-input').value === ''
                                    ){
                                    setMostrarAlertModal(true)
                                }
                                else{   
                                    setCargando(true)
                                    let data = {
                                        datos:[{
                                            guia:document.getElementById('guia-input').value,
                                            region:document.getElementById('region-input').value,
                                            motivo:document.getElementById('motivo-input').value,
                                            cliente:document.getElementById('cliente-input').value,
                                            correo_cliente:document.getElementById('correo-input').value,
                                            comentario:document.getElementById('comentario-input').value,
                                            fecha_creacion:getNow(),
                                            estado :'ingresado',
                                            correo_respuesta : '',
                                            fecha_actualizacion : '',
                                            motivo_respuesta : '',
                                            comentario_respuesta : ''
            
                                        }],
                                        accion:'insertar',
                                        user:'no-spread',
                                        cliente:document.getElementById('cliente-input').value
                                        }
                                        console.log('data',data)
                                        
                                        axios.post(process.env.REACT_APP_URL_AZURE_FUNCTION,data).then((response)=>{
                                            setCargando(false)
                                            handleIngresoClose()
                                            window.location.reload()

                                        }).catch((error)=>{
                                            setCargando(false)
                                            console.log(error)
                                        })
                                  
                                }                                  
                            }}>Ingresar</Button>
                        </div>
                        { cargando && <Cargando/>}
                </div>
                { alertaModal && <ChildModal mostrar={alertaModal} returnMostrar={handleAlertModalChange} />}
            </Box>
      </Modal>
      { cargando && <Cargando returnMostrar={setMostrarAlertModal}/>}
    </div>
    )
}


const Cargando = () => {
    return(
        <Box sx={{position: "fixed", top: "50%", left: "50%", zIndex:'1000'}}>
        <CircularProgress style={{color:'#009B78 '}} />
      </Box>
    )
}


function ChildModal({mostrar,returnMostrar}) {
    const [open, setOpen] = React.useState(mostrar);

    const handleClose = () => {
        setOpen(false);
        returnMostrar(false)
    };
  
    return (
      <React.Fragment>
        <Modal
          
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: 200 }}>
            <h2>Atención !!!</h2>
            <p>
              Debe rellenar todos los campos antes de continuar
            </p>
            <Button style={{color:'#009B78'}} onClick={handleClose}>Entendido</Button>
          </Box>
        </Modal>
      </React.Fragment>
    );
  }