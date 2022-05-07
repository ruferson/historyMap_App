import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Input, Label, Button, Submit} from 'reactstrap';

function Compartir(props) {

    const [show, setShow] = useState(false)


    function validateUsername(name){
        let reNombre = /^[a-z0-9_-]{3,15}$/;
        if (reNombre.test(name)){
            return true;
        } else {
            return false;
        }
      }
      function validateEmail(email){
        let reEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
        if (reEmail.test(email)){
            return true;
        } else {
            return false;
        }
      }

    function enviarInvitacion(e){
        e.preventDefault();
        let existe=true;
        let username=document.getElementById("username").value
        if (validateEmail(username)){
            //Validar que existe el correo.
            console.log("Es un correo electrónico")
        } else if (validateUsername(username)){
            //Validar que existe el usuario
            //Devolver el correo
            username="correo@gmail.com"
            console.log("Es un nombre de usuario")
        } else {
            existe=false;
            alert("¡Nombre o e-mail no válido!")
        }

        let idUsu=2

        if (existe){
            let XHRdeNOTIFICACION = new XMLHttpRequest();
            let url = "enviarNotificacion";
        
            // open a connection
            XHRdeNOTIFICACION.open("POST", url, true);

            // Set the request header i.e. which type of content you are sending
            XHRdeNOTIFICACION.setRequestHeader("Content-Type", "application/json");

            // Converting JSON data to string
            let data = JSON.stringify({ "type":"invitacion", "description":"¡Has sido invitado al mapa "+props.mapName+"!", "url":"/ver/"+props.mapaID, "idUsu":idUsu});

            console.log(data);  

            // Sending data with the request
            XHRdeNOTIFICACION.send(data);
        }


    }

    function elegirPersonita() {
        return (
            <div>
                <Form>
                <Label for="nombre"><strong>Nombre de usuario / Correo electrónico</strong></Label>
                <Input
                    type="text"
                    name="username"
                    id="username"
                    placeholder=""
                /> <br/>
                <Button className="float-right btn-alert" onClick={enviarInvitacion}>Enviar invitación</Button>
                </Form><br/><br/><br/>
            </div>
        )
    }

    return (<>
        <Button className="float-left btn-success" onClick={() => {setShow(!show)}} dataTo>Compartir</Button><br/><br/><br/>
        {show && elegirPersonita()}
        
        </>
    );
}

export default Compartir;
