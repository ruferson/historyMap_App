import React, { useState } from 'react';
import { useLocation } from 'wouter';

import Footer from '../../components/Footer';
import LogIn from '../../components/LogIn';
import SignIn from '../../components/SignIn';

const Session = () => {
	const [modo, setModo] = useState("login")

	function sesiones(mode) {
		if (mode === "login") {
			return <LogIn></LogIn>
		} else {
			return <SignIn></SignIn>
		}
	}

	return (
		<div id="main">
			<div className="pl-4 pr-4">
				<button className="text-center mb-4" onClick={() => setModo("login")}>Iniciar sesión</button>
				<button className="text-center mb-4" onClick={() => setModo("singup")}>Registrarse</button>
				{sesiones(modo)}
			</div>
			<Footer />
		</div>
	);
}

export default Session;