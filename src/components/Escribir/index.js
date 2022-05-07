import React, { useState} from 'react';
import RichTextEditor from 'react-rte';
import { Button, Form, Input, Label } from 'reactstrap';

function Escribir(props) {

    const [html, setHTML] = useState(null)
    const [state, setState] = useState(RichTextEditor.createEmptyValue())
  
    function onChange (value) {
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

    return (
        <div>
            <Form className="" method="post" name="formulario">
                <Label for="titulo"><h3>Título:</h3></Label>
                <Input
                    type="text"
                    name="titulo"
                    id="titulo"
                    placeholder="título"
                /><br/>
                <Label for="text"><h3>Texto:</h3></Label>
                <RichTextEditor toolbarConfig={toolbarConfig}
                    value={state}
                    onChange={onChange}
                /><br/>
                <label for="tipo"><h3>Tipo:</h3></label> <br/>
                <select name="tipo" id="tipo">
                    <option value="war">Guerra</option>
                    <option value="death">Muerte</option>
                    <option value="birth">Nacimiento</option>
                    <option value="discovery">Descubrimiento</option>
                    <option value="construction">Construcción</option>
                </select> {/*ponerIconoEvento*/} <br/><br/>
                <Button  className="btn-success" onClick={enviarHTML}>Enviar</Button>
            </Form>
        </div>
    );
    
  }


export default Escribir;
