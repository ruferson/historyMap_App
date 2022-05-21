import React, {  } from 'react';
import './styles.css'
import { Button, Input, Label } from 'reactstrap';
import Footer from '../Footer';
import axios from "axios";

function CrearPaso1(props) {

    function sendMapa(){
        let name = document.getElementById("nombre").value
        let img = document.getElementById("img").value
        let esPrivado = document.getElementById("privado").value==="true" ? true : false;
        if (name!==null && img!==null) {
            axios
                .post("http://history.test:8000/api/mapas", {
                    nombre: name,
                    link_imagen: img,
                    usuario_id: JSON.parse(localStorage.getItem("userData")).user_id,
                    privado: esPrivado,
                }, {
                    headers: {
                        'Authorization': JSON.parse(localStorage.getItem("userToken")).token_type+" "+JSON.parse(localStorage.getItem("userToken")).access_token,
                        'Content-Type': 'application/json'
                    }
                })
                .then((response) => {
                    console.log(response);
                    if (response.status === 201) {
                        console.log(response.data.data.id)
                        props.setMapaID(response.data.id)
                        props.setPaso(2)
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            alert("¡Pon un nombre!")
        }
    }

   return (<>
        <div className="centrado text-center pl-4 pr-4 pt-3 text-white">
            <Label for="nombre"><h2>Nombre del Mapa:</h2></Label>
            <Input
                type="text"
                name="nombre"
                id="nombre"
                placeholder="nombre"
            /> <br/>
            <Label for="img"><h2>URL de imagen:</h2></Label>
            <Input
                type="text"
                name="img"
                id="img"
                placeholder="url"
            /> <br/>
            <label className="radio-inline pr-3">
                <input
                    type="radio"
                    name="privado"
                    id="privado"
                    checked
                    value={true}
                    className="pr-1"
                />
                Privado
            </label>
            <label className="radio-inline">
                <input
                    type="radio"
                    name="privado"
                    id="privado"
                    value={false}
                    className="pr-1"
                />
                Público
            </label><br/>
            <Button className="float-left btn-success" onClick={sendMapa}>Continuar</Button>
        </div>
                <div className="footer-abajo">
                    <Footer/>
                </div>
            </>
    );
}

export default CrearPaso1;
