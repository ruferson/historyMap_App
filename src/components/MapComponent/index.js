import './styles.css';

import Ajax from 'components/Ajax';
import useMarkerList from 'hooks/useMarkerList';
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import LocationMarker from './LocationMarker';

const MapComponent = (props) => {

	const [creating, setCreating] = useState(props.create);
	const { markers, loading } = useMarkerList(props.id, props.update)
	const [markerList, setMarkerList] = useState([])
	const position = [40.193795, -3.851789];

	const changeCreating = () => {
		setCreating(props.create)
	}
	useEffect(changeCreating, [props.create]);

	const ponerMarcadores = () => {
		if (!loading && markers) {
			setMarkerList(markers.map((marker) => marker));
		}
	}
	useEffect(ponerMarcadores, [loading, markers]);

	const CreandoMarkers = () => {
		useMapEvents({
			click(e) {
				if (creating) {
					props.sendMarker(e.latlng.lat, e.latlng.lng)
					props.setCreate(false);
				}
			}
		})
		return null;
	};

	const mappingMarkers = () => {
		return markerList.map((value, key) => LocationMarker(position, props, value, key))
	}

	return (<>
		{!loading ?
			<div>
				<MapContainer center={position} zoom={2} >
					<TileLayer
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					/>
					<CreandoMarkers />
					{mappingMarkers()}
				</MapContainer>
			</div>
			: <Ajax />}</>
	);
}

export default MapComponent;
