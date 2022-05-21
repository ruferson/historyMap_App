import { useEffect, useState } from "react";
import { getNotificaciones } from "../servicios/getNotificaciones";

const useNotificaciones = ( ) => {

    // Estado con la lista de notificaciones que recuperamos de la REST API
    const [notificaciones, setNotificaciones] = useState([]);
    const [loading, setLoading] = useState(true)

    function obtenerNotificaciones() {


        // Usamos el servicio de obtención de posts que hemos creado
        getNotificaciones().then(notificaciones => {

            //Cargamos las notificaciones en el estado del componente
            setNotificaciones(notificaciones);
            setLoading(false)
            
        });
    }

    // Llamamos a la función de extracción de datos con un useEffect
    // para que solo se ejecute una vez
    useEffect(obtenerNotificaciones);

    return { notificaciones, loading }
}
export default useNotificaciones;