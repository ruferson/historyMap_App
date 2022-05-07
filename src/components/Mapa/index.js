import React, { useEffect, useState } from 'react';
import './styles.css';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import mockmapa1 from '../../mocks/map-1.json';
import useMarkers from '../../hooks/useMarkers';
import warIcon from '../../img/war.png'
import birthIcon from '../../img/birth.png'
import deathIcon from '../../img/death.png'
import constructionIcon from '../../img/construction.png'
import discoveryIcon from '../../img/discovery.png'
import defaultIcon from '../../img/default.png'
import L from 'leaflet'

function Mapa(props) {

    const [creando, setCreando] = useState(props.crear);
    const [myMarkers, setMyMarkers] = useState([])
    //const [myMarkers, setMyMarkers] = useMarkers(1);
    const [selectedPosition, setSelectedPosition] = useState("hola");

    function aniadirMarcador() {
        let marcadores=myMarkers;
        marcadores.push([selectedPosition, "construction"])
        setMyMarkers(marcadores)
    }
    useEffect(aniadirMarcador, [selectedPosition])

    function cambiarCreando(){
        setCreando(props.crear)
    }
    useEffect(cambiarCreando, [props.crear])

    function ponerMarcadores() {
        let marcadores=[];
        for(let i=0; i<Object.keys(mockmapa1.records).length;i++){
            let array = [[mockmapa1.records[i].x, mockmapa1.records[i].y], mockmapa1.records[i].tipo, mockmapa1.records[i].id]
            marcadores.push(array);
        }
        setMyMarkers(marcadores);
    }
    useEffect(ponerMarcadores, []);

    const Markers = () => {
        const map = useMapEvents({
            click(e) {      
                if (creando){                          
                    setSelectedPosition([
                        e.latlng.lat,
                        e.latlng.lng
                    ]);
                    props.sendMarcador(e.latlng.lat, e.latlng.lng)
                    props.setCrear(false);
                }
            },          
        })
        
        return null
    }

    function LocationMarker(marcador, key) {
        let position = marcador[0];
        let myIcon = L.icon({
            iconUrl: defaultIcon,
            iconRetinaUrl: defaultIcon,
            iconAnchor: [5, 55],
            popupAnchor: [10, -44],
            iconSize: [30, 30],
          });
        switch (marcador[1]){
            case "war":
                myIcon = L.icon({
                    iconUrl: warIcon,
                    iconRetinaUrl: warIcon,
                    iconAnchor: [5, 55],
                    popupAnchor: [10, -44],
                    iconSize: [30, 30],
                });
                break;
            case "birth":
                myIcon = L.icon({
                    iconUrl: birthIcon,
                    iconRetinaUrl: birthIcon,
                    iconAnchor: [5, 55],
                    popupAnchor: [10, -44],
                    iconSize: [30, 30],
                });
                break;
            case "discovery":
                myIcon = L.icon({
                    iconUrl: discoveryIcon,
                    iconRetinaUrl: discoveryIcon,
                    iconAnchor: [5, 55],
                    popupAnchor: [10, -44],
                    iconSize: [30, 30],
                });
                break;
            case "death":
                myIcon = L.icon({
                    iconUrl: deathIcon,
                    iconRetinaUrl: deathIcon,
                    iconAnchor: [5, 55],
                    popupAnchor: [10, -44],
                    iconSize: [30, 30],
                });
                break;
            case "construction":
                myIcon = L.icon({
                    iconUrl: constructionIcon,
                    iconRetinaUrl: constructionIcon,
                    iconAnchor: [5, 55],
                    popupAnchor: [10, -44],
                    iconSize: [30, 30],
                });
                break;
            default:
                myIcon = L.icon({
                    iconUrl: defaultIcon,
                    iconRetinaUrl: defaultIcon,
                    iconAnchor: [5, 55],
                    popupAnchor: [10, -44],
                    iconSize: [30, 30],
                });
                break;
        }
        return position === null ? null : (
          <div>
            <Marker id={marcador[2]} eventHandlers={{ click: props.cambiarEvento }} key={key} position={position} icon={myIcon}>
                <Popup>
                    <h3>{marcador[1]}</h3>
                </Popup>
            </Marker>
          </div>
        )
      }

      function mapeoMarcadores() {
          return myMarkers.map(LocationMarker)
      }

    const position = [40.193795, -3.851789]

    return (
        <div>
        <MapContainer center={position} zoom={2} >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Markers/>
            {mapeoMarcadores()}
        </MapContainer>
        </div>
    );
}

export default Mapa;
