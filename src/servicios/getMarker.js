import { doc, getDoc } from 'firebase/firestore';

import { db } from '../firebase/firebaseConfig';

export const getMarker = async (markerID) => {
	try {
		const docRef = doc(db, "markers", markerID);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			return { id: docSnap.id, ...docSnap.data() };
		} else {
			console.log("No such document!");
			return null;
		}
	} catch (error) {
		console.error("Error al obtener el mapa:", error);
		return null;
	}
};