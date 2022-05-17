import { Button } from "reactstrap";
import { useLocation } from "wouter";
import useMisMapas from "../../hooks/useMisMapas";
import MapaClick from "../MapaClick";
import ToggleMenu from "../ToggleMenu";
import logo from '../../img/logo.png'

function Cabezera (props) {
        
    function getLocalization(){
        return "INICIO";
    }

    console.log(JSON.parse(localStorage.getItem("userData")).content.user_name)

    return (
        <div className="cabezera ">
            <div className="pt-5 pl-3">
                <ToggleMenu isActive={props.isActive} setActive={props.setActive} />
            </div>
            <a href="/"><img src={logo} className="float-right logo"/></a><br/>
            <p>¡Bienvenido, {localStorage.getItem("isLoggedIn") === "true" ? JSON.parse(localStorage.getItem("userData")).content.user_name : "invitado"}!</p>
            <h1 className="pl-5 pb-4">{getLocalization()}</h1>
        </div>
    );

   }

   export default Cabezera;