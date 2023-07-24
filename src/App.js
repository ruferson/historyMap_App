import './css/main.css';

import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Route, useLocation } from 'wouter';

import Header from './components/Header';
import { auth } from './firebase/firebaseConfig';
import CreatePage from './Pages/CreatePage';
import EditPage from './Pages/EditPage';
import HomePage from './Pages/HomePage';
import MyMapsPage from './Pages/MyMapsPage';
import PublicMapsPage from './Pages/PublicMapsPage';
import SessionPage from './Pages/SessionPage';
import UserPage from './Pages/UserPage';
import ViewPage from './Pages/ViewPage';
import Ajax from 'components/Ajax';



function App() {

	const [isActive, setActive] = useState(true)
	const [location, setLocation] = useLocation();
	const [loading, setLoading] = useState(true);

	onAuthStateChanged(auth, (currentUser) => {
		if (!currentUser) {
			if (location !== "/session" && location !== "/") {
				setLocation("/session");
			}
		} else {
			if (location === "/session") {
				setLocation("/");
			}
		}
		setLoading(false);
	})

	return loading
		? (
			<div className="fondo">
				<div id="wrapper">
					<Ajax></Ajax>
				</div>
			</div>
		)
		: (
			<div className="fondo">
				<div id="wrapper">
					<Header isActive={isActive} setActive={setActive} />
					<Route
						component={HomePage}
						path="/">
					</Route>
					<Route
						component={PublicMapsPage}
						path="/publicos">
					</Route>
					<Route
						component={MyMapsPage}
						path="/misMapas">
					</Route>
					<Route
						component={UserPage}
						path="/perfil">
					</Route>
					<Route
						component={SessionPage}
						path="/session">
					</Route>
					<Route
						component={ViewPage}
						path="/ver/:id">
					</Route>
					<Route
						component={EditPage}
						path="/editar/:id">
					</Route>
					<Route
						component={CreatePage}
						path="/crear">
					</Route>
				</div>
			</div>
		);
}

export default App;
