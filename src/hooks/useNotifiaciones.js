import { useEffect, useState } from "react";
import { getNotificaciones } from "../servicios/getNotificaciones";

const useNotifiaciones = (usuarioID, mapaID) => {

    // Estado con la lista de notificaciones que recuperamos de la REST API
    const [notificaciones, setNotificaciones] = useState([]);

    function obtenerNotificaciones() {


        // Usamos el servicio de obtención de posts que hemos creado
        getNotificaciones({usuarioID }).then(notificaciones => {

            //Cargamos las notificaciones en el estado del componente
            setNotificaciones(notificaciones);
            
        });
    }

    // Llamamos a la función de extracción de datos con un useEffect
    // para que solo se ejecute una vez
    useEffect(obtenerNotificaciones, [mapaID]);

    return { notificaciones }
}
export default useNotifiaciones;