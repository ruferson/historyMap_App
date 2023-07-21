import './styles.css';

import L from 'leaflet';
import React from 'react';
import { Marker, Popup } from 'react-leaflet';

import birthIcon from '../../img/birth.png';
import constructionIcon from '../../img/construction.png';
import deathIcon from '../../img/death.png';
import defaultIcon from '../../img/default.png';
import discoveryIcon from '../../img/discovery.png';
import warIcon from '../../img/war.png';

const LocationMarker = (position, props, marker, key) => {
	let myIcon = L.icon({
		iconUrl: defaultIcon,
		iconRetinaUrl: defaultIcon,
		iconAnchor: [5, 55],
		popupAnchor: [10, -44],
		iconSize: [30, 30],
	});
	switch (marker.type) {
		case "war":
			myIcon = L.icon({
				iconUrl: warIcon,
				iconRetinaUrl: warIcon,
				iconAnchor: [5, 55],
				popupAnchor: [10, -44],
				iconSize: [30, 30],
			});
			break;
		case "birth":
			myIcon = L.icon({
				iconUrl: birthIcon,
				iconRetinaUrl: birthIcon,
				iconAnchor: [5, 55],
				popupAnchor: [10, -44],
				iconSize: [30, 30],
			});
			break;
		case "discovery":
			myIcon = L.icon({
				iconUrl: discoveryIcon,
				iconRetinaUrl: discoveryIcon,
				iconAnchor: [5, 55],
				popupAnchor: [10, -44],
				iconSize: [30, 30],
			});
			break;
		case "death":
			myIcon = L.icon({
				iconUrl: deathIcon,
				iconRetinaUrl: deathIcon,
				iconAnchor: [5, 55],
				popupAnchor: [10, -44],
				iconSize: [30, 30],
			});
			break;
		case "construction":
			myIcon = L.icon({
				iconUrl: constructionIcon,
				iconRetinaUrl: constructionIcon,
				iconAnchor: [5, 55],
				popupAnchor: [10, -44],
				iconSize: [30, 30],
			});
			break;
		default:
			myIcon = L.icon({
				iconUrl: defaultIcon,
				iconRetinaUrl: defaultIcon,
				iconAnchor: [5, 55],
				popupAnchor: [10, -44],
				iconSize: [30, 30],
			});
			break;
	}
	return position === null ? null : (
		<div>
			<Marker id={marker.id} type={marker.type} eventHandlers={{ click: props.cambiarMarcador }} key={key} position={[marker.x, marker.y]} icon={myIcon}>
				<Popup>
					<h3>{props.evento ? props.evento.data.titulo : ""}</h3>
				</Popup>
			</Marker>
		</div>
	)
}

export default LocationMarker;