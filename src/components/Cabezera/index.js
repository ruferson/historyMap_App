import { Button } from "reactstrap";
import { useLocation } from "wouter";
import useMisMapas from "../../hooks/useMisMapas";
import MapaClick from "../MapaClick";
import ToggleMenu from "../ToggleMenu";
import logo from '../../img/logo.png'

function Cabezera (props) {
    
    const [location, setLocation] = useLocation();
    
    function getLocalization(){
        return "INICIO";
    }

    return (
        <div className="cabezera ">
            <div className="pt-5 pl-3">
                <ToggleMenu isActive={props.isActive} setActive={props.setActive} />
            </div>
            <img src={logo} className="float-right logo"/><br/>
            <h1 className="pl-5 pb-4">{getLocalization()}</h1>
        </div>
    );

   }

   export default Cabezera;