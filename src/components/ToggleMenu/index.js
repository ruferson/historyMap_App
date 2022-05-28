import React from 'react';
import './styles.css'

function ToggleMenu(props) {

    function texto(activo){
        if (!activo){
            return (
                <small className="text-uppercase font-weight-bold">Abrir Menú</small>
            )
        } else {
            return (
                <small className="text-uppercase font-weight-bold">Cerrar Menú</small>
            )
        }
    }
    
    return (
        <label class="switch" id="sidebarCollapse">
            <input type="checkbox" defaultChecked  onClick={() => {props.setActive(!props.isActive)}} />
            <span class="slider"></span>
        </label>
    );
}

export default ToggleMenu;

