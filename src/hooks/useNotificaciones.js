import { useEffect, useState } from "react";
import { getNotificaciones } from "../servicios/getNotificaciones";

const useNotificaciones = ( ) => {

    // Estado con la lista de notificaciones que recuperamos de la REST API
    const [listaNotificaciones, setListaNotificaciones] = useState();
    const [loading, setLoading] = useState(true)

    function obtenerNotificaciones() {


        // Usamos el servicio de obtención de posts que hemos creado
        getNotificaciones().then(misNotificaciones => {

            console.log(misNotificaciones)
            //Cargamos las notificaciones en el estado del componente
            setListaNotificaciones(misNotificaciones);
            setLoading(false)
            
        });
    }

    // Llamamos a la función de extracción de datos con un useEffect
    // para que solo se ejecute una vez
    useEffect(obtenerNotificaciones, []);

    return { listaNotificaciones, loading }
}
export default useNotificaciones;