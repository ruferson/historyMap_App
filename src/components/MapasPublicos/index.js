import { Button } from "reactstrap";
import { useLocation } from "wouter";
import useMapasPub from "../../hooks/useMapasPub";
import MapaClick from "../MapaClick";

function MapasPublicos () {
    
    const [location, setLocation] = useLocation();
    const {listaMapas} = useMapasPub(1);

    function action() {
        setLocation("/crear")
    }

    function mapearMisMapas(mapa, key){
        return <MapaClick key={key} mapID={mapa.id} mapImage={mapa.link_imagen} mapName={mapa.nombre} mapDesc={mapa.nombre}></MapaClick>
    }

    function devolverMisMapas(){
        console.log(listaMapas.data)
        if (listaMapas.data){
            return listaMapas.data.map(mapearMisMapas)
        }
    }

    return (
        <>
        <div className="row">
            {devolverMisMapas()}
        </div> <br />
        <Button onClick={()=>action()}>Crear Mapa Nuevo</Button>
        </>
    );

   }

   export default MapasPublicos;