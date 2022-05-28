import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

function MenuNoLogged(props) {

    const [location, setLocation] = useLocation();
    /*const [selected, setSelected] = useState(["", "", "", ""])

    function cambiarSelect (){
        switch (location){
            case "/":
                setSelected(["select", ""])
                break;
            case "/session":
                setSelected(["", "select"])
                break;
            default:
                setSelected(["", ""])
                break;
        }
    }
    useEffect(cambiarSelect, [location])
    
    return (<>
        
        <div className={"vertical-nav "+props.isActive} id="sidebar">
            <div className="py-4 px-3 mb-1">
                <div className="media d-flex align-items-center">
                    <div className="media-body">
                        <h1 className="m-0 float-right">Menú</h1>
                    </div>
                </div>
            </div>

            <ul className="nav flex-column mb-0">
                <li className="nav-item border-top" onClick={() => {setLocation("/")}}>
                <span className={"nav-link text-white cursor-link hover-select "+selected[0]}>
                            <i className="fa mr-3 fa-fw"></i>
                            <strong className="h3">Inicio</strong>
                        </span>
                </li>
                <li className="nav-item border-top"  onClick={() => {setLocation("/session")}}>
                <span className={"nav-link text-white cursor-link hover-select "+selected[1]}>
                            <i className="fa mr-3 fa-fw"></i>
                            <strong className="h3">Iniciar Sesión</strong>
                        </span>
                </li>
            </ul>
        </div>
        </>
    );*/

    return (<ul>
        <li><a href="#" onClick={() => {setLocation("/")}}>Inicio</a></li>
        <li><a href="#" onClick={() => {setLocation("/session")}}>Iniciar Sesión</a></li>
        </ul>
    )
}

export default MenuNoLogged;