import { useEffect, useState } from "react";
import { getMapa } from "servicios/getMapa";

const useMapa = ( mapaID ) => {

    const [mapaDatos, setMapa] = useState();
    const [loading, setLoading] = useState(true)

    function obtenerMapas() {

        getMapa(mapaID).then(nextMapa => {
            setMapa(nextMapa);
            setLoading(false)
        });
    }

    useEffect(obtenerMapas, [mapaID]);

    return { mapaDatos, loading }
}
export default useMapa;