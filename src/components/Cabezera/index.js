import ToggleMenu from "../ToggleMenu";
import logo from '../../img/logo.png'

function Cabezera (props) {
       
    return (
        <div className="cabezera pb-3">
            <div className="pt-5 pl-3">
                <ToggleMenu isActive={props.isActive} setActive={props.setActive} />
            </div>
            <a href="/"><img src={logo} className="float-right logo"/></a><br/>
            <p className="pt-5 pl-3">¡Bienvenido, {localStorage.getItem("isLoggedIn") === "true" ? JSON.parse(localStorage.getItem("userData")).user_name : "invitado"}!</p>
        </div>
    );

   }

   export default Cabezera;