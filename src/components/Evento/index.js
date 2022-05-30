import React, { useEffect } from 'react';
import useEvento from 'hooks/useEvento';
import Ajax from 'components/Ajax';

function Evento(props) {

    const { evento, loading } = useEvento(props.id, 0);

    if (evento !== null) {
        props.setEvento(evento)
    }

    return (<>
        {!props.noClicked ? evento ? <>
            <p dangerouslySetInnerHTML={{ __html: props.tipo }} />
            <h1 dangerouslySetInnerHTML={{ __html: evento.data.titulo }} />
            <br/>
            <div dangerouslySetInnerHTML={{ __html: evento.data.html }} />
        </>
            : <Ajax></Ajax> : <></>
        }
    </>
    );
}

export default Evento;
