import Ajax from "components/Ajax";
import { useState } from "react";
import { useLocation } from "wouter";
import useMapasPub from "../../hooks/useMapasPub";
import MapaClick from "../MapaClick";

function MapasPublicos() {

    const [location, setLocation] = useLocation();
    const { listaMapas, loading } = useMapasPub();
    const [pagination, setPagination] = useState(0);

    function action() {
        setLocation("/crear")
    }

    function avanzar() {
        if (!loading) {
            if (listaMapas.data.length-1 > pagination) {
                if (listaMapas.data.length-1 <= pagination + 3) {
                    setPagination(listaMapas.data.length-1)
                } else {
                    setPagination(pagination + 3)
                }
            }
        }
        return null;
    }

    function atrasar() {
        if (!loading) {
            if (0 < pagination) {
                if (0 >= pagination - 3) {
                    setPagination(0)
                } else {
                    setPagination(pagination - 3)
                }
            }
        }
        return null;
    }

    function mapearMisMapas(mapa, key) {
        if (key < (pagination + 3) && key >= pagination) {
            return <MapaClick key={key} mapID={mapa.id} mapImage={mapa.link_imagen} mapName={mapa.nombre} mapDesc={mapa.nombre}></MapaClick>
        }
    }

    function devolverMisMapas() {
        if (listaMapas.data) {
            return listaMapas.data.map(mapearMisMapas)
        }
    }

    return (
        <>
            {!loading ? <> <div className="row"> {devolverMisMapas()} </div> 
            <br />
            <button className="d-none d-md-inline" onClick={() => action()}>Crear Mapa Nuevo</button>
            <button className="d-md-none button" onClick={() => action()}>Crear Mapa Nuevo</button>
            <button className="float-right button" onClick={() => avanzar()}>Siguiente</button>
            <button className="float-right button" onClick={() => atrasar()}>Anterior</button> </>
            : <Ajax />}
        </>
    );

}

export default MapasPublicos;