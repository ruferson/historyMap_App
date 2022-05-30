import { useEffect, useState } from "react";
import { getEvento } from "../servicios/getEvento";

const useEvento = ( eventoID, update ) => {

    const [evento, setEvento] = useState(null);
    const [loadingEvent, setLoadingEvent] = useState(true);

    function obtenerMarcadores() {
        if (eventoID !== null) {
            setLoadingEvent(true)

            getEvento(eventoID).then(nextEvento => {
                setEvento(nextEvento)
                setLoadingEvent(false)
            });
        } 
    }

    useEffect(obtenerMarcadores, [eventoID, update]);

    return { evento, loadingEvent }
}
export default useEvento;