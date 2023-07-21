import { useEffect, useState } from 'react';
import { getSavedMaps } from 'servicios/getSavedMaps';

const useSavedMaps = () => {

	const [savedMapsList, setSavedMapsList] = useState([]);
	const [loading, setLoading] = useState(true)

	const obtenerMapas = () => {
		setLoading(true)
		getSavedMaps().then(nextMapas => {
			setSavedMapsList(nextMapas);
			setLoading(false)
		});
	}
	useEffect(obtenerMapas, []);

	return { savedMapsList, loading }
}

export default useSavedMaps;