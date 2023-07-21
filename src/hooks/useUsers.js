import { useEffect, useState } from "react";
import { getUsers} from "../servicios/getUsers";

const useUsers = (show) => {

    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(true);
    function obtenerUsers() {
        if (show){
            setLoading(true)
            getUsers().then(nextUsers => {
                setUserList(nextUsers);
                setLoading(false);
            });
        }
    }

    useEffect(obtenerUsers, [show]);

    return { userList, loading }
}
export default useUsers;