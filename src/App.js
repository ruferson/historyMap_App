
import './App.css';
import Ver from './Pages/Ver';
import Crear from './Pages/Crear';
import User from './Pages/User';
import { Route } from 'wouter';
import Session from './Pages/Session';
import Inicio from './Pages/Inicio';
import Menu from './components/Menu';
import {  useState } from 'react';
import Cabezera from './components/Cabezera';
import MisMapas from './Pages/MisMapas';


function App() {

  const [isActive, setActive] = useState(true)

  return (
    <div className="fondo">
      <Menu isActive={isActive}/>
      
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
