import { Button } from "reactstrap";
import CambiarDatosSesion from '../CambiarDatosSesion'
import './styles.css'

function ConfigUsuario () {

    function action() {
        localStorage.setItem('isLoggedIn', false)
        window.location.href = "/session";
    }
    
    return (
        <div className="config">
            <h1 className="text-white">Configuración de Usuario</h1><br/>
            <CambiarDatosSesion></CambiarDatosSesion><br/>
            <Button onClick={()=>action()}>Cerrar sesión</Button>
        </div>
    );

   }

   export default ConfigUsuario;