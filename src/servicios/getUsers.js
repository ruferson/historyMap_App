import { collection, getDocs } from 'firebase/firestore';

import { db } from '../firebase/firebaseConfig';

export const getUsers = async () => {
	const collectionRef = collection(db, "users");

	try {
		const querySnapshot = await getDocs(collectionRef);

		const allUsers = [];

		querySnapshot.forEach((doc) => {
			allUsers.push({ id: doc.id, ...doc.data() });
		});

		return allUsers;
	} catch (error) {
		console.error("Error al obtener los usuarios:", error);
		return [];
	}
};