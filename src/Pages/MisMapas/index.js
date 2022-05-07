import { Button } from "reactstrap";
import { useLocation } from "wouter";
import useMisMapas from "../../hooks/useMisMapas";
import MapaClick from "../../components/MapaClick";
import Footer from "../../components/Footer";

function MisMapas () {
    
    const [location, setLocation] = useLocation();
    //const {listaMapas} = useMisMapas(1);
    let listaMapas = [["img1", "Mapa 1", "Desc 1"], ["img2", "Mapa 2", "Desc 2"], ["img3", "Mapa 3", "Desc 3"], ["img4", "Mapa 4", "Desc 4"]];

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

    return (<>
        <div className="pr-4 pl-4 pt-4">
        <h1 className="text-white">Mis Mapas</h1><br />
        <div className="row">
            {devolverMisMapas()}
        </div> <br />
            {puedeCrear()} 
        </div>
        <div className="footer-abajo"><Footer /></div>
        </>
    );

   }

   export default MisMapas;