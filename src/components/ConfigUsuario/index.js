import { useLocation } from "wouter";
import CambiarDatosSesion from '../CambiarDatosSesion'

function ConfigUsuario() {

    const [location, setLocation] = useLocation();

    function action() {
        localStorage.setItem('isLoggedIn', false)
        setLocation("/session")
    }

    return (<>
        <div className="row">
            <div className="col-sm-8 col-xs-12">
                <h4>¡Bienvenido, {JSON.parse(localStorage.getItem('userData')).user_name}!</h4>
            </div>
            <div className="col-sm-4 col-xs-12">
                <button className="d-none d-sm-block float-right" onClick={() => action()}>Cerrar sesión</button>
                <button className="d-sm-none" onClick={() => action()}>Cerrar sesión</button>
            </div>
        </div>
        <br />
        <h1 className="d-none d-sm-block">Configuración de Usuario</h1>
        <h2 className="d-sm-none">Configuración de Usuario</h2><br />
        <CambiarDatosSesion></CambiarDatosSesion>
    </>
    );

}

export default ConfigUsuario;