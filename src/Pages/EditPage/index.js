import { addDoc, collection, doc, updateDoc } from '@firebase/firestore';
import Footer from 'components/Footer';
import MapComponent from 'components/MapComponent';
import Writer from 'components/Writer';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import useMap from 'hooks/useMap';
import useMarker from 'hooks/useMarker';
import React, { useEffect, useState } from 'react';
import { Input, Label } from 'reactstrap';
import { useLocation } from 'wouter';

import { auth, db, storage } from '../../firebase/firebaseConfig';

const EditPage = (props) => {

	const [location, setLocation] = useLocation();
	const [create, setCreate] = useState(false);
	const [markerID, setMarkerID] = useState(null);
	const [update, setUpdate] = useState(0);
	const { mapData, loading } = useMap(props.params.id, update)
	const [html, setHTML] = useState();
	const [title, setTitle] = useState()
	const [type, setType] = useState("default")
	const { markerData } = useMarker(markerID);
	const [isPrivate, setIsPrivate] = useState(false)
	const [name, setName] = useState("")
	const mapID = props.params.id;

	useEffect(() => {
		if (!loading && mapData) {
			if (mapData.uid !== auth.currentUser.uid) {
				setLocation("/")
			}
			setName(mapData.name)
			setIsPrivate(mapData.private)
		}
	}, [mapData, loading]);

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

	const changeCreate = () => {
		setCreate(!create)
	}

	const sendMarker = async (x, y) => {
		const markerData = { x, y, type: "default", title: "", html: "", mapID: props.params.id, uid: auth.currentUser.uid };
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

	const sendMapData = async () => {
		const img = document.getElementById("img").files[0];
		let updateData = {};
		try {
			if (img) {
				const imgStorageRef = ref(storage, img.name);
				await uploadBytes(imgStorageRef, img, { customMetadata: { mapID } });
				updateData.imgUrl = await getDownloadURL(imgStorageRef);
			}
			if (isPrivate) {
				updateData.private = isPrivate;
			}
			if (name) {
				updateData.name = name;
			}
			await updateDoc(doc(db, "maps", mapID), updateData);

			setUpdate(update + 1)
		} catch (error) {
			console.log(error.message)
			alert("¡Ha habido un error!");
		}
	}

	const onChangeName = (event) => {
		setName(event.target.value)
	}

	return (
		<div id="main">
			<div className="row">
				<div className="col-12 pl-4 pr-4">
					<button className=" mb-4" onClick={changeCreate}>Añadir Marcador</button>
					<div>
						<MapComponent sendMarker={sendMarker} changeMarker={changeMarker} create={create} setCreate={setCreate} id={mapID} update={update}
							changeHTML={setHTML} changeTitulo={setTitle} changeTipo={setType} markerData={markerData}></MapComponent>
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
							type="file"
							name="img"
							id="img"
						/><br />
						<h2>Privado:</h2><br />
						<label class="switch" id="switch">
							<input type="checkbox" onChange={() => { setIsPrivate(!isPrivate) }} checked={isPrivate} />
							<span class="slider round"></span>
						</label> <br /> <br />
					</div>
					<button onClick={() => { sendMapData() }}>Guardar</button>
					<button className='float-right' onClick={() => { setLocation("/ver/" + mapID) }}>Ver Mapa</button>
					<br />
					<br />
					<hr />
					<div className="">
						<label for="writer"><h1>Marcador Seleccionado</h1></label>
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
