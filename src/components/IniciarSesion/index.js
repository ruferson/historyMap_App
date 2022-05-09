import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import { useLocation } from "wouter";
import './styles.css'


function Login () {
    
    const [location, setLocation] = useLocation();

    if (JSON.parse(localStorage.getItem("userData")).isLogged){
        setLocation("/dashboard")
    }

    const [email, setEmail] = useState("");
    const [password, setPasswd] = useState("");
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [errMsgEmail, setErrEmail] = useState("");
    const [errMsgPwd, setErrPwd] = useState("");
    const [errMsg, setErrMsg] = useState("");

    function onEmailChange (e) {
        setEmail(e.target.value)
    }

    function onPasswdChange (e) {
        setPasswd(e.target.value)
    }
  
    function onSignInHandler () {
      setLoading(true);
      axios
        .post("http://127.0.0.1:8000/api/tokens/create", {
          email: email,
          password: password,
        })
        .then((response) => {
          setLoading(false);
          if (response.data.status === 200) {
              localStorage.setItem("isLoggedIn", true);
              localStorage.setItem("userData", JSON.stringify(response.data.data));
              setMsg(response.data.message);
              setRedirect(true);
          }
          if (
            response.data.status === "failed" &&
            response.data.success === undefined
          ) {
            setErrEmail(response.data.validation_error.email);
            setErrPwd(response.data.validation_error.password);
            setTimeout(() => {
                setErrEmail("");
                setErrPwd("");
            }, 2000);
          } else if (
            response.data.status === "failed" &&
            response.data.success === false
          ) {
            setErrMsg(response.data.message);
            setTimeout(() => {
                setErrMsg(""); 
            }, 2000);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

  
      if (redirect) {
        setLocation("/dashboard")
      }
      const login = localStorage.getItem("isLoggedIn");
      if (login) {
        setLocation("/dashboard")
      }

      return (
        <div>
            <h1>Iniciar Sesión</h1>
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