import { useEffect, useState } from 'react';

import { getEvent } from '../servicios/getEvent';

const useEvent = (eventoID, update) => {

	const [mapEvent, setEvent] = useState(null);
	const [loadingEvent, setLoadingEvent] = useState(true);

	const obtenerMarcadores = () => {
		if (eventoID !== null) {
			setLoadingEvent(true)
			getEvent(eventoID).then(nextEvent => {
				setEvent(nextEvent)
				setLoadingEvent(false)
			});
		}
	}
	useEffect(obtenerMarcadores, [eventoID, update]);

	return { mapEvent, loadingEvent }
}

export default useEvent;