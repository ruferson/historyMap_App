import Ajax from 'components/Ajax';
import useEvento from 'hooks/useEvento';
import React from 'react';

const Evento = (props) => {

	const { event, loading } = useEvento(props.id, 0);

	if (event !== null) {
		props.setEvento(event);
	}

	return (
		<>
			{!props.noClicked
				? event
					? <>
						<p dangerouslySetInnerHTML={{ __html: props.type }} />
						<h1 dangerouslySetInnerHTML={{ __html: event.data.titulo }} />
						<br />
						<div dangerouslySetInnerHTML={{ __html: event.data.html }} />
					</>
					: <Ajax></Ajax>
				: <></>
			}
		</>
	);
}

export default Evento;
