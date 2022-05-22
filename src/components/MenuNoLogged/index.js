import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import './styles.css'

function MenuNoLogged(props) {

    const [location, setLocation] = useLocation();
    const [selected, setSelected] = useState(["", "", "", ""])

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
                <li className="nav-item border-top"  onClick={() => {setLocation("/session")}}>
                <span className={"nav-link text-white cursor-link hover-select "+selected[1]}>
                            <i className="fa mr-3 fa-fw"></i>
                            <strong className="h3">Iniciar Sesión</strong>
                        </span>
                </li>
            </ul>
        </div>
        </>
    );
}

export default MenuNoLogged;