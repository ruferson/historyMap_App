import { Button } from "reactstrap";
import { useLocation } from "wouter";
import useMisMapas from "../../hooks/useMisMapas";
import MapaClick from "../MapaClick";
import ToggleMenu from "../ToggleMenu";
import logo from '../../img/logo.png'

function Footer (props) {
    
    const [location, setLocation] = useLocation();
    

    return (
        <div className="footer mt-5">
            <h4 className="pt-4 text-center">Footer</h4>
        </div>
    );

   }

   export default Footer;