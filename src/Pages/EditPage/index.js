import { addDoc, collection, doc, updateDoc } from '@firebase/firestore';
import Footer from 'components/Footer';
import MapComponent from 'components/MapComponent';
import Writer from 'components/Writer';
import useEvento from 'hooks/useEvent';
import useMap from 'hooks/useMap';
import React, { useEffect, useState } from 'react';
import { Input, Label } from 'reactstrap';
import { useLocation } from 'wouter';

import { auth, db } from '../../firebase/firebaseConfig';

const EditPage = (props) => {

	const { mapData, loading } = useMap(props.params.id)
	const [location, setLocation] = useLocation();
	const [mapId, setMapId] = useState(props.params.id)
	const [create, setCreate] = useState(false);
	const [markerID, setMarkerID] = useState(null);
	const [update, setUpdate] = useState(0);
	const [html, setHTML] = useState();
	const [title, setTitle] = useState()
	const [type, setType] = useState("default")
	const { mapEvent, loadingEvent } = useEvento(markerID, update);
	const [isPrivate, setIsPrivate] = useState(false)
	const [name, setName] = useState("")
	const [img, setImg] = useState("");

	if (!loading) {
		if (mapData.userUid !== auth.currentUser.uid) {
			setLocation("/")
		}
	}

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
		if (!loading) {
			setName(mapData.name)
			setImg(mapData.imgUrl)
			setIsPrivate(mapData.private)
		}
	}, [loading])

	useEffect(() => {
		if (mapEvent !== null) {
			setHTML(mapEvent.html);
			setTitle(mapEvent.title);
		}
	}, [mapEvent])

	const changeCreate = () => {
		setCreate(!create)
	}

	const sendMarker = async (x, y) => {
		const markerData = { x, y, type: "default", mapId };

		try {
			const marker = await addDoc(collection(db, "markers"), markerData);
			const eventData = { title: "", html: "", markerID: marker.id };
			await addDoc(collection(db, "events"), eventData);
			changeMarkerToCreated(marker.id)
			setUpdate(update + 1);
		} catch (error) {
			console.log(error.message)
			alert("¡Ha habido un error!");
		}
	}

	const sendHTML = async (title, html, type) => {
		const eventData = { title, html, markerID };
		if (markerID === null) {
			alert("¡NO has selecionnado un marcador!")
		} else if (html === null || title === "") {
			alert("¡Has dejado un campo VACÍO!")
		} else {
			try {
				await updateDoc(doc(db, "events", mapEvent.id), eventData);
				setUpdate(update + 1);
				await updateDoc(doc(db, "markers", markerID), { type: type });
				setUpdate(update + 1)
			} catch (error) {
				console.log(error.message)
				alert("¡Ha habido un error!");
			}
		}
	}

	const sendMapData = async () => {
		if (validateURL(img)) {
			try {
				await updateDoc(doc(db, "maps", mapId), { private: isPrivate, imgUrl: img, name });
				setUpdate(update + 1)
			} catch (error) {
				console.log(error.message)
				alert("¡Ha habido un error!");
			}
		}
	}

	const onChangeName = (event) => {
		setName(event.target.value)
	}

	const onChangeImage = (event) => {
		setImg(event.target.value)
	}

	const validateURL = (url) => {
		let regex = /^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif|jfif))$/i;
		if (regex.test(url)) {
			return true;
		} else {
			alert("¡URL de imagen no válida!")
			return false;
		}
	}

	return (
		<div id="main">
			<div className="row">
				<div className="col-12 pl-4 pr-4">
					<button className=" mb-4" onClick={changeCreate}>Añadir Marcador</button>
					<div>
						<MapComponent sendMarker={sendMarker} changeMarker={changeMarker} create={create} setCreate={setCreate} id={mapId} update={update}
							changeHTML={setHTML} changeTitulo={setTitle} changeTipo={setType} mapEvent={mapEvent}></MapComponent>
					</div> <br /><br />
					<div>
						<Label for="name"><h1>Nombre del Mapa:</h1></Label>
						<Input
							type="text"
							name="name"
							id="name"
							placeholder="name"
							value={name}
							onChange={onChangeName}
						/><br />
						<Label for="name"><h1>URL de la imagen:</h1></Label>
						<Input
							type="text"
							name="img"
							id="img"
							placeholder="img"
							value={img}
							onChange={onChangeImage}
						/><br />
						<h2>Privado:</h2><br />
						<label class="switch" id="switch">
							<input type="checkbox" onChange={() => { setIsPrivate(!isPrivate) }} checked={isPrivate} />
							<span class="slider round"></span>
						</label> <br /> <br />
					</div>
					<button onClick={() => { sendMapData() }}>Guardar</button>
					<button className='float-right' onClick={() => { setLocation("/ver/" + mapId) }}>Ver Mapa</button>
					<br />
					<br />
					<hr />
					<div className="">
						<label for="writer"><h1>Evento Seleccionado</h1></label>
						<br />
						<br />
						<Writer sendHTML={sendHTML} html={html} title={title} type={type} esEdicion={true}></Writer>
					</div>
					<hr /><br /><br />
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default EditPage;
