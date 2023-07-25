import { useEffect, useState } from 'react';

import { getMarkers } from '../servicios/getMarkers';

const useMakers = (mapID, update) => {
	const [markers, setMarkers] = useState();
	const [loading, setLoading] = useState(true);

	const obtainMarkers = () => {
		setLoading(true)
		getMarkers(mapID).then(nextMarkers => {
			setMarkers(nextMarkers)
			setLoading(false)
		});
	}
	useEffect(obtainMarkers, [mapID, update]);

	return { markers, loading }
}

export default useMakers;