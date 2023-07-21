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
	const [type, setTipo] = useState("");
	const { mapaDatos, loading } = useMapa(mapaID);
	const [evento, setEvento] = useState(null)

	if (localStorage.getItem("isLoggedIn") === "false") {
		setLocation("/session")
	}

	function cambiarMarcador(event) {
		setNoClicked(false);
		setTipo(event.target.options.type)
		setMarcadorID(event.target.options.id);
	}

	return (<div id="main">{!loading ?
		<div className="pl-4 pr-4">
			<div className="">
				<h1 className="d-none d-sm-block">{mapaDatos.data.name}</h1>
				<h2 className="d-sm-none">{mapaDatos.data.name}</h2><br />
				<div className="">
					<Mapa cambiarMarcador={cambiarMarcador} crear={false} id={mapaID} evento={evento}></Mapa>
				</div> <br />
				<div className="">
					<Evento id={marcadorID} type={type} noClicked={noClicked} setEvento={setEvento}></Evento>
				</div>
			</div>
			<br />
		</div>
		: <></>}
		<Footer />
	</div>

	);
}

export default Ver;