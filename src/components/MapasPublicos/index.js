import Ajax from "components/Ajax";
import { Button } from "reactstrap";
import { useLocation } from "wouter";
import useMapasPub from "../../hooks/useMapasPub";
import MapaClick from "../MapaClick";

function MapasPublicos () {
    
    const [location, setLocation] = useLocation();
    const {listaMapas, loading} = useMapasPub();

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
        
        {!loading ? <div className="row"> {devolverMisMapas()} </div> : <Ajax/>}
        <br />
        {localStorage.getItem("isLoggedIn") !== "false" ? <Button onClick={()=>action()}>Crear Mapa Nuevo</Button> : <></>}
        </>
    );

   }

   export default MapasPublicos;