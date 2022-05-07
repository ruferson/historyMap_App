import { useEffect, useState } from "react";
import { getMapas } from "../servicios/getMapas";

const useMisMapas = ({ userID } = { userID: 1 }) => {

    // Estado con la lista de Mapas que recuperamos de la REST API
    const [listaMapas, setListaMapas] = useState([]);

    function obtenerMapas() {

        console.log("hola")
        // Usamos el servicio de obtención de posts que hemos creado
        getMapas({ userID }).then(nextMapas => {

            //Cargamos los Mapas en el estado del componente
            setListaMapas(nextMapas);


        });
    }

    // Llamamos a la función de extracción de datos con un useEffect
    // para que solo se ejecute una vez
    useEffect(obtenerMapas, [userID]);

    return { listaMapas }
}
export default useMisMapas;