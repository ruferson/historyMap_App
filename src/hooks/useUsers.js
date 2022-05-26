import { useEffect, useState } from "react";
import { getUsers} from "../servicios/getUsers";

const useUsers = (show) => {

    // Estado con la lista de Users que recuperamos de la REST API
    const [listaUsers, setListaUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    function obtenerUsers() {
        if (show){
            setLoading(true)
            // Usamos el servicio de obtención de posts que hemos creado
            getUsers().then(nextUsers => {
                //Cargamos los Users en el estado del componente
                setListaUsers(nextUsers);
                setLoading(false);
            });
        }
    }

    // Llamamos a la función de extracción de datos con un useEffect
    // para que solo se ejecute una vez
    useEffect(obtenerUsers, [show]);

    return { listaUsers, loading }
}
export default useUsers;