import { Button } from "reactstrap";
import React, {  } from 'react';
import { useLocation } from "wouter";

function MapaClick(props) {

    const [location, setLocation] = useLocation();

    return (
        <div className="col-3 text-center">
            <div className="card">
                <img className="card-img-top" src={props.mapImage} alt="Card image" />
                <div className="card-body">
                    <h4 className="card-title">{props.mapName}</h4>
                    <p className="card-text">{props.mapDesc}</p>
                    <Button className="btn-primary" onClick={()=>{setLocation("/ver/"+(Math.round(Math.random()*(3-1)+1)))}}>Ver</Button>
                </div>
            </div>
        </div>
    );
}

export default MapaClick;
