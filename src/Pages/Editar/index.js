import React, { useEffect, useState } from 'react';
import { Input, Label } from 'reactstrap';
import axios from "axios";
import useEvento from 'hooks/useEvento';
import Mapa from 'components/Mapa';
import Escribir from 'components/Escribir';
import Footer from 'components/Footer';
import useMapa from 'hooks/useMapa';

function Editar(props) {

    const { mapaDatos, loading } = useMapa(props.params.id)
    const [mapaID, setMapaID] = useState(0)
    const [crear, setCrear] = useState(false);
    const [marcadorID, setMarcadorID] = useState(null);
    const [update, setUpdate] = useState(0);
    const [html, setHTML] = useState();
    const [titulo, setTitulo] = useState()
    const [tipo, setTipo] = useState("default")
    const { evento, loadingEvent } = useEvento(marcadorID, update);
    const [esPrivado, setEsPrivado] = useState(false)
    const [nombre, setNombre] = useState("")

    function cambiarMarcador(event) {
        setUpdate(update + 1)
        setTipo(event.target.options.tipo)
        setMarcadorID(event.target.options.id);
    }

    function cambiarMarcadorACreado(id) {
        setTipo("default")
        setMarcadorID(id);
    }

    useEffect(() => {
        if (!loading) {
            setMapaID(mapaDatos.data.id)
            setNombre(mapaDatos.data.nombre)
        }
    }, [loading])

    useEffect(() => {
        if (evento !== null) {
            setHTML(evento.data.html);
            setTitulo(evento.data.titulo);
        }
    }, [evento])

    function cambiarCrear() {
        setCrear(!crear)
    }

    function sendMarcador(x, y) {
        let data = JSON.stringify({ "x": x, "y": y, "tipo": "default", "mapa_id": mapaID });
        
        axios
            .post("http://history.test:8000/api/marcadores",
                data
                , {
                    headers: {
                        'Authorization': JSON.parse(localStorage.getItem("userToken")).token_type + " " + JSON.parse(localStorage.getItem("userToken")).access_token,
                        'Content-Type': 'application/json'
                    }
                })
            .then((response) => {
                if (response.status === 201) {
                    cambiarMarcadorACreado(response.data.data.id)
                    let data2 = JSON.stringify({ "titulo": "", "html": "", "marcador_id": response.data.data.id });
                    axios
                        .post("http://history.test:8000/api/eventos",
                            data2
                            , {
                                headers: {
                                    'Authorization': JSON.parse(localStorage.getItem("userToken")).token_type + " " + JSON.parse(localStorage.getItem("userToken")).access_token,
                                    'Content-Type': 'application/json'
                                }
                            })
                        .then((response) => {
                            if (response.status === 201) {
                                setUpdate(update + 1)
                            } else {
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                            alert("¡Ha habido un error!")
                        });
                }
            })
            .catch((error) => {
                console.log(error);
                alert("¡Ha habido un error!")
            });
    }

    function sendHTML(titulo, html, type) {
        if (marcadorID !== null) {
            let data = JSON.stringify({ "titulo": titulo, "html": html, "marcador_id": marcadorID });
            axios
                .put("http://history.test:8000/api/eventos/" + evento.data.id,
                    data
                    , {
                        headers: {
                            'Authorization': JSON.parse(localStorage.getItem("userToken")).token_type + " " + JSON.parse(localStorage.getItem("userToken")).access_token,
                            'Content-Type': 'application/json'
                        }
                    })
                .then((response) => {
                    if (response.status === 201) {
                        setUpdate(update + 1)
                    }
                })
                .catch((error) => {
                });
            axios
                .put("http://history.test:8000/api/marcadores/" + marcadorID,
                    { tipo: type }
                    , {
                        headers: {
                            'Authorization': JSON.parse(localStorage.getItem("userToken")).token_type + " " + JSON.parse(localStorage.getItem("userToken")).access_token,
                            'Content-Type': 'application/json'
                        }
                    })
                .then((response) => {
                    if (response.status === 200) {
                        setUpdate(update + 1)
                    }
                })
                .catch((error) => {
                    console.log(error);
                    alert("¡Ha habido un error!")
                });
        }
        axios
            .put("http://history.test:8000/api/mapas/" + mapaID,
                {
                    privado: esPrivado,
                    nombre: nombre
                }
                , {
                    headers: {
                        'Authorization': JSON.parse(localStorage.getItem("userToken")).token_type + " " + JSON.parse(localStorage.getItem("userToken")).access_token,
                        'Content-Type': 'application/json'
                    }
                })
            .then((response) => {
                if (response.status === 200) {
                }
            })
            .catch((error) => {
                console.log(error);
                alert("¡Ha habido un error!")
            });

    }

    function onChangeNombre(event) {
        setNombre(event.target.value)
    }

    return (<div id="main">
        <div className="row">
            <div className="col-12 pl-4 pr-4">
                <button className=" mb-4" onClick={cambiarCrear}>Añadir Marcador</button>
                <div>
                    <Mapa sendMarcador={sendMarcador} cambiarMarcador={cambiarMarcador} crear={crear} setCrear={setCrear} id={mapaID} update={update}
                        changeHTML={setHTML} changeTitulo={setTitulo} changeTipo={setTipo} evento={evento}></Mapa>
                </div> <br /><br />
                <div>
                    <Label for="nombre"><h1>Nombre del Mapa:</h1></Label>
                    <Input
                        type="text"
                        name="nombre"
                        id="nombre"
                        placeholder="nombre"
                        value={nombre}
                        onChange={onChangeNombre}
                    /><br />
                    <h2>Privado:</h2><br />
                    <label class="switch" id="switch">
                        <input type="checkbox" onChange={() => { setEsPrivado(!esPrivado) }} />
                        <span class="slider round"></span>
                    </label> <br /><br /><br />
                </div>
                <div className="">
                    <Escribir sendHTML={sendHTML} html={html} titulo={titulo} tipo={tipo} esEdicion={true}></Escribir>
                </div><br /><br />
                <button onClick={() => { window.location.href = "/ver/" + mapaID }}>Finalizar</button>
            </div>
        </div>
        <Footer />
    </div>
    );
}

export default Editar;
