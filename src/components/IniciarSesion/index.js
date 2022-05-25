import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import './styles.css'
import useUserData from "hooks/useUserData";


function Login() {

    const [email, setEmail] = useState("");
    const [password, setPasswd] = useState("");
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [errMsgEmail, setErrEmail] = useState("");
    const [errMsgPwd, setErrPwd] = useState("");
    const [errMsg, setErrMsg] = useState("");

    function onEmailChange(e) {
        setEmail(e.target.value)
    }

    function onPasswdChange(e) {
        setPasswd(e.target.value)
    }

    function onSignInHandler() {
        setLoading(true);
        let token;
        axios
            .post("http://history.test:8000/api/tokens/create", {
                email: email,
                password: password,
            })
            .then((response) => {
                console.log(response);
                setLoading(false);
                if (response.status === 200) {
                    localStorage.setItem("isLoggedIn", true);
                    localStorage.setItem("userToken", JSON.stringify(response.data));
                    token = JSON.stringify(response.data);
                    console.log(JSON.stringify(response.data))
                    axios
                        .get("http://history.test:8000/api/user", {
                            headers: {
                                'Authorization': JSON.parse(token).token_type+" "+JSON.parse(token).access_token,
                                'Content-Type': 'application/json'
                            }
                        })
                        .then((response) => {
                            console.log(response);
                            setLoading(false);
                            if (response.status === 200) {
                                localStorage.setItem("userData", JSON.stringify(response.data));
                                setRedirect(true);
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
                if (
                    response.status === "failed" &&
                    response.success === undefined
                ) {
                    setLoading(false)
                    setErrEmail(response.validation_error.email);
                    setErrPwd(response.validation_error.password);
                    setTimeout(() => {
                        setErrEmail("");
                        setErrPwd("");
                    }, 2000);
                    alert("¡Ha habido un error!")
                } else if (
                    response.status === "failed" &&
                    response.success === false
                ) {
                    setLoading(false)
                    setTimeout(() => {
                        setErrMsg("");
                    }, 2000);
                    alert("¡Ha habido un error!")
                }
            })
            .catch((error) => {
                setLoading(false)
                console.log(error);
                alert("¡Ha habido un error!")
            });        
    };

    if (redirect) {
        window.location.href = "/";
    }
    const login = localStorage.getItem("isLoggedIn");
    console.log(login)
    if (login === "true") {
        window.location.href = "/";
    }

    return (
        <div>
            <h1 className="text-white">Iniciar Sesión</h1>
            <Form className="containers">
                <FormGroup>
                    <Label for="email">E-Mail: </Label>
                    <Input
                        type="email"
                        name="email"
                        placeholder="correo electrónico"
                        value={email}
                        onChange={onEmailChange}
                    />
                    <span className="text-danger">{msg}</span>
                    <span className="text-danger">{errMsgEmail}</span>
                </FormGroup>
                <FormGroup>
                    <Label for="password">Contraseña: </Label>
                    <Input
                        type="password"
                        name="password"
                        placeholder="contraseña"
                        value={password}
                        onChange={onPasswdChange}
                    />
                    <span className="text-danger">{errMsgPwd}</span>
                </FormGroup>
                <p className="text-danger">{errMsg}</p>
                <Button
                    className="text-center mb-4"
                    color="success"
                    onClick={onSignInHandler}
                >
                    Iniciar sesión
                    {loading ? (
                        <span
                            className="spinner-border spinner-border-sm ml-5"
                            role="status"
                            aria-hidden="true"
                        ></span>
                    ) : (
                        <span></span>
                    )}
                </Button>
            </Form>
        </div>
    );
}

export default Login;