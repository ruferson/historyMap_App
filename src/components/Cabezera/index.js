import MenuNoLogged from "components/MenuNoLogged";
import Menu from "components/Menu";
import { useLocation } from "wouter";
import { auth } from "../../firebase/firebaseConfig";

const Cabezera = () => {

	const [location, setLocation] = useLocation();

	return (
		<>
			<header className="d-none d-lg-flex" id="header">
				<h1><a href="#" onClick={() => { setLocation("/") }}>HistoryMap</a></h1>
				<nav className="links">
					{auth.currentUser ? <Menu /> : <MenuNoLogged />}
				</nav>
			</header>
			<div className="d-lg-none"> {/* TODO: Meter en un componente. */}
				<header id="header">
					<h1><a href="#" onClick={() => { setLocation("/") }}>HistoryMap</a></h1>
				</header>
				<div id="menu">
					<ul className="links">
						<li>
							<a href="#" onClick={() => { setLocation("/") }}>
								<h3>Inicio</h3>
							</a>
						</li>
						{!auth.currentUser ?
							<li>
								<a href="#">
									<h3>Iniciar Sesión</h3>
								</a>
							</li> : <>
								<li>
									<a href="#" onClick={() => { setLocation("/publicos") }}>
										<h3>Mapas Públicos</h3>
									</a>
								</li>
								<li>
									<a href="#" onClick={() => { setLocation("/misMapas") }}>
										<h3>Mis Mapas</h3>
									</a>
								</li>
								<li>
									<a href="#" onClick={() => { setLocation("/perfil") }}>
										<h3>Perfil</h3>
									</a>
								</li>
								<li>
									<a href="#" onClick={() => { setLocation("/crear") }}>
										<h3>Crear mapa</h3>
									</a>
								</li>
							</>}
					</ul>
				</div>
			</div>
		</>
	)

}

export default Cabezera;