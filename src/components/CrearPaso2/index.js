import React, { useEffect, useState } from 'react';
import Mapa from '../Mapa';
import Escribir from '../Escribir';
import { Button } from 'reactstrap';
import Footer from '../Footer';
import axios from "axios";

function CrearPaso2(props) {

    const [crear, setCrear] = useState(false);
    const [eventoID, setEventoID] = useState(null);
    console.log(props.mapaID)

    function cambiarEvento(event){
        let id = event.target.options.id;
        if (!id<2){
            id=2;
        }  
        setEventoID(id);
    }

    function cambiarCrear(){
        setCrear(!crear)
        console.log(crear)
    }

    function sendMarcador(x, y){
        let data = JSON.stringify({ "x":x, "y":y, "tipo": "default", "mapa_id": props.mapaID });
        console.log(data)
        axios
            .post("http://history.test:8000/api/marcadores", 
                data
            , {
                headers: {
                    'Authorization': JSON.parse(localStorage.getItem("userToken")).token_type+" "+JSON.parse(localStorage.getItem("userToken")).access_token,
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                console.log(response);
                if (response.status === 201) {
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function sendHTML(titulo, html, tipo){
        if (eventoID===null){
            alert("¡NO has selecionnado un marcador!")
        } else if (html=== null || titulo==="") {
            alert("¡Has dejado un campo VACÍO!")
        } else {
            let data = JSON.stringify({ "titulo": titulo, "html": html, "marcador_id": eventoID });

            axios
            .post("http://history.test:8000/api/eventos", 
                data
            , {
                headers: {
                    'Authorization': JSON.parse(localStorage.getItem("userToken")).token_type+" "+JSON.parse(localStorage.getItem("userToken")).access_token,
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                console.log(response);
                if (response.status === 201) {
                }
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }

   return (
        <div className="row">
        <div className="col-12 pl-4 pr-4 pt-3">
            <Button className="float-left btn-success mr-5" onClick={cambiarCrear}>Añadir Marcador</Button>
            
            <div className="">
                <Mapa sendMarcador={sendMarcador} cambiarEvento={cambiarEvento} crear={crear} setCrear={setCrear}></Mapa>
            </div> 
            <div className="">
                <Escribir sendHTML={sendHTML}></Escribir>
            </div><br/><br/>
        </div>
            <Footer/>
        </div>
    );
}

export default CrearPaso2;
