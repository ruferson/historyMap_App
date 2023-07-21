import { useEffect, useState } from 'react';

import { getMapList } from 'servicios/getMapList';

const useMapList = (isPrivate) => {
	const [mapList, setMapList] = useState([]);
	const [loading, setLoading] = useState(true);

	const obtainMaps = () => {
		setLoading(true)
		getMapList(isPrivate).then(nextMaps => {
			setLoading(false);
			setMapList(nextMaps);
		});
	}
	useEffect(obtainMaps, [isPrivate]);

	return { mapList, loading }
}

export default useMapList;