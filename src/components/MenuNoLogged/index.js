import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

function MenuNoLogged(props) {

    const [location, setLocation] = useLocation();

    return (<ul>
        <li><a href="#" onClick={() => {setLocation("/")}}>Inicio</a></li>
        <li><a href="#" onClick={() => {setLocation("/session")}}>Iniciar Sesión</a></li>
        </ul>
    )
}

export default MenuNoLogged;