import { auth, db } from "@/config/firebaseConfig";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";

export async function deleteOfferVenue(offerId: string) {
  const offerRef = doc(db, "offers", offerId);

  // 1. Fetch offer data (needed to clean venue + artists)
  const offerSnap = await getDoc(offerRef);
  if (!offerSnap.exists()) {
    throw new Error("Offer not found.");
  }

  const offerData = offerSnap.data();
  const venueId: string = offerData.parentVenueId;
  const appliedArtistIds: string[] = offerData.appliedArtistIds || [];

  // 2. Remove offerId from venue.offers
  const venueRef = doc(db, "venues", venueId);
  const venueSnap = await getDoc(venueRef);

  if (venueSnap.exists()) {
    const venueData = venueSnap.data();
    const updatedOffers = (venueData.offers || []).filter(
      (id: string) => id !== offerId,
    );

    await updateDoc(venueRef, { offers: updatedOffers });
  }

  // 3. Remove offerId from all artists who applied
  const artistUpdates = appliedArtistIds.map(async (artistId) => {
    const artistRef = doc(db, "users", artistId);
    const artistSnap = await getDoc(artistRef);

    if (!artistSnap.exists()) return;

    const artistData = artistSnap.data();
    const updatedApplied = (artistData.appliedOfferIds || []).filter(
      (id: string) => id !== offerId,
    );

    return updateDoc(artistRef, { appliedOfferIds: updatedApplied });
  });

  await Promise.all(artistUpdates);

  // 4. Delete the offer document itself
  await deleteDoc(offerRef);
}

export async function deleteOfferArtist(offerId: string) {
  const artistId = auth.currentUser?.uid;
  if (!artistId) {
    throw new Error("User not authenticated.");
  }

  const offerRef = doc(db, "offers", offerId);
  const artistRef = doc(db, "users", artistId);

  // 1. Fetch both docs in parallel
  const [offerSnap, artistSnap] = await Promise.all([
    getDoc(offerRef),
    getDoc(artistRef),
  ]);

  if (!offerSnap.exists()) throw new Error("Offer not found.");
  if (!artistSnap.exists()) throw new Error("Artist not found.");

  const offerData = offerSnap.data();
  const artistData = artistSnap.data();

  // 2. Remove artistId from offer.appliedArtistIds
  const updatedOfferArtists = (offerData.appliedArtistIds || []).filter(
    (id: string) => id !== artistId,
  );

  // 3. Remove offerId from artist.appliedOfferIds
  const updatedArtistOffers = (artistData.appliedOfferIds || []).filter(
    (id: string) => id !== offerId,
  );

  // 4. Write both updates in parallel
  await Promise.all([
    updateDoc(offerRef, { appliedArtistIds: updatedOfferArtists }),
    updateDoc(artistRef, { appliedOfferIds: updatedArtistOffers }),
  ]);
}
