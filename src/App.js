
import './css/main.css';
import Ver from './Pages/Ver';
import Crear from './Pages/Crear';
import User from './Pages/User';
import { Route, useLocation } from 'wouter';
import Session from './Pages/Session';
import { useEffect, useState } from 'react';
import Cabezera from './components/Cabezera';
import MisMapas from './Pages/MisMapas';
import Editar from './Pages/Editar';
import Inicio from './Pages/Inicio';
import Publicos from './Pages/Publicos';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebaseConfig';


function App() {

    const [isActive, setActive] = useState(true)
    const [location, setLocation] = useLocation();
		
		onAuthStateChanged(auth, (currentUser) => {
			if (!currentUser) {
				if (location !== "/session" && location !== "/") {
        	setLocation("/session");
				}
			}
		})

    return (
        <div className="fondo">
            <div id="wrapper">
                <Cabezera isActive={isActive} setActive={setActive} />
                <Route
                    component={Inicio}
                    path="/">
                </Route>
                <Route
                    component={Publicos}
                    path="/publicos">
                </Route>
                <Route
                    component={MisMapas}
                    path="/misMapas">
                </Route>
                <Route
                    component={User}
                    path="/perfil">
                </Route>
                <Route
                    component={Session}
                    path="/session">
                </Route>
                <Route
                    component={Ver}
                    path="/ver/:id">
                </Route>
                <Route
                    component={Editar}
                    path="/editar/:id">
                </Route>
                <Route
                    component={Crear}
                    path="/crear">
                </Route>
            </div>
        </div>
    );
}

export default App;
