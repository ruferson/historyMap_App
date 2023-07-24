import { useEffect, useState } from 'react';

import { getPublicMaps } from '../servicios/getPublicMaps';

const usePublicMaps = () => {
	const [mapList, setMapList] = useState([]);
	const [loading, setLoading] = useState(true);

	const getMaps = () => {
		setLoading(true)
		getPublicMaps().then(nextMaps => {
			setLoading(false);
			setMapList(nextMaps);
		});
	}
	useEffect(getMaps, []);

	return { mapList, loading }
}

export default usePublicMaps;