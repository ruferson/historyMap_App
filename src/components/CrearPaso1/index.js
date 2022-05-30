import React, { useState } from 'react';
import { Input, Label } from 'reactstrap';
import Footer from '../Footer';
import axios from "axios";
import './styles.css'

function CrearPaso1(props) {

    const [esPrivado, setEsPrivado] = useState(false);

    function validateURL(url) {
        let regex = /^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif|jfif))$/i;
        if (regex.test(url)) {
            return true;
        } else {
            alert("¡URL de imagen no válida!")
            return false;
        }
    }

    function sendMapa() {
        let name = document.getElementById("nombre").value
        let img = document.getElementById("img").value
        if (validateURL(img)) {
            if (name !== null && img !== null) {
                axios
                    .post("http://history.test:8000/api/mapas", {
                        nombre: name,
                        link_imagen: img,
                        usuario_id: JSON.parse(localStorage.getItem("userData")).user_id,
                        privado: esPrivado,
                    }, {
                        headers: {
                            'Authorization': JSON.parse(localStorage.getItem("userToken")).token_type + " " + JSON.parse(localStorage.getItem("userToken")).access_token,
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response) => {
                        if (response.status === 201) {
                            props.setMapaID(response.data.data.id)
                            props.setPaso(2)
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        alert("¡Ha habido un error!")
                    });
            } else {
                alert("¡Uno de los datos está vacío!")
            }
        }
    }

    return (<>
        <div className="centrado text-center pl-4 pr-4 pt-3">
            <Label for="nombre"><h2>Nombre del Mapa:</h2></Label>
            <Input
                type="text"
                name="nombre"
                id="nombre"
                placeholder="nombre"
            /> <br />
            <Label for="img"><h2>URL de imagen:</h2></Label>
            <Input
                type="text"
                name="img"
                id="img"
                placeholder="url"
            /> <br />
            <Label for="switch"><h2>Privado:</h2></Label> <br/>
            <label class="switch" id="switch">
                <input type="checkbox" onChange={() => { setEsPrivado(!esPrivado) }} />
                <span class="slider round"></span>
            </label> <br/>
            <button className="float-left" onClick={sendMapa}>Continuar</button>
        </div>
    </>
    );
}

export default CrearPaso1;
