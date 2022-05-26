import { Button } from "reactstrap";
import React, {  } from 'react';
import { useLocation } from "wouter";

function Notificacion(props) {

    const [location, setLocation] = useLocation();

    function switchType(){
        switch (props.noteName) {
            case "share":
                return "Invitación";
                break;
            case "message":
                return "Mensaje";
                break;
            default:
                return "ERROR"
                break;
        }
    }

    return (
        <div className="col-12 mb-2 text-left">
            <div className="card">
                <div className="card-body">
                {props.noteName==="share" ? <Button className="btn-primary float-right" onClick={()=>{setLocation(props.url)}}>Ver</Button> : <></>}
                    <h4 className="card-title">{switchType()}</h4>
                    <p className="card-text">{props.noteDesc}</p>
                </div>
            </div>
        </div>
    );
}

export default Notificacion;
