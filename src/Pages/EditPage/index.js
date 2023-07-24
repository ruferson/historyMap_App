import Writer from 'components/Writer';
import Footer from 'components/Footer';
import MapComponent from 'components/MapComponent';
import useEvento from 'hooks/useEvent';
import useMapa from 'hooks/useMap';
import React, { useEffect, useState } from 'react';
import { Input, Label } from 'reactstrap';
import { useLocation } from 'wouter';
import { addDoc, collection, doc, updateDoc } from '@firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

const EditPage = (props) => {

	const { mapData, loading } = useMapa(props.params.id)
	const [location, setLocation] = useLocation();
	const [mapID, setMapID] = useState(props.params.id)
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
		if (mapData.data.usuario_id !== JSON.parse(localStorage.getItem("userData")).user_id) {
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
			setMapID(mapData.data.id)
			setName(mapData.data.name)
			setImg(mapData.data.link_imagen)
		}
	}, [loading])

	useEffect(() => {
		if (mapEvent !== null) {
			setHTML(mapEvent.data.html);
			setTitle(mapEvent.data.title);
		}
	}, [mapEvent])

	const changeCreate = () => {
		setCreate(!create)
	}

	const sendMarker = async (x, y) => {
		const markerData = { x, y, type: "default", mapId: mapID };

		try {
			const markerID = await addDoc(collection(db, "markers"), markerData).id;
			const eventData = { title: "", html: "", markerID };
			await addDoc(collection(db, "events"), eventData);
			changeMarkerToCreated(markerID)
			setUpdate(update + 1);
		} catch (error) {
			console.log(error.message)
			alert("¡Ha habido un error!");
		}
	}

	const sendHTML = async (title, html, type) => {
		if (validateURL(img)) {
			if (markerID === null) {
				alert("¡NO has selecionnado un marcador!")
			} else if (html === null || title === "") {
				alert("¡Has dejado un campo VACÍO!")
			} else {
				const markerData = { title, html, markerID: markerID };

				try {
					await updateDoc(doc(db, "events", mapEvent.data.id), markerData);
					setUpdate(update + 1);
					await updateDoc(doc(db, "markers", markerID), { type: type });
					setUpdate(update + 1)
					await updateDoc(doc(db, "maps", mapID), { private: isPrivate, imgUrl: img, name });
				} catch (error) {
					console.log(error.message)
					alert("¡Ha habido un error!");
				}
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
						<MapComponent sendMarker={sendMarker} changeMarker={changeMarker} create={create} setCreate={setCreate} id={mapID} update={update}
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
							<input type="checkbox" onChange={() => { setIsPrivate(!isPrivate) }} />
							<span class="slider round"></span>
						</label> <br /><br /><br />
					</div>
					<div className="">
						<Writer sendHTML={sendHTML} html={html} title={title} type={type} esEdicion={true}></Writer>
					</div><br /><br />
					<button onClick={() => { window.location.href = "/ver/" + mapID }}>Finalizar</button>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default EditPage;
