import React from 'react';
import { useLocation } from 'wouter';

import Footer from '../../components/Footer';
import { auth } from '../../firebase/firebaseConfig';
import logo from '../../img/logo.png';


const HomePage = () => {
	const [location, setLocation] = useLocation();

	return (
		<div id="main">
			<div className="pl-4 pr-4">
				<img className="d-none d-md-flex float-right logo" src={logo} />
				<h1>Inicio</h1><br />
				<h3>¡Bienvenido a HistoryMap!</h3><br />
				<p>En esta red social podrás crear tus propios mapas con tus propios marcadores y eventos.</p>
				<p>¿Te gustaría marcar dónde ocurrieron los eventos más importantes de tu vida?</p>
				<p>¿Te gustaría ayudar a tus alumnos a comprender mejor los más importantes eventos históricos?</p>
				<p>¡Crea tu propio mapa ya!</p>
				{!auth.currentUser ? <button onClick={() => { setLocation("/session") }}>Iniciar Sesión</button>
					: <button onClick={() => { setLocation("/crear") }}>Crear Mapa Nuevo</button>}
			</div>
			<div className="abajo"><Footer /></div>
		</div>
	);
}

export default HomePage;