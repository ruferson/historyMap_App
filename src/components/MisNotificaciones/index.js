import React, { useState } from 'react';
import { useLocation } from 'wouter';
import useNotifiaciones from '../../hooks/useNotifiaciones';
import Notificacion from '../Notificacion';
import './styles.css'

function MisNotificaciones() {

    const [location, setLocation] = useLocation();
    //const [listaNotificaciones, setListaNotificaciones] = useNotifiaciones();
    const [listaNotificaciones, setListaNotificaciones] = useState(
        [
            ["Invitación", "¡Has sido invitado al mapa Aztecas!"],
            ["Invitación", "¡Has sido invitado al mapa Aztecas!"]
        ]
    )

    function mapearMisNotificaciones(notificacion, key){
        return <Notificacion url={"/ver/2"} noteName={"Invitación"} noteDesc={"¡Has sido invitado al mapa <strong>Aztecas</strong>!"}></Notificacion>
    }

    function devolverMisNotificaciones(){
        return listaNotificaciones.map(mapearMisNotificaciones)
    }

    return (
        <div className="notificaciones">
            <h1>Mis Notificaciones</h1><br />
            <div className="row">
                {devolverMisNotificaciones()}
            </div> 
        </div>
    );
}

export default MisNotificaciones;