import './styles.css';

import useMapa from 'hooks/useMap';
import React, { useState } from 'react';
import { useLocation } from 'wouter';

import EventComponent from '../../components/EventComponent';
import Footer from '../../components/Footer';
import MapComponent from '../../components/MapComponent';

const Ver = (props) => {

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

	const cambiarMarcador = (event) => {
		setNoClicked(false);
		setTipo(event.target.options.type)
		setMarcadorID(event.target.options.id);
	}

	return (
		<div id="main">{!loading ?
			<div className="pl-4 pr-4">
				<div className="">
					<h1 className="d-none d-sm-block">{mapaDatos.data.name}</h1>
					<h2 className="d-sm-none">{mapaDatos.data.name}</h2><br />
					<div className="">
						<MapComponent cambiarMarcador={cambiarMarcador} crear={false} id={mapaID} evento={evento}></MapComponent>
					</div> <br />
					<div className="">
						<EventComponent id={marcadorID} type={type} noClicked={noClicked} setEvento={setEvento}></EventComponent>
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