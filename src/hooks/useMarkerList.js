import { useEffect, useState } from 'react';

import { getMarkerList } from '../servicios/getMarkerList';

const useMarkerList = (mapID, update) => {
	const [markers, setMarkers] = useState();
	const [loading, setLoading] = useState(true);

	const obtainMarkers = () => {
		setLoading(true)
		getMarkerList(mapID).then(nextMarkers => {
			setMarkers(nextMarkers)
			setLoading(false)
		});
	}
	useEffect(obtainMarkers, [mapID, update]);

	return { markers, loading }
}

export default useMarkerList;