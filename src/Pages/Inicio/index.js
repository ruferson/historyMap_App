import React, {  } from "react";
import { Button } from "reactstrap";
import { useLocation } from "wouter";
import Footer from "../../components/Footer";
import MapasPublicos from "../../components/MapasPublicos";
import "./styles.css";

function Inicio () {

    const [location, setLocation] = useLocation();
    localStorage.setItem("userData", JSON.stringify({ "name":"Rubén", "edad":"19", "rol": "alumno", "user_id":1,  "isLogged":true}));


    return (<>
        <div className="pl-4 pr-4 pt-3">
            <h1 className="text-white">Mapas públicos</h1><br/>
            <MapasPublicos/>
            {/**Aquí iría un mapeo de los mapas públicos pero no todos, unos 15 o así. */}
        </div>
        <div className="footer-abajo"><Footer /></div>
        </>
    );
  }

  export default Inicio;