import React, { useState } from "react";
import { Form, Label, Input } from "reactstrap";
import axios from "axios";

function Registrase() {

    const [msg, setMsg] = useState("")
    const [errorNombre, setErrorNombre] = useState("")
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPswd, setErrorPswd] = useState("")
    const [redirect, setRedirect] = useState(false);


    function onSubmitHandler(e) {
        e.preventDefault();
        setMsg("")
        if (validateForm()) {
            let nombre = document.getElementById("name").value
            let email = document.getElementById("email").value
            let contraseña = document.getElementById("password").value
            let data = { "name": nombre, "email": email, "password": contraseña }

            axios
                .post(process.env.REACT_APP_BACKEND_URL+"/api/register",
                    data
                )
                .then((response) => {
                    let token;
                    if (response.status === 200) {
                        axios
                            .post(process.env.REACT_APP_BACKEND_URL+"/api/tokens/create", {
                                email: email,
                                password: contraseña,
                            })
                            .then((response) => {
                                if (response.status === 200) {
                                    localStorage.setItem("isLoggedIn", true);
                                    localStorage.setItem("userToken", JSON.stringify(response.data));
                                    token = JSON.stringify(response.data);
                                    axios
                                        .get(process.env.REACT_APP_BACKEND_URL+"/api/user", {
                                            headers: {
                                                'Authorization': JSON.parse(token).token_type + " " + JSON.parse(token).access_token,
                                                'Content-Type': 'application/json'
                                            }
                                        })
                                        .then((response) => {
                                            if (response.status === 200) {
                                                localStorage.setItem("userData", JSON.stringify(response.data));
                                                setRedirect(true);
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
                })
                .catch((error) => {
                    console.log(error);
                    alert("¡Ha habido un error!")
                });
        } else {
            setMsg("Hay errores en el formulario")
        }
    };

    if (redirect) {
        window.location.href = "/";
    }
    const login = localStorage.getItem("isLoggedIn");
    
    if (login === "true") {
        window.location.href = "/";
    }


    function validateName(name) {
        let reNombre = /(-?([A-Z].\s)?([A-Z][a-z]+)\s?)+([A-Z]'([A-Z][a-z]+))?/g;
        if (reNombre.test(name)) {
            setErrorNombre("")
            return true;
        } else {
            setErrorNombre("El nombre no es correcto.")
            return false;
        }
    }
    function validateEmail(email) {
        let reEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
        if (reEmail.test(email)) {
            setErrorEmail("")
            return true;
        } else {
            setErrorEmail("El e-mail no es correcto.")
            return false;
        }
    }
    function validatePassword(contraseña) {
        let reContraseña = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
        if (reContraseña.test(contraseña)) {
            setErrorPswd("")
            return true;
        } else {
            setErrorPswd("La contraseña necesita al menos: 8 caracteres, 1 letra mayúscula, y 1 letra minúscula.")
            return false;
        }
    }

    function validateForm() {

        let nombre = document.getElementById("name").value
        let email = document.getElementById("email").value
        let contraseña = document.getElementById("password").value

        validateName(nombre)
        validateEmail(email)
        validatePassword(contraseña)

        if (validateName(nombre) && validateEmail(email) && validatePassword(contraseña)) {
            return true;
        } else {
            return false;
        }

    }


    return (
        <div>
            <h1>Registrarse</h1>
            <br/>
            <Form method="post" name="formulario" onSubmit={validateForm}>
                <Label for="name">Nombre Completo: </Label>
                <Input
                    type="name"
                    name="name"
                    id="name"
                    placeholder="nombre completo"
                />
                <p className="text-warning">{errorNombre}</p>
                <Label for="email">E-Mail: </Label>
                <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="correo electrónico"
                />
                <p className="text-warning">{errorEmail}</p>
                <Label for="password">Contraseña: </Label>
                <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="contraseña"
                />
                <p className="text-warning">{errorPswd}</p>
                <p className="text-white">{msg}</p>
                <button
                    className="text-center mb-4"
                    onClick={onSubmitHandler}
                >
                    Registrarse
                </button>
            </Form>
        </div>
    );
}

export default Registrase;