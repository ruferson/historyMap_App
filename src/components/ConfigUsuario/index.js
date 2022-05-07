import { Button } from "reactstrap";
import { useLocation } from "wouter";
import CambiarDatosSesion from '../CambiarDatosSesion'
import './styles.css'

function ConfigUsuario () {
    
    const [location, setLocation] = useLocation();

    function action() {
        localStorage.setItem('userData', JSON.stringify({"isLogged":false}))
        setLocation("/session")
    }
    
    return (
        <div className="config">
            <h1>Configuración de Usuario</h1><br/>
            <CambiarDatosSesion></CambiarDatosSesion><br/>
            <Button onClick={()=>action()}>Cerrar sesión</Button>
        </div>
    );

   }

   export default ConfigUsuario;