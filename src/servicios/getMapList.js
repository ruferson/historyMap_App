import { collection, getDocs, query, where } from '@firebase/firestore';

import { auth, db } from '../firebase/firebaseConfig';

export const getMapList = async (isPrivate) => {
	const collectionRef = collection(db, "maps");

	try {
		const querySnapshot = isPrivate
			? await getDocs(query(collectionRef, where("uid", "==", auth.currentUser.uid)))
			: await getDocs(query(collectionRef, where("private", "==", false)));

		const mapList = [];

		querySnapshot.forEach((doc) => {
			mapList.push({ id: doc.id, ...doc.data() });
		});

		return mapList;
	} catch (error) {
		console.error("Error al obtener los mapas:", error);
		return [];
	}
};