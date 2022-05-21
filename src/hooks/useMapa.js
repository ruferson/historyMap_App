import { useEffect, useState } from "react";
import { getMapa } from "servicios/getMapa";

const useMapa = ({ mapaID } = { mapaID: 1 }) => {

    // Estado con la lista de Mapas que recuperamos de la REST API
    const [mapaDatos, setMapa] = useState();

    function obtenerMapas() {

        console.log("hola")
        // Usamos el servicio de obtención de posts que hemos creado
        getMapa(mapaID).then(nextMapa => {

            //Cargamos los Mapas en el estado del componente
            setMapa(nextMapa);


        });
    }

    // Llamamos a la función de extracción de datos con un useEffect
    // para que solo se ejecute una vez
    useEffect(obtenerMapas, [mapaID]);

    return { mapaDatos }
}
export default useMapa;