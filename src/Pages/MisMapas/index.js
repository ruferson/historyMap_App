import { Button } from "reactstrap";
import { useLocation } from "wouter";
import useMisMapas from "../../hooks/useMisMapas";
import MapaClick from "../../components/MapaClick";
import Footer from "../../components/Footer";
import Ajax from "components/Ajax";
import useMapasGuard from "hooks/useMapasGuard";

function MisMapas() {

    const [location, setLocation] = useLocation();
    const { listaMapasPriv, loadingPriv } = useMisMapas();
    const { listaMapasGuard, loadingGuard } = useMapasGuard();

    if (localStorage.getItem("isLoggedIn") === "false") {
        setLocation("/session")
    }

    function action() {
        setLocation("/crear")
    }

    function mapearMapas(mapa, key) {
        return <MapaClick key={key} mapID={mapa.id} mapImage={mapa.link_imagen} mapName={mapa.nombre} mapDesc={mapa.nombre}></MapaClick>
    }

    function devolverMapasPriv() {
        if (listaMapasPriv.data) {
            return listaMapasPriv.data.map(mapearMapas)
        }
    }

    function devolverMapasGuard() {
        if (listaMapasGuard.data) {
            return listaMapasGuard.data.map(mapearMapas)
        }
    }

    return (<div id="main">
        <div className="pr-4 pl-4">
            <h1>Mapas Creados</h1><br />
            <div className="row">
                {loadingGuard ? <Ajax /> : devolverMapasPriv()}
            </div> <br />
            <button onClick={() => action()}>Crear Mapa Nuevo</button> <br />
        </div>
        <div className=""><Footer /></div>
    </div>
    );

}

export default MisMapas;