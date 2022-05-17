import { Button } from "reactstrap";
import { useLocation } from "wouter";
import useMisMapas from "../../hooks/useMisMapas";
import MapaClick from "../../components/MapaClick";
import Footer from "../../components/Footer";
import { useState } from "react";

function MisMapas () {
    
    const [location, setLocation] = useLocation();
    const {listaMapas} = useMisMapas(1);
    
    if (localStorage.getItem("isLoggedIn") === "false") {
        setLocation("/session")
    }

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

    return (<>
        <div className="pr-4 pl-4 pt-4">
        <h1 className="text-white">Mis Mapas</h1><br />
        <div className="row">
            {devolverMisMapas()}
        </div> <br />
        <Button onClick={()=>action()}>Crear Mapa Nuevo</Button>
        </div>
        <div className="footer-abajo"><Footer /></div>
        </>
    );

   }

   export default MisMapas;