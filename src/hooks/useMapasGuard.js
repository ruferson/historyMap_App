import { useEffect, useState } from "react";
import { getMapasGuard } from "servicios/getMapasGuard";

const useMapasGuard = () => {

    const [listaMapasGuard, setListaMapasGuard] = useState([]);
    const [loadingGuard, setLoadingGuard] = useState(true)

    function obtenerMapas() {

        setLoadingGuard(true)
        getMapasGuard().then(nextMapas => {

            setListaMapasGuard(nextMapas);
            setLoadingGuard(false)


        });
    }

    useEffect(obtenerMapas, []);

    return { listaMapasGuard, loadingGuard }
}
export default useMapasGuard;