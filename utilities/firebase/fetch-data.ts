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

// Takes in a state and gets all venues from that state,
// but only returns offers with status === "open"
export async function getAllVenuesByState(state: string): Promise<Venue[]> {
  try {
    // 1. Fetch venues in the state
    const venueQuery = query(
      collection(db, "venues"),
      where("state", "==", state),
    );

    const venueSnap = await getDocs(venueQuery);

    const venues: Venue[] = [];
    const allOfferIds: string[] = [];

    // 2. Collect all offer IDs across all venues
    venueSnap.forEach((docSnap) => {
      const data = docSnap.data() as Venue;
      const offerIds = data.offers ?? [];

      allOfferIds.push(...offerIds);

      venues.push({
        ...data,
        id: docSnap.id,
        offers: offerIds, // temporarily store IDs
      });
    });

    if (allOfferIds.length === 0) {
      return venues.map((v) => ({ ...v, offers: [] }));
    }

    // 3. Batch fetch all offers using "in" query (max 10 per batch)
    const offerChunks = chunkArray(allOfferIds, 10);
    const offerMap: Record<string, any> = {};

    for (const chunk of offerChunks) {
      const offerQuery = query(
        collection(db, "offers"),
        where("__name__", "in", chunk),
      );

      const offerSnap = await getDocs(offerQuery);

      offerSnap.forEach((offerDoc) => {
        offerMap[offerDoc.id] = { id: offerDoc.id, ...offerDoc.data() };
      });
    }

    // 4. Attach only open offers to each venue
    const venuesWithOpenOffers = venues.map((venue) => {
      const openOffers = venue.offers
        .map((id) => offerMap[id])
        .filter((offer) => offer && offer.status === "open");

      return {
        ...venue,
        offers: openOffers.map((offer) => offer.id),
      };
    });

    return venuesWithOpenOffers;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

// Helper: split array into chunks of size N
function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
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
