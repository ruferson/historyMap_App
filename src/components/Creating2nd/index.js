import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import useEvent from 'hooks/useEvent';
import React, { useEffect, useState } from 'react';

import { db } from '../../firebase/firebaseConfig';
import Writer from '../Writer';
import MapComponent from '../MapComponent';

const Creating2nd = (props) => {

	const [create, setCreate] = useState(false);
	const [markerID, setMarkerID] = useState(null);
	const [update, setUpdate] = useState(0);
	const [html, setHTML] = useState();
	const [title, setTitle] = useState()
	const [type, setType] = useState("default")
	const { mapEvent, loading } = useEvent(markerID, update);

	const changeMarker = (event) => {
		setUpdate(update + 1)
		setType(event.target.options.type)
		setMarkerID(event.target.options.id);
	}

	const cambiarMarcadorACreado = (id) => {
		setType("default")
		setMarkerID(id);
	}

	useEffect(() => {
		if (mapEvent !== null) {
			setHTML(mapEvent.html);
			setTitle(mapEvent.title);
		}
	}, [mapEvent])

	const cambiarCrear = () => {
		setCreate(!create)
	}

	const sendMarcador = async (x, y) => {
		const markerData = { x, y, type: "default", mapId: props.mapID };

		try {
			const marker = await addDoc(collection(db, "markers"), markerData);
			const eventData = { title: "", html: "", markerID: marker.id };
			await addDoc(collection(db, "events"), eventData);
			cambiarMarcadorACreado(marker.id)
			setUpdate(update + 1);
		} catch (error) {
			console.log(error.message)
			alert("¡Ha habido un error!");
		}
	}

	const sendHTML = async (title, html, type) => {
		if (markerID === null) {
			alert("¡NO has selecionnado un marcador!")
		} else if (html === null || title === "") {
			alert("¡Has dejado un campo VACÍO!")
		} else {
			const markerData = { title, html, markerID: markerID };

			try {
				await updateDoc(doc(db, "events", mapEvent.id), markerData);
				setUpdate(update + 1);
				await updateDoc(doc(db, "markers", markerID), { type: type });
				setUpdate(update + 1)
			} catch (error) {
				console.log(error.message)
				alert("¡Ha habido un error!");
			}
		}
	}

	return (
		<div className="pl-4 pr-4">
			<button className="mb-4 d-block" onClick={cambiarCrear}>Añadir Marcador</button>
			<div>
				<MapComponent sendMarcador={sendMarcador} changeMarker={changeMarker} create={create} setCreate={setCreate} id={props.mapID} update={update}
					changeHTML={setHTML} changeTitle={setTitle} changeType={setType} mapEvent={mapEvent}></MapComponent>
			</div>
			<div className="mt-5">
				<Writer sendHTML={sendHTML} html={html} title={title} type={type}></Writer>
			</div><br /><br />
			<button onClick={() => { window.location.href = "/ver/" + props.mapaID }}>Finalizar</button>
		</div>
	);
}

export default Creating2nd;
