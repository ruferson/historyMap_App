import React from "react";
import { useLocation } from "wouter";
import Footer from "../../components/Footer";
import MapasPublicos from "../../components/MapasPublicos";
import "./styles.css";

function Libres () {

    const [location, setLocation] = useLocation();

    if (localStorage.getItem("isLoggedIn") === "false") {
        setLocation("/session")
    }

    return (<>
        <div className="pl-4 pr-4 pt-3">
            <h1 className="text-white">Mapas Libres</h1><br/>
            <MapasPublicos/>
        </div>
        <div className=""><Footer /></div>
        </>
    );
  }

  export default Libres;