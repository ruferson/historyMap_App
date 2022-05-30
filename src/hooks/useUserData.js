import { useEffect, useState } from "react";
import { getUserData } from "servicios/getUserData";

const useUserData = () => {

    const [userData, setUserData] = useState([]);

    function obtenerMapas() {

        getUserData().then(nextData => {

            setUserData(nextData);

        });
    }

    useEffect(obtenerMapas);

    return { userData }
}
export default useUserData;