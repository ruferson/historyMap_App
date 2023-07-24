import { collection, getDocs, query, where } from '@firebase/firestore';

import { db } from '../firebase/firebaseConfig';

export const getMaps = async (isPrivate) => {
	const collectionRef = collection(db, "maps");

	try {
		const querySnapshot = await getDocs(query(collectionRef, where("private", "==", isPrivate)));

		const mapList = [];

		querySnapshot.forEach((doc) => {
			mapList.push({ id: doc.id, ...doc.data() });
		});

		return mapList;
	} catch (error) {
		console.error("Error al obtener los mapas públicos:", error);
		return [];
	}
};