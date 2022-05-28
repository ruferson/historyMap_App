import MenuNoLogged from "components/MenuNoLogged";
import Menu from "components/Menu";
import { useLocation } from "wouter";

function Cabezera () {
       
    const [location, setLocation] = useLocation();

    /*return (
        <div className="cabezera pb-3">
            <div className="pt-5 pl-3">
                <ToggleMenu isActive={props.isActive} setActive={props.setActive} />
            </div>
            <a href="/"><img src={logo} className="float-right logo"/></a><br/>
            <p className="pt-5 pl-3">¡Bienvenido, {localStorage.getItem("isLoggedIn") === "true" ? JSON.parse(localStorage.getItem("userData")).user_name : "invitado"}!</p>
        </div>
    );*/

    return (<header id="header">
        <h1><a href="#" onClick={() => {setLocation("/")}}>HistoryMap</a></h1>
        <nav class="links">
            { localStorage.getItem("isLoggedIn") === "true" ? <Menu /> : <MenuNoLogged />}
        </nav> { localStorage.getItem("isLoggedIn") !== "true" ?
        <nav class="main">
            <ul>
                <li><a href="#">Iniciar Sesión</a></li>
            </ul>
        </nav> : <></>}
        </header>
    )

   }

   export default Cabezera;