import React from "react";
import { useLocation } from "wouter";
import Footer from "../../components/Footer";
import MapasPublicos from "../../components/MapasPublicos";

function Publicos () {

    const [location, setLocation] = useLocation();

    if (localStorage.getItem("isLoggedIn") === "false") {
        setLocation("/session")
    }

    return (<div id="main">
        <div className="pr-4 pl-4">
            <h1>Mapas Públicos</h1><br/>
            <MapasPublicos/>
        </div>
        <Footer />
        </div>
    );
  }

  export default Publicos;