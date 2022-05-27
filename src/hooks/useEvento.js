import { useEffect, useState } from "react";
import { getEvento } from "../servicios/getEvento";

const useEvento = ( eventoID, update ) => {

    // Estado con la lista de Marcadores que recuperamos de la REST API
    const [evento, setEvento] = useState(null);
    const [loadingEvent, setLoadingEvent] = useState(true);

    function obtenerMarcadores() {
        if (eventoID !== null) {
            setLoadingEvent(true)
            // Usamos el servicio de obtención de posts que hemos creado
            getEvento(eventoID).then(nextEvento => {
                setEvento(nextEvento)
                setLoadingEvent(false)
            });
        } 
    }

    // Llamamos a la función de extracción de datos con un useEffect
    // para que solo se ejecute una vez
    useEffect(obtenerMarcadores, [eventoID, update]);

    return { evento, loadingEvent }
}
export default useEvento;