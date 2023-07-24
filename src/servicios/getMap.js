import { doc, getDoc } from 'firebase/firestore';

import { db } from '../firebase/firebaseConfig';

export const getMap = async (id) => {
	const docRef = doc(db, "maps", id);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		return docSnap.data;
	} else {
		console.log("No such document!");
	}
}