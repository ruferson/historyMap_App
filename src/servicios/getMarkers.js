import { collection, getDocs, query, where } from '@firebase/firestore';

import { db } from '../firebase/firebaseConfig';

export const getMarkers = async (mapId) => {
	const collectionRef = collection(db, "markers");

	try {
		const querySnapshot = await getDocs(query(collectionRef, where("mapId", "==", mapId)));

		const markersOfMap = [];

		querySnapshot.forEach((doc) => {
			markersOfMap.push({ id: doc.id, ...doc.data() });
		});

		return markersOfMap;
	} catch (error) {
		console.error("Error al obtener los marcadores del mapa:", error);
		return [];
	}
};