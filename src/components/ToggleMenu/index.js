import React from 'react';

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
        <button id="sidebarCollapse" type="button" onClick={() => {props.setActive(!props.isActive)}} className="btn btn-dark rounded-pill shadow-sm px-4 mb-4">
            {texto(props.isActive)}
        </button>
    );
}

export default ToggleMenu;

