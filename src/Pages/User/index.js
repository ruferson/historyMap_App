import React, { useState } from 'react';
import { useLocation } from 'wouter';
import ConfigUsuario from '../../components/ConfigUsuario'
import Footer from '../../components/Footer';

function User() {

    const [location, setLocation] = useLocation();
    /*const [modo, setModo] = useState("invitaciones");
    const [notificaciones, setNotificaciones] = useState("...");*/
    
    if (localStorage.getItem("isLoggedIn") === "false") {
        setLocation("/session")
    }

    /*function segunModo(){
        switch (modo) {
            case "invitaciones":
                return <MisNotificaciones setNotificaciones={setNotificaciones}/>
            case "configUsuario":
                return <ConfigUsuario />
            default: break;
        }
    }

    return (<>
        <div className="pl-4 pr-4 pt-3">
            <div className="row">
                <div className="ml-3">
                    <Button onClick={()=>setModo("invitaciones")}>Notificaciones <Badge>{notificaciones}</Badge></Button>
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
    );*/

    return (<div id="main">
        <div className="pl-4 pr-4">
            <ConfigUsuario />
        </div>
        <Footer/>
        </div>
    );
}

export default User;