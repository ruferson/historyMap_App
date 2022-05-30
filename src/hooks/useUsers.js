import { useEffect, useState } from "react";
import { getUsers} from "../servicios/getUsers";

const useUsers = (show) => {

    const [listaUsers, setListaUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    function obtenerUsers() {
        if (show){
            setLoading(true)
            getUsers().then(nextUsers => {
                setListaUsers(nextUsers);
                setLoading(false);
            });
        }
    }

    useEffect(obtenerUsers, [show]);

    return { listaUsers, loading }
}
export default useUsers;