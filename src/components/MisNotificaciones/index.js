import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import useNotificaciones from '../../hooks/useNotificaciones';
import Notificacion from '../Notificacion';
import './styles.css'

function MisNotificaciones(props) {

    const [location, setLocation] = useLocation();
    const { listaNotificaciones, loading } = useNotificaciones();
    const [notificaciones, setNotificaciones] = useState([])

    function mapearMisNotificaciones(notificacion, key){
        return <Notificacion url={notificacion.url} noteName={notificacion.type} noteDesc={notificacion.description}></Notificacion>
    }

    function devolverMisNotificaciones(){
        return listaNotificaciones.data.map(mapearMisNotificaciones)
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