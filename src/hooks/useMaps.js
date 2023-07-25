import { useEffect, useState } from 'react';

import { getMaps } from 'servicios/getMaps';

const useMaps = (isPrivate) => {
	const [mapList, setMapList] = useState([]);
	const [loading, setLoading] = useState(true);

	const obtainMaps = () => {
		setLoading(true)
		getMaps(isPrivate).then(nextMaps => {
			setLoading(false);
			setMapList(nextMaps);
		});
	}
	useEffect(obtainMaps, []);

	return { mapList, loading }
}

export default useMaps;