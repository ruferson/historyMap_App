import { Button } from "reactstrap";
import CambiarDatosSesion from '../CambiarDatosSesion'

function ConfigUsuario() {

    function action() {
        localStorage.setItem('isLoggedIn', false)
        window.location.href = "/session";
    }

    return (<>
        <div className="row">
            <div className="col-10">
                <h3>¡Bienvenido, {JSON.parse(localStorage.getItem('userData')).user_name}!</h3>
            </div>
            <div className="col-2">
                <button onClick={() => action()}>Cerrar sesión</button>
            </div>
        </div>
        <br />
        <h1>Configuración de Usuario</h1><br />
        <CambiarDatosSesion></CambiarDatosSesion>
    </>
    );

}

export default ConfigUsuario;