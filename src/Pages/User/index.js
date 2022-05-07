import React, { useState } from 'react';
import './styles.css';
import { useLocation } from 'wouter';
import { Button } from 'reactstrap';
import MisNotificaciones from '../../components/MisNotificaciones'
import ConfigUsuario from '../../components/ConfigUsuario'
import { Badge } from 'react-bootstrap';
import Footer from '../../components/Footer';

function User() {

    const [location, setLocation] = useLocation();
    const [modo, setModo] = useState("invitaciones");
   
    if (!JSON.parse(localStorage.getItem("userData")).isLogged){
        setLocation("/session")
    }

    function segunModo(){
        switch (modo) {
            case "invitaciones":
                return <MisNotificaciones />
            case "configUsuario":
                return <ConfigUsuario />
            default: break;
        }
    }

    function serAlumno(){
        localStorage.setItem("userData", JSON.stringify({ "name":"Rubén", "edad":"19", "rol": "alumno", "user_id":1, "isLogged":true, "token": "2|mgpxgVPCgmIs2HWvkfck8bcYD6fZx3AWQElIWVwx"}));
    }

    function serProfesor(){
        localStorage.setItem("userData", JSON.stringify({ "name":"Rubén", "edad":"19", "rol": "profesor", "user_id":1, "isLogged":true, "token": "2|mgpxgVPCgmIs2HWvkfck8bcYD6fZx3AWQElIWVwx"}));
    }

    return (<>
        <div className="pl-4 pr-4 pt-3">
            <Button onClick={serAlumno}>Ser alumno</Button>
            <Button onClick={serProfesor}>Ser profesor</Button>
            <div className="row">
                <div className="col-12">
                    <p>¡Bienvenido, {JSON.parse(localStorage.getItem("userData")).name}!</p>
                </div>
                <div className="ml-3">
                    <Button onClick={()=>setModo("invitaciones")}>Invitaciones <Badge>{/*getInvitaciones*/}1</Badge></Button>
                </div>
                <div className="ml-3">
                    <Button onClick={()=>setModo("configUsuario")}>Configuración de Usuario</Button>
                </div>
                <div className="col-6" />
            </div>
                {segunModo()}
        </div>
        <Footer/>
        </>
    );
}

export default User;