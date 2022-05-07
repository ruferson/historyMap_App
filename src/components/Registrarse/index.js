import React, { useState } from "react";
import { Button, Form, Label, Input } from "reactstrap";
import axios from "axios";
import "./styles.css";
import {  useLocation } from "wouter";

function Registrase ()  {

  
    const [location, setLocation] = useLocation();
  
    if (JSON.parse(localStorage.getItem("userData")).isLogged){
      setLocation("/dashboard")
    }
  
    const [msg, setMsg] = useState("")
    const [errorNombre, setErrorNombre] = useState("")
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPswd, setErrorPswd] = useState("")
  
  
    function onSubmitHandler (e) {
      e.preventDefault();
      setMsg("")
      if (validateForm()){
          let nombre=document.getElementById("name").value
          let email=document.getElementById("email").value
          let contraseña=document.getElementById("password").value
          let data = JSON.stringify({"nombre":nombre, "email":email, "contraseña":contraseña})
  
          console.log(data);
  
          axios.post(
              "http://google.es",
              data,
          )
          .then((response) => {
              setMsg(response.data.message);
          });
          console.log(msg)
      } else {
          setMsg("Hay errores en el formulario")
      }
    };
  
  
    function validateName(name){
      let reNombre = /(-?([A-Z].\s)?([A-Z][a-z]+)\s?)+([A-Z]'([A-Z][a-z]+))?/g;
      if (reNombre.test(name)){
          setErrorNombre("")
          return true;
      } else {
          setErrorNombre("El nombre no es correcto.")
          return false;
      }
    }
    function validateEmail(email){
      let reEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
      if (reEmail.test(email)){
          setErrorEmail("")
          return true;
      } else {
          setErrorEmail("El e-mail no es correcto.")
          return false;
      }
    }
    function validatePassword(contraseña){
      let reContraseña = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
      if (reContraseña.test(contraseña)){
          setErrorPswd("")
          return true;
      } else {
          setErrorPswd("La contraseña necesita al menos: 8 caracteres, 1 letra mayúscula, y 1 letra minúscula.")
          return false;
      }
    }
  
    function validateForm(){
   
      let nombre=document.getElementById("name").value
      let email=document.getElementById("email").value
      let contraseña=document.getElementById("password").value
  
      validateName(nombre)
      validateEmail(email)
      validatePassword(contraseña)
  
      if (validateName(nombre) && validateEmail(email) && validatePassword(contraseña)){
          return true;
      } else {
          return false;
      }
      
    }
    
  
      return (
        <div>
            <h1>Registrarse</h1>
          <Form className="containers shadow" method="post" name="formulario" onSubmit={validateForm}>
          <Label for="name">Nombre completo: </Label>
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
            <Button
              className="text-center mb-4"
              color="success"
              onClick={onSubmitHandler}
            >
              Registrarse
            </Button>
          </Form>
        </div>
      );
    }

  export default Registrase;