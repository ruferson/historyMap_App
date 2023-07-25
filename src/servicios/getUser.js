import { doc, getDoc } from 'firebase/firestore';

import { db } from '../firebase/firebaseConfig';

export const getUserById = async (userId) => {
	const docRef = doc(db, "users", userId);

	try {
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			return { id: docSnap.id, ...docSnap.data() };
		} else {
			console.log("No such document!");
			return null;
		}
	} catch (error) {
		console.error("Error al obtener el usuario por ID:", error);
		return null;
	}
};
