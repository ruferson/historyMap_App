import { useEffect, useState } from "react";
import { getMarcadores } from "../servicios/getMarcadores";

const useMarcadores = ( mapaID, update ) => {

    const [markers, setMarkers] = useState();
    const [loading, setLoading] = useState(true);

    function obtenerMarcadores() {
        
        setLoading(true)
        getMarcadores(mapaID).then(nextMarcadores => {
            setMarkers(nextMarcadores)
            setLoading(false)
        });
    }

    useEffect(obtenerMarcadores, [mapaID, update]);

    return { markers, loading }
}
export default useMarcadores;