import React, { useEffect, useState } from 'react';
import './styles.css';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import mockmapa1 from '../../mocks/map-1.json';

function Mapa(props) {


    const [myMarkers, setMyMarkers] = useState(props.myMarkers)

    function LocationMarker(marcador, key) {
        let position = marcador[0];
        console.log("mapeando"+position)
        return position === null ? null : (
          <div>
            <Marker id={key} eventHandlers={{ click: props.cambiarEvento }} key={key} position={position}>
                <Popup>
                    <h1>{marcador[2]}</h1>
                    <br></br>
                    {marcador[1]}
                </Popup>
            </Marker>
          </div>
        )
      }

    return myMarkers.map(LocationMarker);
}

export default Mapa;
