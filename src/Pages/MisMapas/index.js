import { Button } from "reactstrap";
import { useLocation } from "wouter";
import useMisMapas from "../../hooks/useMisMapas";
import MapaClick from "../../components/MapaClick";
import Footer from "../../components/Footer";
import Ajax from "components/Ajax";
import { useState } from "react";

function MisMapas() {

    const [location, setLocation] = useLocation();
    const { listaMapasPriv, loadingPriv } = useMisMapas();
    const [pagination, setPagination] = useState(0);

    if (localStorage.getItem("isLoggedIn") === "false") {
        setLocation("/session")
    }

    function action() {
        setLocation("/crear")
    }

    function avanzar() {
        if (!loadingPriv) {
            if (listaMapasPriv.data.length - 1 > pagination) {
                if (listaMapasPriv.data.length - 1 <= pagination + 3) {
                    if (listaMapasPriv.data.length - 1 === pagination + 3) {
                        setPagination(listaMapasPriv.data.length - 1)
                    } else {

                    }
                } else {
                    setPagination(pagination + 3)
                }
            }
        }
        return null;
    }

    function atrasar() {
        if (!loadingPriv) {
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

    function mapearMapas(mapa, key) {
        if (key < (pagination + 3) && key >= pagination) {
            return <MapaClick key={key} mapID={mapa.id} mapImage={mapa.link_imagen} mapName={mapa.nombre} mapDesc={mapa.nombre}></MapaClick>
        }
    }

    function devolverMapasPriv() {
        if (listaMapasPriv.data) {
            return listaMapasPriv.data.map(mapearMapas)
        }
    }

    return (<div id="main">
        <div className="pr-4 pl-4">
            <h1>Mapas Creados</h1><br />
            {!loadingPriv ? <>
                <div className="row">
                    {devolverMapasPriv()}
                </div> <br />
                <button className="d-none d-md-inline" onClick={() => action()}>Crear Mapa Nuevo</button>
                <button className="d-md-none button" onClick={() => action()}>Crear Mapa Nuevo</button>
                <button className="float-right button" onClick={() => avanzar()}>Siguiente</button>
                <button className="float-right button" onClick={() => atrasar()}>Anterior</button> <br /> </>
                : <Ajax />}
        </div>
        <div className=""><Footer /></div>
    </div>
    );

}

export default MisMapas;