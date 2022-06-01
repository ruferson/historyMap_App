import useMapa from 'hooks/useMapa';
import React, { } from 'react';
import { useLocation } from "wouter";

function MapaClick(props) {

    const [location, setLocation] = useLocation();
    const { mapaDatos, loading } = useMapa(props.mapID)

    return (<>
        <div className="col-4 mb-3 text-center d-none d-lg-flex">
            <div className="card">
                <div>
                    <img className="card-img-top" src={props.mapImage} alt="Card image" />
                </div>
                <div className="card-body">
                    <h4 className="card-title">{props.mapName}</h4>
                    <button onClick={() => { setLocation("/ver/" + props.mapID) }}>Ver</button>
                    {!loading ? mapaDatos.data.usuario_id === JSON.parse(localStorage.getItem("userData")).user_id
                        ? <button onClick={() => { setLocation("/editar/" + props.mapID) }}>Editar</button>
                        : <></> : <></>}
                </div>
            </div>
        </div>
        <div className="col-6 mb-3 text-center d-lg-none">
            <div className="card">
                <div className="">
                    <img className="card-img-top" src={props.mapImage} alt="Card image" />
                </div>
                <div className="card-body">
                    <p className="card-title">{props.mapName}</p>
                    <button className="button" onClick={() => { setLocation("/ver/" + props.mapID) }}>Ver</button>
                    {!loading ? mapaDatos.data.usuario_id === JSON.parse(localStorage.getItem("userData")).user_id
                        ? <button className="button" onClick={() => { setLocation("/editar/" + props.mapID) }}>Editar</button>
                        : <></> : <></>}
                </div>
            </div>
        </div>
    </>);
}

export default MapaClick;
