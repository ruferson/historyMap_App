import { useEffect, useState } from "react";
import { getPrivateMaps } from "../servicios/getPrivateMaps";

const useMyMaps = () => {
	const [myMapsList, setMyMapsList] = useState([]);
	const [loading, setLoading] = useState(true)

	const obtainMaps = () => {
		setLoading(true)
		getPrivateMaps().then(nextMaps => {
			setMyMapsList(nextMaps);
			setLoading(false)

		});
	}
	useEffect(obtainMaps, []);

	return { myMapsList, loading }
}

export default useMyMaps;