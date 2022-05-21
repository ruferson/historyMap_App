import { useEffect, useState } from "react";
import { getMapa } from "servicios/getMapa";

const useMapa = ( mapaID ) => {

    // Estado con la lista de Mapas que recuperamos de la REST API
    const [mapaDatos, setMapa] = useState();
    const [loading, setLoading] = useState(true)

    function obtenerMapas() {

        console.log("hola")
        // Usamos el servicio de obtención de posts que hemos creado
        getMapa(mapaID).then(nextMapa => {
            console.log(nextMapa)
            //Cargamos los Mapas en el estado del componente
            setMapa(nextMapa);
            setLoading(true)


        });
    }

    // Llamamos a la función de extracción de datos con un useEffect
    // para que solo se ejecute una vez
    useEffect(obtenerMapas, [mapaID]);

    return { mapaDatos, loading }
}
export default useMapa;