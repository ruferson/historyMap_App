import { doc, getDoc } from 'firebase/firestore';

import { db } from '../firebase/firebaseConfig';

export const getEvent = async (ID) => {
	const docRef = doc(db, "events", ID);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		return docSnap.data;
	} else {
		console.log("No such document!");
	}
}