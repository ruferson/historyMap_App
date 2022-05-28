import React, { useState } from 'react';
import './styles.css';
import Evento from '../../components/Evento';
import Mapa from '../../components/Mapa';
import { useLocation } from 'wouter';
import Compartir from '../../components/Compartir';
import Footer from '../../components/Footer';
import useMapa from 'hooks/useMapa';

function Ver(props) {

    const [mapaID, setMapaID] = useState(props.params.id)
    const [location, setLocation] = useLocation();
    const [marcadorID, setMarcadorID] = useState(0);
    const [noClicked, setNoClicked] = useState(true);
    const [tipo, setTipo] = useState("");
    const { mapaDatos, loading } = useMapa(mapaID);
    const [evento, setEvento] = useState(null)

    if (localStorage.getItem("isLoggedIn") === "false") {
        setLocation("/session")
    }

    function cambiarMarcador(event){
        setNoClicked(false);
        setTipo(event.target.options.tipo)
        setMarcadorID(event.target.options.id);
    }

    console.log(mapaID)

    return (<div id="main">{ !loading ?
        <div className="pl-4 pr-4">
            <div className="">
                <h1>{mapaDatos.data.nombre}</h1> <br />
                <div className="">
                    <Mapa cambiarMarcador={cambiarMarcador} crear={false} id={mapaID} evento={evento}></Mapa>
                </div> <br/>
                <div className="">
                    <Evento id={marcadorID} tipo={tipo} noClicked={noClicked} setEvento={setEvento}></Evento>
                </div>
            </div>
            <br/>
        </div>
         : <></>}
        <Footer/>
        </div>

    );
}

export default Ver;