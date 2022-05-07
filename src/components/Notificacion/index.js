import { Button } from "reactstrap";
import React, {  } from 'react';
import { useLocation } from "wouter";

function Notificacion(props) {

    const [location, setLocation] = useLocation();

    return (
        <div className="col-12 text-left">
            <div className="card">
                <div className="card-body">
                <Button className="btn-primary float-right" onClick={()=>{setLocation(props.url)}}>Ver</Button>
                    <h4 className="card-title">{props.noteName}</h4>
                    <p className="card-text">{props.noteDesc}</p>
                </div>
            </div>
        </div>
    );
}

export default Notificacion;
