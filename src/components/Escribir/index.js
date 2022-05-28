import React, { useEffect, useState} from 'react';
import RichTextEditor from 'react-rte';
import { Form, Input, Label } from 'reactstrap';

function Escribir(props) {

    const [html, setHTML] = useState(null);
    const [state, setState] = useState(props.html !== undefined ? RichTextEditor.createValueFromString(props.html, "html") : RichTextEditor.createEmptyValue());
    const [tipo, setTipo] = useState(props.tipo !== undefined ? props.tipo : "default")
    const [titulo, setTitulo] = useState(props.titulo !== undefined ? props.titulo : "")
  
    useEffect(()=>{
        console.log(props)
    }, [props]);

    useEffect(()=>{
        if (props.html !== undefined) {
            setState(RichTextEditor.createValueFromString(props.html, "html"))
        }
    }, [props.html]);
    useEffect(()=>{
        if (props.tipo !== undefined) {
            setTipo(props.tipo)
        }
    }, [props.tipo]);
    useEffect(()=>{
        if (props.titulo !== undefined) {
            setTitulo(props.titulo)
        }
    }, [props.titulo]);

    function onChangeHTML (value) {
      setState(value);
      setHTML(value.toString('html'));
    };

    // The toolbarConfig object allows you to specify custom buttons, reorder buttons and to add custom css classes.
    // Supported inline styles: https://github.com/facebook/draft-js/blob/master/docs/Advanced-Topics-Inline-Styles.md
    // Supported block types: https://github.com/facebook/draft-js/blob/master/docs/Advanced-Topics-Custom-Block-Render.md#draft-default-block-render-map
    const toolbarConfig = {
        // Optionally specify the groups to display (displayed in the order listed).
        display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS','IMAGE_BUTTON', 'BLOCK_TYPE_DROPDOWN', 'HISTORY_BUTTONS'],
        INLINE_STYLE_BUTTONS: [
          {label: 'Bold', style: 'BOLD', className: 'custom-css-class'},
          {label: 'Italic', style: 'ITALIC'},
          {label: 'Underline', style: 'UNDERLINE'}
        ],
        BLOCK_TYPE_DROPDOWN: [
          {label: 'Normal', style: 'unstyled'},
          {label: 'Heading Large', style: 'header-one'},
          {label: 'Heading Medium', style: 'header-two'},
          {label: 'Heading Small', style: 'header-three'}
        ],
        BLOCK_TYPE_BUTTONS: [
          {label: 'UL', style: 'unordered-list-item'},
          {label: 'OL', style: 'ordered-list-item'}
        ],
        IMAGE_BUTTON : [
        {label: 'Image', style: 'img'},
        ]
      };
  
    function enviarHTML(){
        let titulo=document.getElementById("titulo").value
        let tipo=document.getElementById("tipo").value
        props.sendHTML(titulo, html, tipo)
    }

    function onChangeTitulo(event) {
        setTitulo(event.target.value)
    }

    return (
        <div>
            <Form className="" method="post" name="formulario">
                <Label for="titulo"><h3>Título:</h3></Label>
                <Input
                    type="text"
                    name="titulo"
                    id="titulo"
                    placeholder="título"
                    value={titulo}
                    onChange={onChangeTitulo}
                /><br/>
                <Label for="text"><h3>Texto:</h3></Label>
                <RichTextEditor toolbarConfig={toolbarConfig}
                    value={state}
                    onChange={onChangeHTML}
                /><br/>
                <label for="tipo"><h3>Tipo:</h3></label> <br/>
                <select name="tipo" id="tipo">
                    {tipo === "default" ? <option value="default" selected>--Elige un tipo--</option> : <option value="default">--Elige un tipo--</option>}
                    {tipo === "war" ? <option value="war" selected>Guerra</option> : <option value="war">Guerra</option>}
                    {tipo === "death" ? <option value="death" selected>Muerte</option> : <option value="death">Muerte</option>}
                    {tipo === "birth" ? <option value="birth" selected>Nacimiento</option> : <option value="birth">Nacimiento</option>}
                    {tipo === "discovery" ? <option value="discovery" selected>Descubrimiento</option> : <option value="discovery">Descubrimiento</option>}
                    {tipo === "construction" ? <option value="construction" selected>Construcción</option> : <option value="construction">Construcción</option>}
                </select> {/*ponerIconoEvento*/} <br/><br/>
                <button onClick={enviarHTML}>Enviar</button>
            </Form>
        </div>
    );
    
  }


export default Escribir;
