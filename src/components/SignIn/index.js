import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { Form, Input, Label } from 'reactstrap';

import { auth, db } from '../../firebase/firebaseConfig';
import { condicionesDeUsoText } from 'Pages/condicionesDeUsoText';

const Registrase = () => {

	const [msg, setMsg] = useState("")
	const [errorNombre, setErrorNombre] = useState("")
	const [errorEmail, setErrorEmail] = useState("")
	const [errorPswd, setErrorPswd] = useState("")
	const [acceptConditions, setAcceptConditions] = useState(false);

	const handleCheckboxChange = (e) => {
		setAcceptConditions(e.target.checked);
	};

	const onSubmitHandler = async (e) => {
		e.preventDefault();
		setMsg("")
		if (validateForm() && acceptConditions) {
			const name = document.getElementById("name").value
			const email = document.getElementById("email").value
			const password = document.getElementById("password").value

			try {
				const userData = { name: name, email }
				await createUserWithEmailAndPassword(auth, email, password);
				await setDoc(doc(db, "users", auth.currentUser.uid), userData);
				await signInWithEmailAndPassword(auth, email, password);
			} catch (error) {
				console.log(error.message)
				auth.signOut();
			}
		} else {
			setMsg("Hay errores en el formulario");
		}
	}


	const validateName = (name) => {
		let reNombre = /(-?([A-Z].\s)?([A-Z][a-z]+)\s?)+([A-Z]'([A-Z][a-z]+))?/g;
		if (reNombre.test(name)) {
			setErrorNombre("")
			return true;
		} else {
			setErrorNombre("El name no es correcto.")
			return false;
		}
	}
	const validateEmail = (email) => {
		let reEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
		if (reEmail.test(email)) {
			setErrorEmail("")
			return true;
		} else {
			setErrorEmail("El e-mail no es correcto.")
			return false;
		}
	}
	const validatePassword = (password) => {
		let reContraseña = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
		if (reContraseña.test(password)) {
			setErrorPswd("")
			return true;
		} else {
			setErrorPswd("La password necesita al menos: 8 caracteres, 1 letra mayúscula, y 1 letra minúscula.")
			return false;
		}
	}

	const validateForm = () => {
		let name = document.getElementById("name").value
		let email = document.getElementById("email").value
		let password = document.getElementById("password").value
		validateName(name);
		validateEmail(email);
		validatePassword(password);

		return validateName(name) && validateEmail(email) && validatePassword(password);
	}


	return (
		<div>
			<h1>Registrarse</h1>
			<br />
			<Form method="post" name="formulario" onSubmit={validateForm}>
				<Label for="name">Nombre Completo: </Label>
				<Input
					type="name"
					name="name"
					id="name"
					placeholder="name completo"
				/>
				<p className="text-warning">{errorNombre}</p>
				<Label for="email">E-Mail: </Label>
				<Input
					type="email"
					name="email"
					id="email"
					placeholder="correo electrónico"
				/>
				<p className="text-warning">{errorEmail}</p>
				<Label for="password">Contraseña: </Label>
				<Input
					type="password"
					name="password"
					id="password"
					placeholder="password"
				/>
				<p className="text-warning">{errorPswd}</p>
				<p className="text-danger">{msg}</p>
				<div
					style={{
						overflowY: 'auto',
						maxHeight: '200px',
						padding: '10px',
						border: '1px solid #ccc',
						marginBottom: '10px',
					}}
				>
					<pre>{condicionesDeUsoText}</pre>
				</div>
				<Input
					type="checkbox"
					id="checkboxCondiciones"
					checked={acceptConditions}
					onChange={handleCheckboxChange}
				/>
				<Label for="checkboxCondiciones">Acepto las condiciones de uso</Label>

				<button
					className="text-center mt-3 float-right"
					onClick={onSubmitHandler}
				>
					Registrarse
				</button>
			</Form>
		</div>
	);
}

export default Registrase;