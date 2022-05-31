import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

function Menu(props) {

    const [location, setLocation] = useLocation();
        
        return (<ul>
            <li><a href="#" onClick={() => {setLocation("/")}}>Inicio</a></li>
            <li><a href="#" onClick={() => {setLocation("/publicos")}}>Mapas Públicos</a></li>
            <li><a href="#" onClick={() => {setLocation("/misMapas")}}>Mis Mapas</a></li>
            <li><a href="#" onClick={() => {setLocation("/perfil")}}>Perfil</a></li>
            <li><a href="#" onClick={() => {setLocation("/crear")}}>Crear mapa</a></li>
            </ul>
        )
}

export default Menu;