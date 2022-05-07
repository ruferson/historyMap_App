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

    const [estado, setEstado] = useState({
        email: "",
        password: "",
        msg: "",
        isLoading: false,
        redirect: false,
        errMsgEmail: "",
        errMsgPwd: "",
        errMsg: "",
      }) 

    function onChangehandler (e) {
      let name = e.target.name;
      let value = e.target.value;
      let data = {};
      data[name] = value;
      setEstado(data);
    };
  
    function onSignInHandler () {
    setEstado({
        email: estado.email,
        password: estado.password,
        msg: estado.msg,
        isLoading: true,
        redirect: estado.redirect,
        errMsgEmail: estado.errMsgEmail,
        errMsgPwd: estado.errMsgPwd,
        errMsg: estado.errMsg,
        });
      axios
        .post("http://localhost:8000/api/user-login", {
          email: estado.email,
          password: estado.password,
        })
        .then((response) => {
          setEstado({
            email: estado.email,
            password: estado.password,
            msg: estado.msg,
            isLoading: false,
            redirect: estado.redirect,
            errMsgEmail: estado.errMsgEmail,
            errMsgPwd: estado.errMsgPwd,
            errMsg: estado.errMsg,
          });
          if (response.data.status === 200) {
              localStorage.setItem("isLoggedIn", true);
              localStorage.setItem("userData", JSON.stringify(response.data.data));
            setEstado({
                email: estado.email,
                password: estado.password,
                msg: response.data.message,
                isLoading: estado.isLoading,
                redirect: true,
                errMsgEmail: estado.errMsgEmail,
                errMsgPwd: estado.errMsgPwd,
                errMsg: estado.errMsg,
            });    
          }
          if (
            response.data.status === "failed" &&
            response.data.success === undefined
          ) {
            setEstado({
                email: estado.email,
                password: estado.password,
                msg: estado.msg,
                isLoading: estado.isLoading,
                redirect: estado.redirect,
                errMsgEmail: response.data.validation_error.email,
                errMsgPwd: response.data.validation_error.password,
                errMsg: estado.errMsg,
            });
            setTimeout(() => {
                setEstado({
                    email: estado.email,
                    password: estado.password,
                    msg: estado.msg,
                    isLoading: estado.isLoading,
                    redirect: estado.redirect,
                    errMsgEmail: "",
                    errMsgPwd: "",
                    errMsg: estado.errMsg,
                });
            }, 2000);
          } else if (
            response.data.status === "failed" &&
            response.data.success === false
          ) {
            setEstado({
                email: estado.email,
                password: estado.password,
                msg: estado.msg,
                isLoading: estado.isLoading,
                redirect: estado.redirect,
                errMsgEmail: estado.errMsgEmail,
                errMsgPwd: estado.errMsgPwd,
                errMsg: response.data.message,
            });
            setTimeout(() => {
                setEstado({
                    email: estado.email,
                    password: estado.password,
                    msg: estado.msg,
                    isLoading: estado.isLoading,
                    redirect: estado.redirect,
                    errMsgEmail: estado.errMsgEmail,
                    errMsgPwd: estado.errMsgPwd,
                    errMsg: "" 
                });
            }, 2000);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

  
      if (estado.redirect) {
        setLocation("/dashboard")
      }
      const login = localStorage.getItem("isLoggedIn");
      if (login) {
        setLocation("/dashboard")
      }
      const isLoading = estado.isLoading;

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
                value={estado.email}
                onChange={onChangehandler}
              />
              <span className="text-danger">{estado.msg}</span>
              <span className="text-danger">{estado.errMsgEmail}</span>
            </FormGroup>
            <FormGroup>
              <Label for="password">Contraseña: </Label>
              <Input
                type="password"
                name="password"
                placeholder="contraseña"
                value={estado.password}
                onChange={onChangehandler}
              />
              <span className="text-danger">{estado.errMsgPwd}</span>
            </FormGroup>
            <p className="text-danger">{estado.errMsg}</p>
            <Button
              className="text-center mb-4"
              color="success"
              onClick={onSignInHandler}
            >
              Iniciar sesión
              {isLoading ? (
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