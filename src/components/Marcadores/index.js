import React, { useState } from 'react';
import { Marker, Popup } from 'react-leaflet';

const Marcadores = (props) => {


	const [myMarkers, setMyMarkers] = useState(props.myMarkers)

	function LocationMarker(marker, key) {
		let position = marker[0];
		return position === null ? null : (
			<div>
				<Marker id={key} eventHandlers={{ click: props.changeEvent }} key={key} position={position}>
					<Popup>
						<h1>{marker[2]}</h1>
						<br></br>
						{marker[1]}
					</Popup>
				</Marker>
			</div>
		)
	}

	return myMarkers.map(LocationMarker);
}

export default Marcadores;
