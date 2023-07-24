import { collection, getDocs } from 'firebase/firestore';

import { db } from '../firebase/firebaseConfig';

export const getUsers = async () => {
	const collectionRef = collection(db, "users");

	try {
		const querySnapshot = await getDocs(collectionRef);

		const allMaps = [];

		querySnapshot.forEach((doc) => {
			allMaps.push({ id: doc.id, ...doc.data() });
		});

		return allMaps;
	} catch (error) {
		console.error("Error al obtener los mapas:", error);
		return [];
	}
};