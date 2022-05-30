import React from 'react';
import { useLocation } from 'wouter';
import ConfigUsuario from '../../components/ConfigUsuario'
import Footer from '../../components/Footer';

function User() {

    const [location, setLocation] = useLocation();

    if (localStorage.getItem("isLoggedIn") === "false") {
        setLocation("/session")
    }

    return (<div id="main">
        <div className="pl-4 pr-4">
            <ConfigUsuario />
        </div>
        <Footer/>
        </div>
    );
}

export default User;