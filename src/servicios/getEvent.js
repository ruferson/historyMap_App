import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

export const getEvent = async (markerID) => {
  const collectionRef = collection(db, "events");

  try {
    const querySnapshot = await getDocs(query(collectionRef, where("markerID", "==", markerID)));

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error al obtener el evento por markerID:", error);
    return null;
  }
};