import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import { useLocation } from 'wouter';

import { auth } from '../../firebase/firebaseConfig';


const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPasswd] = useState("");
	const [loading, setLoading] = useState(false);
	const [errMsg, setErrMsg] = useState("");

	function onEmailChange(e) {
		setEmail(e.target.value)
	}

	function onPasswdChange(e) {
		setPasswd(e.target.value)
	}

	const onSignInHandler = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			await signInWithEmailAndPassword(auth, email, password);
		} catch (error) {
			console.log(error.message)
			setErrMsg('¡Hay un error en los datos!')
			setLoading(false);
			auth.signOut();
		}
	};

	return (
		<div>
			<h1>Iniciar Sesión</h1>
			<br />
			<Form >
				<FormGroup>
					<Label for="email">E-Mail: </Label>
					<Input
						type="email"
						name="email"
						placeholder="correo electrónico"
						value={email}
						onChange={onEmailChange}
					/>
				</FormGroup>
				<FormGroup>
					<Label for="password">Contraseña: </Label>
					<Input
						type="password"
						name="password"
						placeholder="password"
						value={password}
						onChange={onPasswdChange}
					/>
				</FormGroup>
				<p className="text-danger">{errMsg}</p>
				<button
					className="text-center mb-4"
					onClick={onSignInHandler}
				>
					Iniciar sesión
					{loading ? (
						<span
							className="spinner-border spinner-border-sm ml-5"
							role="status"
							aria-hidden="true"
						></span>
					) : (
						<span></span>
					)}
				</button>
			</Form>
		</div>
	);
}

export default Login;