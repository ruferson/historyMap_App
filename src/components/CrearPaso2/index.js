import React, { useEffect, useState } from 'react';
import Mapa from '../Mapa';
import Escribir from '../Escribir';
import { Button } from 'reactstrap';
import Footer from '../Footer';
import axios from "axios";
import useEvento from 'hooks/useEvento';

function CrearPaso2(props) {

    const [crear, setCrear] = useState(false);
    const [marcadorID, setMarcadorID] = useState(null);
    const [update, setUpdate] = useState(0);
    const [html, setHTML] = useState();
    const [titulo, setTitulo] = useState()
    const [tipo, setTipo] = useState()
    const { evento, loading } = useEvento(marcadorID, update);

    function cambiarMarcador(event){
        setUpdate(update+1)
        setTipo(event.target.options.tipo)
        setMarcadorID(event.target.options.id);
    }

    useEffect(() => {
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
            let correct=true;
            if (titulo !== null) {
                console.log("haciendo put")
                axios
                    .put("http://history.test:8000/api/eventos", 
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
                        } else {
                            correct=false;
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                console.log("haciendo post")
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
                            setUpdate(update+1)
                        } else {
                            correct=false;
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
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
                    } else {
                        correct=false;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
                
                console.log(correct)
                if (correct){
                    setUpdate(update+1)
                    alert("¡Has creado un evento!")
                }
            //mandar alerta de creado
        }
    }

    function alertaCreado(){
        return (
            <div class="alert alert-info alert-dismissible fade in notificacion">
                <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                <strong>¡Hecho!</strong> ¡Evento creado, y asignado al marcador seleccionado!
            </div>
        )
    }

   return (
        <div className="row">
        <div className="col-12 pl-4 pr-4 pt-3">
            <Button className="float-left btn-success mr-5" onClick={cambiarCrear}>Añadir Marcador</Button>
            
            <div className="">
                <Mapa sendMarcador={sendMarcador} cambiarMarcador={cambiarMarcador} crear={crear} setCrear={setCrear} id={props.mapaID} update={update}
                    changeHTML={setHTML} changeTitulo={setTitulo} changeTipo={setTipo}></Mapa>
            </div> 
            <div className="">
                <Escribir sendHTML={sendHTML} html={html} titulo={titulo} tipo={tipo}></Escribir>
            </div><br/><br/>
        </div>
            <Footer/>
        </div>
    );
}

export default CrearPaso2;
