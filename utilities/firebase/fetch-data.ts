import { db } from "@/config/firebaseConfig";
import { Venue } from "@/models/venue";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

//Takes in a state and gets all offers from that state to populate search
export async function getAllVenuesByState(state: string): Promise<Venue[]> {
  try {
    const q = await query(
      collection(db, "venues"),
      where("state", "==", state),
    );
    const offerCollection = await getDocs(q);
    const venues: Venue[] = [];
    offerCollection.forEach((doc) => {
      venues.push({ id: doc.id, ...doc.data() } as Venue);
    });
    return venues;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

//Just get data from one item.
export async function getOneItem<T>(
  id: string,
  collectionName: string,
): Promise<T | null> {
  try {
    const ref = doc(db, collectionName, id);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      throw new Error("User not found");
    }

    const data = snap.data();
    return {
      id: snap.id,
      ...data,
    } as T;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

// Get a list of offers and return them sorted by date ASC (earliest → latest)
// Returns offeres with status "open" or "accepted"
export async function getOffersByIdsDescending<Offer>(
  ids: string[],
  status: string,
) {
  try {
    const items: Offer[] = [];

    for (const id of ids) {
      const ref = doc(db, "offers", id);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data() as any;

        // Filter by status
        if (data.status === status) {
          items.push({ id: snap.id, ...data } as Offer);
        }
      }
    }

    // Sort by date ascending (earliest → latest)
    items.sort((a: any, b: any) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    return items;
  } catch (error) {
    console.error("Error fetching items by IDs:", error);
    return [];
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
