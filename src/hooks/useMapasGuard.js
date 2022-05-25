import { useEffect, useState } from "react";
import { getMapasGuard } from "servicios/getMapasGuard";
import { getMapasPrivados } from "../servicios/getMapasPrivados";

const useMapasGuard = () => {

    // Estado con la lista de Mapas que recuperamos de la REST API
    const [listaMapasGuard, setListaMapasGuard] = useState([]);
    const [loadingGuard, setLoadingGuard] = useState(true)

    function obtenerMapas() {

        setLoadingGuard(true)
        // Usamos el servicio de obtención de posts que hemos creado
        getMapasGuard().then(nextMapas => {

            //Cargamos los Mapas en el estado del componente
            setListaMapasGuard(nextMapas);
            setLoadingGuard(false)


        });
    }

    // Llamamos a la función de extracción de datos con un useEffect
    // para que solo se ejecute una vez
    useEffect(obtenerMapas, []);

    return { listaMapasGuard, loadingGuard }
}
export default useMapasGuard;