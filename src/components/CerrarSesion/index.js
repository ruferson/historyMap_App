import { Button } from "reactstrap";
import { useLocation } from "wouter";

function CerrarSesion () {
    
    const [location, setLocation] = useLocation();

    function action() {
        localStorage.setItem('userData', JSON.stringify({"isLogged":false}))
        setLocation("/session")
    }
    
    return (
        <Button onClick={()=>action()}>Cerrar sesión</Button>
    );

   }

   export default CerrarSesion;