import { useEffect, useState } from "react";
import { getEsPropietario } from "../servicios/getEsPropietario";

const useEsPropietario = (usuarioID, mapaID) => {

    // Estado con la lista de Markers que recuperamos de la REST API
    const [esPropietario, setEsPropietario] = useState(false);

    function obtenerEsPropietario() {


        // Usamos el servicio de obtención de posts que hemos creado
        getEsPropietario({usuarioID, mapaID }).then(propietario => {

            //Cargamos los Markers en el estado del componente
            setEsPropietario(propietario);
            
        });
    }

    // Llamamos a la función de extracción de datos con un useEffect
    // para que solo se ejecute una vez
    useEffect(obtenerEsPropietario, [mapaID]);

    return { esPropietario }
}
export default useEsPropietario;