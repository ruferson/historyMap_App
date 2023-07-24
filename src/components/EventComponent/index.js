import Ajax from 'components/Ajax';
import useEvento from 'hooks/useEvent';
import React from 'react';

const EventComponent = (props) => {

	const { mapEvent, loading } = useEvento(props.id, 0);

	if (mapEvent !== null) {
		props.setEvento(mapEvent);
	}

	return (
		<>
			{!props.noClicked
				? mapEvent
					? <>
						<p dangerouslySetInnerHTML={{ __html: props.type }} />
						<h1 dangerouslySetInnerHTML={{ __html: mapEvent.data.titulo }} />
						<br />
						<div dangerouslySetInnerHTML={{ __html: mapEvent.data.html }} />
					</>
					: <Ajax></Ajax>
				: <></>
			}
		</>
	);
}

export default EventComponent;
