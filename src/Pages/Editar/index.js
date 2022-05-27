import React, { useEffect, useState } from 'react';
import { Button, Input, Label } from 'reactstrap';
import axios from "axios";
import { Redirect, useLocation } from 'wouter';
import useEvento from 'hooks/useEvento';
import Mapa from 'components/Mapa';
import Escribir from 'components/Escribir';
import Footer from 'components/Footer';
import useMapa from 'hooks/useMapa';

function Editar(props) {

    const [location, setLocation] = useLocation();
    const { mapaDatos, loading }  = useMapa(props.params.id)
    const [ mapaID, setMapaID ] = useState(0)
    const [crear, setCrear] = useState(false);
    const [marcadorID, setMarcadorID] = useState(null);
    const [update, setUpdate] = useState(0);
    const [html, setHTML] = useState();
    const [titulo, setTitulo] = useState()
    const [tipo, setTipo] = useState("default")
    const { evento, loadingEvent } = useEvento(marcadorID, update);
    const [privado, setPrivado] = useState(1)
    const [nombre, setNombre] = useState("")

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
        if(!loading){
            setMapaID(mapaDatos.data.id)
            setNombre(mapaDatos.data.nombre)
            console.log(mapaID)
        }
    }, [loading])

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
        let data = JSON.stringify({ "x":x, "y":y, "tipo": "default", "mapa_id": mapaID });
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
        let correct;
        if (marcadorID!==null){
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
                    } else {
                        correct=false;
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
                    } else {
                        correct=false;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
            axios
                .put("http://history.test:8000/api/mapas/"+mapaID, 
                    {privado: privado,
                    nombre: nombre}
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
            //mandar alerta de creado
        
    }

    function alertaCreado(){
        return (
            <div class="alert alert-info alert-dismissible fade in notificacion">
                <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                <strong>¡Hecho!</strong> ¡Evento creado, y asignado al marcador seleccionado!
            </div>
        )
    }

    function esPrivate(){
        if (!loading){
        return mapaDatos.data.privado === 1 ? true : false;
        } else {
            return false;
        }
    }

    function onChangeNombre(event) {
        setNombre(event.target.value)
    }

   return (
        <div className="row">
        <div className="col-12 pl-4 pr-4 pt-3">
            <Button className="float-left btn-success mr-5" onClick={cambiarCrear}>Añadir Marcador</Button>
            
            <div className="">
                <Mapa sendMarcador={sendMarcador} cambiarMarcador={cambiarMarcador} crear={crear} setCrear={setCrear} id={mapaID} update={update}
                    changeHTML={setHTML} changeTitulo={setTitulo} changeTipo={setTipo} evento={evento}></Mapa>
            </div> <br/><br/>
            <div className="ml-4 text-white">
            <Label for="nombre"><h1 className="text-white">Nombre del Mapa:</h1></Label>
                <Input
                    type="text"
                    name="nombre"
                    id="nombre"
                    placeholder="nombre"
                    value={nombre}
                    onChange={onChangeNombre}
                /><br/>
                <h2 className="text-white">Tipo:</h2><br/>
                <div className="ml-4 ">
            <Label className="radio-inline mr-5"> 
                <Input
                    type="radio"
                    name="privado"
                    id="privado"
                    defaultChecked={esPrivate}
                    value={true}
                    onChange={() => {setPrivado(1)}}
                    className="pr-1"
                />
                Privado
            </Label>
            <Label className="radio-inline">
                <Input
                    type="radio"
                    name="privado"
                    id="privado"
                    defaultChecked={esPrivate}
                    value={false}
                    onChange={() => {setPrivado(0)}}
                    className="pr-1"
                />
                Público
            </Label></div><br/><br/>
            </div>
            <div className="">
                <Escribir sendHTML={sendHTML} html={html} titulo={titulo} tipo={tipo} esEdicion={true}></Escribir>
            </div><br/><br/>
            <Button onClick={() => {window.location.href = "/ver/"+mapaID}}>Finalizar</Button>
        </div>
            <Footer/>
        </div>
    );
}

export default Editar;
