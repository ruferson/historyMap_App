import { useEffect, useState } from "react";
import { getUserData } from "servicios/getUserData";

const useUserData = () => {

    // Estado con la lista de Mapas que recuperamos de la REST API
    const [userData, setUserData] = useState([]);

    function obtenerMapas() {

        console.log("hola")
        // Usamos el servicio de obtención de posts que hemos creado
        getUserData().then(nextData => {

            //Cargamos los Mapas en el estado del componente
            setUserData(nextData);


        });
    }

    // Llamamos a la función de extracción de datos con un useEffect
    // para que solo se ejecute una vez
    useEffect(obtenerMapas);

    return { userData }
}
export default useUserData;