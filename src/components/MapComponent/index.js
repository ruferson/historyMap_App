import './styles.css';

import Ajax from 'components/Ajax';
import useMarcadores from 'hooks/useMakers';
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import LocationMarker from './LocationMarker';

const Mapa = (props) => {

	const [creating, setCreating] = useState(props.crear);
	const { markers, loading } = useMarcadores(props.id, props.update)
	const [markerList, setMarkerList] = useState([])
	const position = [40.193795, -3.851789];

	const changeCreating = () => {
		setCreating(props.crear)
	}
	useEffect(changeCreating, [props.crear]);

	const ponerMarcadores = () => {
		if (!loading) {
			setMarkerList(markers.map((marker) => marker));
		}
	}
	useEffect(ponerMarcadores, [loading]);

	const CreandoMarkers = () => useMapEvents({
		click(e) {
			if (creating) {
				props.sendMarcador(e.latlng.lat, e.latlng.lng)
				props.setCrear(false);
			}
		},
	});

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

export default Mapa;
