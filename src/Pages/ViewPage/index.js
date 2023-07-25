import './styles.css';

import useMap from 'hooks/useMap';
import React, { useState } from 'react';
import { useLocation } from 'wouter';

import EventComponent from '../../components/EventComponent';
import Footer from '../../components/Footer';
import MapComponent from '../../components/MapComponent';

const ViewPage = (props) => {

	const [mapID, setMapID] = useState(props.params.id)
	const [markerID, setMarkerID] = useState(0);
	const [noClicked, setNoClicked] = useState(true);
	const [type, setType] = useState("");
	const { mapData, loading } = useMap(mapID);
	const [event, setEvent] = useState(null)

	const cambiarMarcador = (event) => {
		setNoClicked(false);
		setType(event.target.options.type)
		setMarkerID(event.target.options.id);
	}

	return (
		<div id="main">{!loading ?
			<div className="pl-4 pr-4">
				<div className="">
					<h1 className="d-none d-sm-block">{mapData.name}</h1>
					<h2 className="d-sm-none">{mapData.name}</h2><br />
					<div className="">
						<MapComponent cambiarMarcador={cambiarMarcador} crear={false} id={mapID} event={event}></MapComponent>
					</div> <br />
					<div className="">
						<EventComponent id={markerID} type={type} noClicked={noClicked} setEvent={setEvent}></EventComponent>
					</div>
				</div>
				<br />
			</div>
			: <></>}
			<Footer />
		</div>
	);
}

export default ViewPage;