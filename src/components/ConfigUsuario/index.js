import CambiarDatosSesion from '../CambiarDatosSesion'
import { auth } from "../../firebase/firebaseConfig";

const ConfigUsuario = () => {

	return (
		<>
			<div className="row">
				<div className="col-sm-8 col-xs-12">
					<h4>¡Bienvenido, {auth.currentUser.displayName}!</h4>
				</div>
				<div className="col-sm-4 col-xs-12">
					<button className="d-none d-sm-block float-right" onClick={() => auth.signOut()}>Cerrar sesión</button>
					<button className="d-sm-none" onClick={() => auth.signOut()}>Cerrar sesión</button>
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