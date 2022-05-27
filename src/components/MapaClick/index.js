import { Button } from "reactstrap";
import React, {  } from 'react';
import { useLocation } from "wouter";

function MapaClick(props) {

    const [location, setLocation] = useLocation();

    return (
        <div className="col-3 mb-3 text-center">
            <div className="card">
                <img className="card-img-top" src={props.mapImage} alt="Card image" />
                <div className="card-body">
                    <h4 className="card-title">{props.mapName}</h4>
                    <Button className="btn-primary" onClick={()=>{setLocation("/ver/"+props.mapID)}}>Ver</Button>
                    <Button className="btn-primary" onClick={()=>{setLocation("/editar/"+props.mapID)}}>Editar</Button>
                </div>
            </div>
        </div>
    );
}

export default MapaClick;
