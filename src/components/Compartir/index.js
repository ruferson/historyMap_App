import { addDoc, collection } from 'firebase/firestore';
import useUsers from 'hooks/useUsers';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Button } from 'reactstrap';

import { db } from '../../firebase/firebaseConfig';

const Compartir = (props) => {

	const [show, setShow] = useState(false)
	const { userList, loading } = useUsers(show);

	const sendInvitation = async () => {
		let id = document.getElementById("form").value;

		try {
			const mapData = {
				description: "¡Has sido invitado al mapa " + props.mapName + "!",
				type: "share",
				uidUser: id,
				url: "www.google.es", // TODO: Cambiar la URL por la que es.
			};
			await addDoc(collection(db, "notifications"), mapData);
		} catch (error) {
			console.log(error.message);
			alert('¡Ha habido un error!');
		}
	}

	const mapping = (user, key) => {
		return <option key={key} value={user.id}>{user.name}</option>
	}

	const mapeoOptions = () => {
		if (!loading) {
			return userList.data.map(mapping)
		}
	}

	const elegirPersonita = () => {
		return (
			<div>
				<Form>
					<select multiple className="form-select" id="form">
						{mapeoOptions()}
					</select> <br />
					<Button className="btn-alert" onClick={sendInvitation}>Enviar invitación</Button>
				</Form><br />
			</div>
		)
	}

	return (
		<>
			<Button className="float-left btn-success" onClick={() => { setShow(!show) }} dataTo>Compartir</Button>
			<br /><br /><br />
			{show && elegirPersonita()}
		</>
	);
}

export default Compartir;
