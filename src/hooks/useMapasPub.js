import { useEffect, useState } from "react";
import { getMapasPublicos } from "../servicios/getMapasPublicos";

const useMapasPub = () => {

    // Estado con la lista de Mapas que recuperamos de la REST API
    const [listaMapas, setListaMapas] = useState([]);
    const [loading, setLoading] = useState(true);
    function obtenerMapas() {
        setLoading(true)
        // Usamos el servicio de obtención de posts que hemos creado
        getMapasPublicos().then(nextMapas => {
            //Cargamos los Mapas en el estado del componente
            setLoading(false);
            setListaMapas(nextMapas);
            console.log("hola")
        });
    }

    // Llamamos a la función de extracción de datos con un useEffect
    // para que solo se ejecute una vez
    useEffect(obtenerMapas, []);

    return { listaMapas, loading }
}
export default useMapasPub;