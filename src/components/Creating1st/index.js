import './styles.css';

import { auth, db } from '../../firebase/firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { Input, Label } from 'reactstrap';

const Creating1st = (props) => {

	const [isPrivate, setIsPrivate] = useState(false);

	const validateURL = (url) => {
		const regex = /^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif|jfif))$/i;
		if (regex.test(url)) {
			return true;
		} else {
			alert("¡URL de imagen no válida!")
			return false;
		}
	}

	const sendMapa = async () => {
		const name = document.getElementById("name").value;
		const img = document.getElementById("img").value;

		if (validateURL(img)) {
			if (name !== null && img !== null) {

				try {
					const mapData = {
						imgUrl: img,
						name: name,
						private: isPrivate,
						userUid: auth.currentUser.uid,
					}
					const map = await addDoc(collection(db, "maps"), mapData);
					props.setMapID(map.id);
					props.setPaso(2);
				} catch (error) {
					console.log(error.message)
				}
			} else {
				alert("¡Uno de los datos está vacío!")
			}
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
					type="text"
					name="img"
					id="img"
					placeholder="url"
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
