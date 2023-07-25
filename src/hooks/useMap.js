import { useEffect, useState } from "react";
import { getMap } from "servicios/getMap";

const useMap = (mapID) => {

	const [mapData, setMap] = useState();
	const [loading, setLoading] = useState(true)

	const obtenerMapas = () => {
		getMap(mapID).then(nextMap => {
			setMap(nextMap);
			setLoading(false)
		});
	}
	useEffect(obtenerMapas, [mapID]);

	return { mapData, loading }
}

export default useMap;