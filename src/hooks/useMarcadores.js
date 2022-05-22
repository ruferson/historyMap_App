import { useEffect, useState } from "react";
import { getMarcadores } from "../servicios/getMarcadores";

const useMarcadores = ( mapaID ) => {

    // Estado con la lista de Marcadores que recuperamos de la REST API
    const [markers, setMarkers] = useState();
    const [loading, setLoading] = useState(true);

    function obtenerMarcadores() {

        // Usamos el servicio de obtención de posts que hemos creado
        getMarcadores(mapaID).then(nextMarcadores => {

            setMarkers(nextMarcadores)
            setLoading(false)
        });
    }

    // Llamamos a la función de extracción de datos con un useEffect
    // para que solo se ejecute una vez
    useEffect(obtenerMarcadores, [mapaID]);

    return { markers, loading }
}
export default useMarcadores;