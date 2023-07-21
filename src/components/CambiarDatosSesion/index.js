import { updateEmail, updatePassword } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { Form, Input, Label } from 'reactstrap';

import { auth, db } from '../../firebase/firebaseConfig';

const CambiarDatosSesion = () => {


	const [msg, setMsg] = useState("")
	const [nameErr, setNameErr] = useState("")
	const [emailErr, setEmailErr] = useState("")
	const [passwdErr, setPasswdErr] = useState("");


	const onSubmitHandler = async (e) => {
		e.preventDefault();
		setMsg("")
		if (validateForm()) {
			const name = document.getElementById("name").value;
			const email = document.getElementById("email").value;
			const password = document.getElementById("password").value;

			const userData = { name: name, email };

			try {
				await updateEmail(auth, email);
				await updatePassword(auth, password);
				await updateDoc(doc(db, "users", auth.currentUser.uid), userData);
			} catch (error) {
				console.log(error.message)
			}
		} else {
			setMsg("Hay errores en el formulario")
		}
	};


	const validateName = (name) => {
		let reNombre = /(-?([A-Z].\s)?([A-Z][a-z]+)\s?)+([A-Z]'([A-Z][a-z]+))?/g;
		if (reNombre.test(name)) {
			setNameErr("")
			return true;
		} else {
			setNameErr("El nombre no es correcto.")
			return false;
		}
	}

	const validateEmail = (email) => {
		let reEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
		if (reEmail.test(email)) {
			setEmailErr("")
			return true;
		} else {
			setEmailErr("El e-mail no es correcto.")
			return false;
		}
	}

	const validatePassword = (password) => {
		let reContraseña = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
		if (reContraseña.test(password)) {
			setPasswdErr("")
			return true;
		} else {
			setPasswdErr("La contraseña necesita al menos: 8 caracteres, 1 letra mayúscula, y 1 letra minúscula.")
			return false;
		}
	}

	const validateForm = () => {
		let name = document.getElementById("name").value;
		let email = document.getElementById("email").value;
		let password = document.getElementById("password").value;

		return validateName(name) && validateEmail(email) && validatePassword(password);
	}


	return (
		<div>
			<Form method="post" name="formulario" onSubmit={validateForm}>
				<Label for="name">Nombre Completo: </Label>
				<Input
					type="name"
					name="name"
					id="name"
					placeholder="name completo"
				/>
				<p className="text-danger font-italic">{nameErr}</p>
				<Label for="email">E-Mail: </Label>
				<Input
					type="email"
					name="email"
					id="email"
					placeholder="correo electrónico"
				/>
				<p className="text-danger font-italic">{emailErr}</p>
				<Label for="password">Contraseña: </Label>
				<Input
					type="password"
					name="password"
					id="password"
					placeholder="password"
				/>
				<p className="text-danger font-italic">{passwdErr}</p>
				<p className="text-danger font-weight-bold">{msg}</p>
				<button
					className="text-center mb-4"
					onClick={onSubmitHandler}
				>
					Guardar Cambios
				</button>
			</Form>
		</div>
	);
}

export default CambiarDatosSesion;