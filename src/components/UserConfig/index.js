import Ajax from 'components/Ajax';
import useUser from 'hooks/useUser';
import { useLocation } from 'wouter';

import { auth } from '../../firebase/firebaseConfig';
import ChangeSessionData from '../ChangeSessionData';

const UserConfig = () => {
	const { user, loading } = useUser(auth.currentUser.uid);
	const [location, setLocation] = useLocation();

	const signOut = () => {
		setLocation('/');
		auth.signOut();
	}

	return (
		<>
			{!loading
				?
					<>
						<div className="row">
							<div className="col-sm-8 col-xs-12">
								<h4>¡Bienvenido, {user.name}!</h4>
							</div>
							<div className="col-sm-4 col-xs-12">
								<button className="d-none d-sm-block float-right" onClick={() => signOut()}>Cerrar sesión</button>
								<button className="d-sm-none" onClick={() => signOut()}>Cerrar sesión</button>
							</div>
						</div>
						<br />
						<h1 className="d-none d-sm-block">Configuración de Usuario</h1>
						<h2 className="d-sm-none">Configuración de Usuario</h2><br />
						<ChangeSessionData></ChangeSessionData>
					</>
				: <Ajax></Ajax>
			}
		</>
	);
}

export default UserConfig;