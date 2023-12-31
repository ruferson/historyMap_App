import { addDoc, collection } from 'firebase/firestore';
import useUserList from 'hooks/useUserList';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Button } from 'reactstrap';

import { db } from '../../firebase/firebaseConfig';

const Share = (props) => {

	const [show, setShow] = useState(false)
	const { userList, loading } = useUserList(show);

	const sendInvitation = async () => {
		let id = document.getElementById("form").value;

		try {
			const notData = {
				description: "¡Has sido invitado al mapa " + props.mapName + "!",
				type: "share",
				uid: id,
				url: "www.google.es", // TODO: Cambiar la URL por la que es.
			};
			await addDoc(collection(db, "notifications"), notData);
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
			return userList.map(mapping)
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
			<Button className="float-left btn-success" onClick={() => { setShow(!show) }} dataTo>Share</Button>
			<br /><br /><br />
			{show && elegirPersonita()}
		</>
	);
}

export default Share;
