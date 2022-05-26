import useUsers from 'hooks/useUsers';
import React, { useEffect, useState } from 'react';
import { Form, FormSelect } from 'react-bootstrap';
import axios from "axios";
import { Input, Label, Button, Submit} from 'reactstrap';

function Compartir(props) {

    const [show, setShow] = useState(false)
    const { listaUsers, loading } = useUsers(show);

    function enviarInvitacion(){
        let id=document.getElementById("form").value
        axios
            .post("http://history.test:8000/api/notificaciones", {
                type: "share",
                description: "¡Has sido invitado al mapa "+props.mapName+"!",
                url: "http://history.test:3002/misMapas",
                idUsu: id,
            }, {
                headers: { Authorization: JSON.parse(localStorage.getItem("userToken")).token_type+" "+JSON.parse(localStorage.getItem("userToken")).access_token}
            })
            .then((response) => {
                console.log(response);
                if (response.status === 201) {
                    
                }
            })
            .catch((error) => {
                console.log(error);
                alert("¡Ha habido un error!")
            }); 
    }


    if(!loading){
        console.log(listaUsers.data)
    }

    function mapping(user, key){
        return <option key={key} value={user.id}>{user.name}</option>
    }

    function mapeoOptions(){
        if (!loading){
            return listaUsers.data.map(mapping)
        }
    }

    function elegirPersonita() {
        return (
            <div>
                <Form>
                <select multiple className="form-select" id="form">
                    {mapeoOptions()}
                </select> <br/>
                <Button className="btn-alert" onClick={enviarInvitacion}>Enviar invitación</Button>
                </Form><br/>
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
