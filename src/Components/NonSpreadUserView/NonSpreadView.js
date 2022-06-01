import React ,{useState}from 'react'
import Button from '@mui/material/Button'
import { DataGrid } from '@mui/x-data-grid'
import DeleteIcon from "@mui/icons-material/Delete";
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import Swal from 'sweetalert2'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box'


function getNow(){
    let today = new Date();     
    let chile_current_date = today.toLocaleString("en-GB", {timeZone: "America/Santiago"})
    let fecha = chile_current_date.split(',')
    fecha = fecha[0] + ' '+ fecha[1]
    //console.log(fecha)
    return fecha
}

const bajarPlantilla = async (rows) => {
    let data_ = rows
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const fileName = "Guías Pendientes"
    const ws = XLSX.utils.json_to_sheet(data_);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], {type: fileType});
    FileSaver.saveAs(data, fileName + fileExtension);
}

export default function NonSpreadView({correo,cliente}) {
    const [cargando, setCargando] = useState(false)

    let guia_estado = {}
    const [filas, setFilas] = React.useState([])
    const [porBorrar, setPorBorrar] = React.useState([])
    // console.log('filas',filas)
    // console.log('porBorrar',porBorrar)
    // console.log(guia_estado)
    const columns = [
        { field: 'guia', headerName: 'Guía', width: 150 },
        { field: 'region', headerName: 'Región', width: 156 },
        { field: 'cliente', headerName: 'Cliente', width: 156 },
        { field: 'motivo', headerName: 'Motivo', width: 150 },
        { field: 'comentario', headerName: 'Comentario', width: 150 },
        { field: 'delete', sortable:'false', disableColumnMenu:'true', sortDirection:'null', renderHeader: () => {
            return (
                <DeleteIcon style={{color:'red'}} onClick={()=>{
                    // console.log('hola')
                    const toDelete = new Set(porBorrar)
                    setFilas(filas.filter(fila => !toDelete.has(fila.guia)))
                }}/>
            )
        }}


      ];
      
    return (
    <div style={{display:'flex',flexDirection:'column',width:'100%'}}>
        <form id='form-nonspread'>
            <div style={{display:'flex', justifyContent:'space-evenly', flexWrap:'wrap'}}>
                <div style={{display:'flex', flexDirection:'column'}}>
                    <label style={{fontFamily:'Nunito'}} htmlFor='guia-input'>Guía</label>
                    <input id='guia-input' type='text' style={{fontFamily:'Nunito',fontSize:'var(--bs-body-font-size)'}}  onChange={(event)=>{
                        guia_estado.id = event.target.value
                        guia_estado.guia = event.target.value
                    }}></input>

                    <label style={{fontFamily:'Nunito',marginTop:'10%',fontSize:'var(--bs-body-font-size)'}} htmlFor='region-input'>Región</label>
                    <select id='region-input' style={{fontFamily:'Nunito',fontSize:'var(--bs-body-font-size)'}} onChange={(event)=>{
                        guia_estado.region = event.target.value
                    }}>
                        <option value='1'>Seleccione Región</option>
                        <option value='5ta'>5ta</option>
                        <option value='6ta'>6ta</option>
                        <option value='Metropolitana'>Metropolitana</option>

                    </select>
                </div>

                <div style={{display:'flex', flexDirection:'column'}}>
                    <label style={{fontFamily:'Nunito',fontSize:'var(--bs-body-font-size)'}} htmlFor='motivo-input'>Región</label>
                    <select id='motivo-input' style={{fontFamily:'Nunito',fontSize:'var(--bs-body-font-size)'}} onChange={(event)=>{
                        guia_estado.motivo = event.target.value
                    }}>
                        <option value='1'>Seleccione Motivo</option>
                        <option value='Desconocimiento de Entrega'>Desconocimiento de Entrega</option>
                        <option value='Anulación de Entrega'>Anulación de Entrega</option>
                        <option value='Atraso de Entrega'>Atraso de Entrega</option>
                        <option value='Incidencias'>Incidencias</option>
                        <option value='Fraude'>Fraude</option>
                    </select>

                    <label  style={{fontFamily:'Nunito' ,marginTop:'10%',fontSize:'var(--bs-body-font-size)'}} htmlFor='cliente-input'>Cliente</label>
                    <input style={{fontFamily:'Nunito',fontSize:'var(--bs-body-font-size)'}} disabled value={cliente}  id='cliente-input'type='text'></input>
                    
                    <Button style={{fontFamily:'Nunito',marginTop:'10%', backgroundColor:'#009B78',color:'white'}} onClick={
                        ()=>{
                            setCargando(true)
                            let data ={
                                accion:'obtener',
                                user:'no-spread',
                                cliente:cliente
                            }
                            axios.post(process.env.REACT_APP_URL_AZURE_FUNCTION,data).then((response)=>{
                                //console.log(response)
                                if (response.data.rows.length !== 0){  
                                    let aux_columnas = Object.keys(response.data.rows[0])
                                    let aux_table = '<table style=" border:1px solid black;"><tr>'
                                    let aux_filas = response.data.rows
                                    for(let i = 0 ; i<aux_columnas.length; i++){
                                        aux_table += `<th style=" border:1px solid black;">${aux_columnas[i]}</th>`
                                    }
                                    aux_table+='</tr>'
                                    for(let i = 0 ; i<aux_filas.length;i++){
                                        aux_table += `<tr><td style=" border:1px solid black;">${aux_filas[i]['guia']}</td><td style=" border:1px solid black;">${aux_filas[i]['region']}</td><td style=" border:1px solid black;">${aux_filas[i]['cliente']}</td><td style=" border:1px solid black;">${aux_filas[i]['motivo']}</td><td style=" border:1px solid black;">${aux_filas[i]['comentario']}</td><td style=" border:1px solid black;">${aux_filas[i]['fecha_creacion']}</td></tr>`
                                    }
                                    aux_table+='</table>'
                                    Swal.fire({
                                        html:aux_table,
                                        width:'auto',
                                        heigth:'auto',
                                        showCancelButton:true,
                                        confirmButtonText:'Descargar Excel',
                                        showCancelButtonText:'Salir'
                                    }).then((result)=>{
                                        if(result.isConfirmed){
                                            bajarPlantilla(aux_filas)
                                        }
                                    })
                                }
                                else{
                                    Swal.fire({
                                        title:'No existen datos',
                                        text:'No existen guías pendientes',
                                        icon:'success',
                                        iconColor:'#009B78',
                                        color:'rgb(44, 44, 44);',
                                        confirmButtonText:'Entendido'
                                      })
                                }
        
                                setCargando(false)
                            }).catch(error=>{
                                console.log(error)
                            })
                        }
                    }>Revisar Pendientes</Button>
                
                </div>
                
                <div style={{display:'flex', flexDirection:'column'}}>
                    <label style={{fontFamily:'Nunito',fontSize:'var(--bs-body-font-size)'}} htmlFor='comentario-input'>Comentarios</label>
                    <textarea id='comentario-input' style={{fontFamily:'Nunito',fontSize:'var(--bs-body-font-size)'}} type='text' onChange={(event)=>{
                        guia_estado.comentario= event.target.value
                    }}></textarea>
                    
                    <Button style={{fontFamily:'Nunito',marginTop:'10%', backgroundColor:'#009B78',color:'white'}} onClick={()=>{
                            if (!('guia' in guia_estado) || !('region' in guia_estado) || !('motivo' in guia_estado) || !('comentario' in guia_estado) || guia_estado.motivo === '1' || guia_estado.region === '1') {
                                    console.log('Faltan datos')
                                    console.log(guia_estado)
                                    Swal.fire({
                                        icon: 'warning',
                                        title: 'Debe completar todos los campos',
                                        iconColor: '#FDD807',
                                        showConfirmButton: false,
                                      })
                            }
                            else{
                                guia_estado.cliente = document.getElementById('cliente-input').value
                                guia_estado.fecha_creacion = getNow()
                                if(cliente === 'Shipit'){
                                    guia_estado.correo_cliente = 'ayuda@shipit.cl'
                                }
                                else{
                                    guia_estado.correo_cliente = correo
                                }
                                guia_estado.estado = 'ingresado'
                                guia_estado.correo_respuesta = ''
                                guia_estado.fecha_actualizacion = ''
                                guia_estado.motivo_respuesta = ''
                                guia_estado.comentario_respuesta = ''
                                setFilas([...filas,guia_estado])
                                document.getElementById('form-nonspread').reset()
                            }
                    }}>Aceptar</Button>
                </div>
            </div>
        </form>

        { filas.length > 0 &&
            <div style={{height:'400px',marginTop:'2.5%',width:'80%',alignSelf:'center',marginBottom:'2%'}}>
                <DataGrid
                    style={{borderColor:'rgb(0, 155, 120)'}}
                    density={'comfortable'}
                    rows={filas}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    disableSelectionOnClick
                    onSelectionModelChange={(event)=>{
                        setPorBorrar(event)
                    }}
                />

            <Button style={{fontFamily:'Nunito',marginTop:'1%',backgroundColor:'#009B78',color:'white'}} onClick={()=>{
                let data = {
                    datos:filas,
                    accion:'insertar',
                    user:'no-spread',
                    cliente:cliente
                }
                setCargando(true)
                axios.post(process.env.REACT_APP_URL_AZURE_FUNCTION,data).then((response)=>{
                    console.log(response)
                    setFilas([])
                    setCargando(false)
                }).catch((error)=>{
                    console.log(error)
                })
            }}>Enviar</Button>
            </div>
        }
        {cargando && <Cargando/>}
    </div>

  )
}


const Cargando = () => {
    return(
        <Box sx={{position: "fixed", top: "50%", left: "50%"}}>
        <CircularProgress style={{color:'#009B78 '}} />
      </Box>
    )
}