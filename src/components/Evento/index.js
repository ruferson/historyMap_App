import React, { useEffect } from 'react';
import './styles.css'
import useEvento from 'hooks/useEvento';
import Ajax from 'components/Ajax';

function Evento(props) {

    const { evento, loading } = useEvento(props.id, 0);

    if (!loading){
        props.setEvento(evento)
    }

    return (<>
        {!props.noClicked ? !loading ?  <>
            <p dangerouslySetInnerHTML={{__html: props.tipo}}/>
            <h1 dangerouslySetInnerHTML={{__html: evento.data.titulo}}/>
            <div dangerouslySetInnerHTML={{__html: evento.data.html}}/>
            </>
            : <Ajax></Ajax> : <></>
        }
        </>
    );
}

export default Evento;
