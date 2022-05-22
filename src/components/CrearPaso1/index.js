import React, { useState } from 'react';
import './styles.css'
import { Button, Input, Label } from 'reactstrap';
import Footer from '../Footer';
import axios from "axios";

function CrearPaso1(props) {

    const [esPrivado, setEsPrivado] = useState(false);

    function sendMapa(){
        let name = document.getElementById("nombre").value
        let img = document.getElementById("img").value
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
                        props.setMapaID(response.data.data.id)
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
            <Label className="radio-inline mr-5">
                <Input
                    type="radio"
                    name="privado"
                    id="privado"
                    defaultChecked
                    value={true}
                    onChange={() => {setEsPrivado(true)}}
                    className="pr-1"
                />
                Privado
            </Label>
            <Label className="radio-inline">
                <Input
                    type="radio"
                    name="privado"
                    id="privado"
                    value={false}
                    onChange={() => {setEsPrivado(false)}}
                    className="pr-1"
                />
                Público
            </Label><br/>
            <Button className="float-left btn-success" onClick={sendMapa}>Continuar</Button>
        </div>
                <div className="">
                    <Footer/>
                </div>
            </>
    );
}

export default CrearPaso1;
