import { useEffect, useState } from "react";
import { getEvento } from "../servicios/getEvento";

const useEvento = ( eventoID, update ) => {

    // Estado con la lista de Marcadores que recuperamos de la REST API
    const [evento, setEvento] = useState(null);
    const [loading, setLoading] = useState(true);

    function obtenerMarcadores() {
        if (eventoID !== null) {
            console.log(eventoID)
            setLoading(true)
            // Usamos el servicio de obtención de posts que hemos creado
            getEvento(eventoID).then(nextEvento => {
                setEvento(nextEvento)
                setLoading(false)
            });
        } 
    }

    // Llamamos a la función de extracción de datos con un useEffect
    // para que solo se ejecute una vez
    useEffect(obtenerMarcadores, [eventoID, update]);

    return { evento, loading }
}
export default useEvento;