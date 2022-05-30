import { useEffect, useState } from "react";
import { getNotificaciones } from "../servicios/getNotificaciones";

const useNotificaciones = ( ) => {

    const [listaNotificaciones, setListaNotificaciones] = useState();
    const [loading, setLoading] = useState(true)

    function obtenerNotificaciones() {

        getNotificaciones().then(misNotificaciones => {

            setListaNotificaciones(misNotificaciones);
            setLoading(false)
            
        });
    }

    useEffect(obtenerNotificaciones, []);

    return { listaNotificaciones, loading }
}
export default useNotificaciones;