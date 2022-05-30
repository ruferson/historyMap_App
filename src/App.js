
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
import Libres from './Pages/Libres';


function App() {

    const [isActive, setActive] = useState(true)
    const [isLogged, setIsLogged] = useState(localStorage.getItem("isLoggedIn") !== "true");

    useEffect(() => { setIsLogged(localStorage.getItem("isLoggedIn") !== "true"); console.log("para el menu " + isLogged) }, [localStorage.getItem("isLoggedIn")])

    return (
        <>
            <div id="wrapper">
                <Cabezera isActive={isActive} setActive={setActive} />
                <Route
                    component={Inicio}
                    path="/">
                </Route>
                <Route
                    component={Libres}
                    path="/libres">
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
        </>
    );
}

export default App;
