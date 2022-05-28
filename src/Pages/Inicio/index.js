
import React from "react";
import { useLocation } from "wouter";
import Footer from "../../components/Footer";
import "./styles.css";
import { Button } from "reactstrap";

function Inicio () {

    const [location, setLocation] = useLocation();


    return (<>
        <div className="pl-4 pr-4 pt-3 text-white">
            <h1>Inicio</h1><br/>
            <h3>¡Bienvenido a HistoryMap!</h3><br/>
            <p>En esta pequeña red social podrás crear tus propios mapas con tus propios marcadores y eventos.</p>
            <p>¿Te gustaría marcar dónde ocurrieron los eventos más importantes de tu vida?</p>
            <p>¿Te gustaría ayudar a tus alumnos a comprender mejor los más importantes eventos históricos?</p>
            <p>¡Crea tu propio mapa ya!</p>
            {localStorage.getItem("isLoggedIn") !== "false" ? <Button onClick={()=>{setLocation("/crear")}}>Crear Mapa Nuevo</Button> : <Button onClick={()=>{setLocation("/session")}}>Iniciar Sesión</Button>}
        </div>
        <div className=""><Footer /></div>
        </>
    );
  }

  export default Inicio;