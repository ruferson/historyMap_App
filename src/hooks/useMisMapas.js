import { useEffect, useState } from "react";
import { getMapasPrivados } from "../servicios/getMapasPrivados";

const useMisMapas = () => {

    const [listaMapasPriv, setListaMapasPriv] = useState([]);
    const [loadingPriv, setLoadingPriv] = useState(true)

    function obtenerMapas() {

        setLoadingPriv(true)
        getMapasPrivados().then(nextMapas => {

            setListaMapasPriv(nextMapas);
            setLoadingPriv(false)

        });
    }

    useEffect(obtenerMapas, []);

    return { listaMapasPriv, loadingPriv }
}
export default useMisMapas;