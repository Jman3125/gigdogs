import { db } from "@/config/firebaseConfig";
import { Offer } from "@/models/offer";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

//Takes in a state and gets all offers from that state to populate search
export async function getAllOffersByState(state: string): Promise<Offer[]> {
  try {
    const q = await query(
      collection(db, "offers"),
      where("state", "==", state),
    );
    const offerCollection = await getDocs(q);
    const offers: Offer[] = [];
    offerCollection.forEach((doc) => {
      offers.push({ id: doc.id, ...doc.data() } as Offer);
    });
    return offers;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

//Just get data from one venue.
export async function getOneItem<T>(
  id: string,
  collectionName: string,
): Promise<T | null> {
  try {
    // const q = query(collection(db, collectionName), where("id", "==", id));

    //const querySnapshot = await getDocs(q);
    const ref = doc(db, collectionName, id);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      throw new Error("User not found");
    }

    // const dataDoc = snap.docs[0];
    // const data = dataDoc.data();
    const data = snap.data();
    return {
      id: snap.id,
      ...data,
    } as T;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

//Get list of items by an array of IDs. Will use to get offers for a venue and artists that applied to an offer
export async function getItemsByIds<T>(
  ids: string[],
  collectionName: string,
): Promise<T[]> {
  try {
    const items: T[] = [];

    for (const id of ids) {
      const ref = doc(db, collectionName, id);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        items.push({ id: snap.id, ...snap.data() } as T);
      }
    }

    return items;
  } catch (error) {
    console.error("Error fetching items by IDs:", error);
    return [];
  }
}
