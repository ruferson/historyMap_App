import React, { useEffect, useState } from 'react';
import Mapa from '../Mapa';
import Escribir from '../Escribir';
import Footer from '../Footer';
import axios from "axios";
import useEvento from 'hooks/useEvento';

function CrearPaso2(props) {

    const [crear, setCrear] = useState(false);
    const [marcadorID, setMarcadorID] = useState(null);
    const [update, setUpdate] = useState(0);
    const [html, setHTML] = useState();
    const [titulo, setTitulo] = useState()
    const [tipo, setTipo] = useState("default")
    const { evento, loading } = useEvento(marcadorID, update);

    function cambiarMarcador(event){
        setUpdate(update+1)
        setTipo(event.target.options.tipo)
        setMarcadorID(event.target.options.id);
    }

    function cambiarMarcadorACreado(id){
        setTipo("default")
        setMarcadorID(id);
    }

    useEffect(() => {
        console.log(evento)
        if (evento !== null){
            setHTML(evento.data.html);
            setTitulo(evento.data.titulo);
        }
    }, [evento])

    function cambiarCrear(){
        setCrear(!crear)
        console.log(crear)
    }

    function sendMarcador(x, y){
        let data = JSON.stringify({ "x":x, "y":y, "tipo": "default", "mapa_id": props.mapaID });
        console.log(data)
        console.log(localStorage.getItem("userData"))
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
                    cambiarMarcadorACreado(response.data.data.id)
                    let data2 = JSON.stringify({ "titulo": "", "html": "", "marcador_id":response.data.data.id });
                    console.log(data2)
                    axios
                        .post("http://history.test:8000/api/eventos", 
                            data2
                        , {
                            headers: {
                                'Authorization': JSON.parse(localStorage.getItem("userToken")).token_type+" "+JSON.parse(localStorage.getItem("userToken")).access_token,
                                'Content-Type': 'application/json'
                            }
                        })
                        .then((response) => {
                            console.log(response);
                            if (response.status === 201) {
                                setUpdate(update+1)
                            } else {
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function sendHTML(titulo, html, type){
        if (marcadorID===null){
            alert("¡NO has selecionnado un marcador!")
        } else if (html=== null || titulo==="") {
            alert("¡Has dejado un campo VACÍO!")
        } else {
            let data = JSON.stringify({ "titulo": titulo, "html": html, "marcador_id": marcadorID });
            axios
                .put("http://history.test:8000/api/eventos/"+evento.data.id, 
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
                        setUpdate(update+1)
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
            axios
                .put("http://history.test:8000/api/marcadores/"+marcadorID, 
                    {tipo: type}
                , {
                    headers: {
                        'Authorization': JSON.parse(localStorage.getItem("userToken")).token_type+" "+JSON.parse(localStorage.getItem("userToken")).access_token,
                        'Content-Type': 'application/json'
                    }
                })
                .then((response) => {
                    console.log(response);
                    if (response.status === 200) {
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

   return (
        <div className="pl-4 pr-4">
            <button className="float-left mb-4" onClick={cambiarCrear}>Añadir Marcador</button>
            
            <div>
                <Mapa sendMarcador={sendMarcador} cambiarMarcador={cambiarMarcador} crear={crear} setCrear={setCrear} id={props.mapaID} update={update}
                    changeHTML={setHTML} changeTitulo={setTitulo} changeTipo={setTipo} evento={evento}></Mapa>
            </div> 
            <div className="mt-5">
                <Escribir sendHTML={sendHTML} html={html} titulo={titulo} tipo={tipo}></Escribir>
            </div><br/><br/>
            <button onClick={() => {window.location.href = "/ver/"+props.mapaID}}>Finalizar</button>
        </div>
    );
}

export default CrearPaso2;
