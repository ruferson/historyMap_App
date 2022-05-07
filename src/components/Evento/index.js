import React, { useEffect } from 'react';
import './styles.css'
import mocktexto from '../../mocks/texto-1.json'

function Evento(props) {

    function ponerTexto() {
        let texto = mocktexto.records[props.id].titulo + mocktexto.records[props.id].html;
        props.anyadirAlDom(texto, "texto")
    }

    useEffect(ponerTexto, [props.id])

    return (
        <div id="texto"></div>
    );
}

export default Evento;
