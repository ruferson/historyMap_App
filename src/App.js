
import './App.css';
import Ver from './Pages/Ver';
import Crear from './Pages/Crear';
import User from './Pages/User';
import { Route, useLocation } from 'wouter';
import Session from './Pages/Session';
import Inicio from './Pages/Inicio';
import Menu from './components/Menu';
import MenuNoLogged from './components/MenuNoLogged';
import {  useEffect, useState } from 'react';
import Cabezera from './components/Cabezera';
import MisMapas from './Pages/MisMapas';


function App() {

  const [isActive, setActive] = useState(true)
  const [isLogged, setIsLogged] = useState(localStorage.getItem("isLoggedIn") !== "true");

  useEffect(() => {setIsLogged(localStorage.getItem("isLoggedIn") !== "true"); console.log("para el menu "+isLogged)}, [localStorage.getItem("isLoggedIn")])

  return (
    <div className="fondo">
      {!isLogged ? <Menu isActive={isActive}/> : <MenuNoLogged isActive={isActive}/>}
      
      <div className={"page-content "+isActive} id="content">
        <Cabezera isActive={isActive} setActive={setActive}/>
        <Route  
            component={Inicio}
            path="/">
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
            component={Crear}
            path="/crear">
        </Route>
      </div>
    </div>
  );
}

export default App;
