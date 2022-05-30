import React, { useEffect } from 'react';
import useNotificaciones from '../../hooks/useNotificaciones';
import Notificacion from '../Notificacion';

function MisNotificaciones(props) {

    const { listaNotificaciones, loading } = useNotificaciones();

    useEffect(()=> {
        if (!loading) {
            props.setNotificaciones(listaNotificaciones.data.length)
        }
    }, [loading])

    function mapearMisNotificaciones(notificacion, key){
        return <Notificacion url={notificacion.url} noteName={notificacion.type} noteDesc={notificacion.description}></Notificacion>
    }

    function devolverMisNotificaciones(){
        return listaNotificaciones.data.map(mapearMisNotificaciones)
    }

    return (
        <div className="notificaciones">
            <h1 className="text-white">Mis Notificaciones</h1><br />
            <div className="row">
                {!loading ? devolverMisNotificaciones() : <></>}
            </div> 
        </div>
    );
}

export default MisNotificaciones;