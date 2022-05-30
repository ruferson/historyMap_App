import { useEffect, useState } from "react";
import { getMapasPublicos } from "../servicios/getMapasPublicos";

const useMapasPub = () => {

    const [listaMapas, setListaMapas] = useState([]);
    const [loading, setLoading] = useState(true);
    function obtenerMapas() {
        setLoading(true)
        getMapasPublicos().then(nextMapas => {
            setLoading(false);
            setListaMapas(nextMapas);
        });
    }

    useEffect(obtenerMapas, []);

    return { listaMapas, loading }
}
export default useMapasPub;