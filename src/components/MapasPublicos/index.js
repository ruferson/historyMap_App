import { Button } from "reactstrap";
import { useLocation } from "wouter";
import useMisMapas from "../../hooks/useMisMapas";
import MapaClick from "../MapaClick";

function MapasPublicos () {
    
    const [location, setLocation] = useLocation();
    const {listaMapas} = useMisMapas(1);
    //let listaMapas = [["img1", "Mapa 1", "Desc 1"], ["img2", "Mapa 2", "Desc 2"], ["img3", "Mapa 3", "Desc 3"], ["img4", "Mapa 4", "Desc 4"]];

    function action() {
        setLocation("/crear")
    }

    function mapearMisMapas(mapa, key){
        return <MapaClick mapImage={mapa[0]} mapName={mapa[1]} mapDesc={mapa[2]}></MapaClick>
    }

    function devolverMisMapas(){
        
        return listaMapas.map(mapearMisMapas)
    }
    
    function puedeCrear(){
        if (JSON.parse(localStorage.getItem("userData")).rol==="profesor"){
            return <Button onClick={()=>action()}>Crear Mapa Nuevo</Button>
        }
    }

    return (
        <>
        <div className="row">
            {devolverMisMapas()}
        </div> <br />
            {puedeCrear()}
        </>
    );

   }

   export default MapasPublicos;