import { useEffect, useState } from 'react';
import { getMarker } from 'servicios/getMarker';

const useMarker = (markerID) => {

	const [markerData, setMarker] = useState();
	const [loadingMarker, setLoadingMarker] = useState(true)

	const obtenerMarker = () => {
		if (markerID) {
			getMarker(markerID).then(nextMarker => {
				setMarker(nextMarker);
				setLoadingMarker(false)
			});
		} else {
			setLoadingMarker(false)
		}
	}
	useEffect(obtenerMarker, [markerID]);

	return { markerData, loadingMarker }
}

export default useMarker;