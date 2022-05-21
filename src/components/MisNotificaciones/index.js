import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import useNotifiaciones from '../../hooks/useNotificaciones';
import Notificacion from '../Notificacion';
import './styles.css'

function MisNotificaciones() {

    const [location, setLocation] = useLocation();
    const { listaNotificaciones, loading } = useNotifiaciones();
    const [notificaciones, setNotificaciones] = useState([])

    function ponerNotificaciones() {
        console.log(loading)
        console.log(listaNotificaciones)
        if (!loading){
            let pre=[];
            for(let i=0; i<Object.keys(listaNotificaciones.data).length;i++){
                let array = [listaNotificaciones.data[i].type, listaNotificaciones.data[i].descripcion]
                pre.push(array);
            }
            setNotificaciones(notificaciones);
        }
    }
    useEffect(ponerNotificaciones, [loading]);

    function mapearMisNotificaciones(notificacion, key){
        return <Notificacion url={"/ver/2"} noteName={"Invitación"} noteDesc={"¡Has sido invitado al mapa <strong>Aztecas</strong>!"}></Notificacion>
    }

    function devolverMisNotificaciones(){
        return notificaciones.map(mapearMisNotificaciones)
    }

    return (
        <div className="notificaciones">
            <h1>Mis Notificaciones</h1><br />
            <div className="row">
                {!loading ? devolverMisNotificaciones() : <></>}
            </div> 
        </div>
    );
}

export default MisNotificaciones;