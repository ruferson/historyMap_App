import React, { useState } from "react";
import IniciarSesion from '../../components/IniciarSesion'
import Registrarse from "../../components/Registrarse";
import { useLocation } from "wouter";
import Footer from "../../components/Footer";

function Session() {

    const [location, setLocation] = useLocation();
    const [modo, setModo] = useState("login")

    function sesiones(mode) {
        if (mode === "login") {
            return <IniciarSesion></IniciarSesion>
        } else {
            return <Registrarse></Registrarse>
        }
    }

    return (<div id="main">
        <div className="pl-4 pr-4">
            <button className="text-center mb-4" onClick={() => setModo("login")}>Iniciar sesión</button>
            <button className="text-center mb-4" onClick={() => setModo("singup")}>Registrarse</button>
            {sesiones(modo)}
        </div>
        <Footer />
    </div>
    );
}

export default Session;