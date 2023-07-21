import './styles.css';

import { auth, db, storage } from '../../firebase/firebaseConfig';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { Input, Label } from 'reactstrap';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const Creating1st = (props) => {

	const [isPrivate, setIsPrivate] = useState(false);

	const sendMapa = async () => {
		const name = document.getElementById("name").value;
		const img = document.getElementById("img").files[0];

		if (name !== null && img !== null) {

			try {
				const mapData = {
					name: name,
					private: isPrivate,
					uid: auth.currentUser.uid,
				}
				const map = await addDoc(collection(db, "maps"), mapData);
				const mapID = map.id;
				props.setMapID(mapID);

				const imgStorageRef = ref(storage, img.name);
				await uploadBytes(imgStorageRef, img, { customMetadata: { mapID } });
				const imgUrl = await getDownloadURL(imgStorageRef);
				await updateDoc(doc(db, 'maps', mapID), { imgUrl })

				props.setPaso(2);
			} catch (error) {
				console.log(error.message)
			}
		} else {
			alert("¡Uno de los datos está vacío!")
		}
	}

	return (
		<>
			<div className="centrado text-center pl-4 pr-4 pt-3">
				<Label for="name"><h2>Nombre del Mapa:</h2></Label>
				<Input
					type="text"
					name="name"
					id="name"
					placeholder="name"
				/> <br />
				<Label for="img"><h2>URL de imagen:</h2></Label>
				<Input
					type="file"
					name="img"
					id="img"
				/> <br />
				<Label for="switch"><h2>Privado:</h2></Label> <br />
				<label class="switch" id="switch">
					<input type="checkbox" onChange={() => { setIsPrivate(!isPrivate) }} />
					<span class="slider round"></span>
				</label> <br />
				<button className="float-left" onClick={sendMapa}>Continuar</button>
			</div>
		</>
	);
}

export default Creating1st;
