import { collection, getDocs, query, where } from '@firebase/firestore';

import { auth, db } from '../firebase/firebaseConfig';

export const getMarkerList = async (mapID) => {
	const collectionRef = collection(db, "markers");

	try {
		const querySnapshot = await getDocs(query(collectionRef, where("mapID", "==", mapID)));
		const markersOfMap = [];

		if (!querySnapshot.empty) {
			querySnapshot.forEach((doc) => {
				markersOfMap.push({ id: doc.id, ...doc.data() });
			});
		}

		return markersOfMap;
	} catch (error) {
		console.error("Error al obtener los marcadores del mapa:", error);
		return [];
	}
};