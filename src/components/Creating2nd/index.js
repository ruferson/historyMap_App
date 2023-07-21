import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import useMap from 'hooks/useMap';
import React, { useEffect, useState } from 'react';

import { auth, db } from '../../firebase/firebaseConfig';
import MapComponent from '../MapComponent';
import Writer from '../Writer';
import useMarker from 'hooks/useMarker';

const Creating2nd = (props) => {

	const [create, setCreate] = useState(false);
	const [markerID, setMarkerID] = useState(null);
	const [update, setUpdate] = useState(0);
	const [html, setHTML] = useState();
	const [title, setTitle] = useState()
	const [type, setType] = useState("default")
	const { markerData, loadingMarker } = useMarker();

	const changeMarker = (event) => {
		setUpdate(update + 1)
		setType(event.target.options.type)
		setMarkerID(event.target.options.id);
	}

	const changeMarkerToCreated = (id) => {
		setType("default")
		setMarkerID(id);
	}

	useEffect(() => {
		if (markerData) {
			setHTML(markerData.html);
			setTitle(markerData.title);
		}
	}, [markerData])

	const cambiarCrear = () => {
		setCreate(!create)
	}

	const sendMarker = async (x, y) => {
		const markerData = { x, y, type: "default", title: "", html: "", mapID: props.mapID, uid: auth.currentUser.uid };
		try {
			const markerRef = await addDoc(collection(db, "markers"), markerData);
			changeMarkerToCreated(markerRef.id)
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
			try {
				await updateDoc(doc(db, "markers", markerID), { type: type, title, html, uid: auth.currentUser.uid });
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
				<MapComponent sendMarker={sendMarker} changeMarker={changeMarker} create={create} setCreate={setCreate} id={props.mapID} update={update}
					changeHTML={setHTML} changeTitle={setTitle} changeType={setType} markerData={markerData}></MapComponent>
			</div>
			<div className="mt-5">
				<Writer sendHTML={sendHTML} html={html} title={title} type={type}></Writer>
			</div><br /><br />
			<button onClick={() => { window.location.href = "/ver/" + props.mapID }}>Finalizar</button>
		</div>
	);
}

export default Creating2nd;
