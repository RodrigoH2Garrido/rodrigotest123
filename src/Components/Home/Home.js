import React, {useEffect} from 'react'
import Appbar from '../Appbar/Appbar'
import NonSpreadView from '../NonSpreadUserView/NonSpreadView'
import SpreadUserView from '../SpreadUserView/SpreadUserView'
import firebase from '../../services/firebase'


export default function Home() {
    const [user, setUser] = React.useState({})
    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if (user?.uid){
                setUser(user)
                // console.log(user.email)
            }
        })
    }, [setUser])
    //console.log(user.email)
    const Vista = () => {
        if( user.email !== undefined && user.email.includes('@spread.cl')){
            return <SpreadUserView correo={user.email}/>
        }
        else if(user.email !== undefined && user.email.includes('rodrigotestcorreo123')){
            return <NonSpreadView correo={user.email} cliente='TEST'/>
        }   
        else if (user.email !== undefined && user.email.includes('@ripley')){
            return <NonSpreadView correo={user.email} cliente='Ripley'/>
        }
        else if (user.email !== undefined && user.email.includes('@falabella')){
            return <NonSpreadView correo={user.email} cliente='Falabella'/>
        }
        else if (user.email !== undefined && user.email.includes('@shipit')){
            return <NonSpreadView correo={user.email} cliente='Shipit'/>
        }
        else if (user.email !== undefined && (user.email.includes('@corona') || user.email.includes('servicioatencioncliente20@gmail.com') ||  user.email.includes('imrodrigohgarrido@gmail.com'))){
            return <NonSpreadView correo={user.email} cliente='Corona'/>
        }
        else{
            return <div></div>
        }


    }
    return(
        <div style={{display:'flex',flexDirection:'column'}}>
            <Appbar />
            <div style={{marginTop:'5%',display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'space-evenly'}}>
                <Vista/>
            </div>

        </div>

    )
}