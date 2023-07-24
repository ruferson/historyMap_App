import { collection, getDocs, query, where } from '@firebase/firestore';

import { db } from '../firebase/firebaseConfig';

export const getPrivateMaps = async () => {
	const collectionRef = collection(db, "maps");

	try {
		const querySnapshot = await getDocs(query(collectionRef, where("private", "==", true)));

		const publicMaps = [];

		querySnapshot.forEach((doc) => {
			publicMaps.push({ id: doc.id, ...doc.data() });
		});

		return publicMaps;
	} catch (error) {
		console.error("Error al obtener los mapas públicos:", error);
		return [];
	}
};