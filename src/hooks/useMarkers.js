import { useEffect, useState } from "react";
import { getMarkers } from "../servicios/getMarkers";

const useMarkers = ({ mapaID } = { mapaID: 'a' }) => {

    // Estado con la lista de Markers que recuperamos de la REST API
    const [listaMarkers, setListaMarkers] = useState([]);

    // Estado para controlar si estamos cargando los datos o hemos finalizado
    // de cargarlos
    const [buscando, setBuscando] = useState(true);

    function obtenerMarkers() {


        // Usamos el servicio de obtención de posts que hemos creado
        getMarkers({ mapaID }).then(nextMarkers => {

            //Cargamos los Markers en el estado del componente
            setListaMarkers(nextMarkers);


            //Indicamos que hemos terminado de cargar los datos
            setBuscando(false)

            localStorage.setItem("lastMapaID", mapaID); //Guardamos la letra en el localStorage de lastMapaID
        });
    }

    // Llamamos a la función de extracción de datos con un useEffect
    // para que solo se ejecute una vez
    useEffect(obtenerMarkers, [mapaID]);

    return { buscando, listaMarkers }
}
export default useMarkers;