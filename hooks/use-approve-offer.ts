import { db } from "@/config/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export function useApproveOffer() {
  const approve = async (offerId: string, artistId: string) => {
    const offerRef = doc(db, "offers", offerId);

    // 1. Update the offer: keep only the approved artist
    await updateDoc(offerRef, {
      appliedArtistIds: [artistId],
      status: "accepted",
    });

    // 2. Fetch offer data to get all previously applied artists
    const offerSnap = await getDoc(offerRef);
    const offerData = offerSnap.data();
    if (!offerData) throw new Error("Offer not found.");

    const previouslyApplied: string[] = offerData.appliedArtistIds || [];

    // 3. Remove offerId from all other artists' appliedOfferIds
    const artistsToClean = previouslyApplied.filter((id) => id !== artistId);

    const updates = artistsToClean.map(async (otherArtistId) => {
      const artistRef = doc(db, "artists", otherArtistId);
      const artistSnap = await getDoc(artistRef);

      if (!artistSnap.exists()) return;

      const artistData = artistSnap.data();
      const updatedOffers = (artistData.appliedOfferIds || []).filter(
        (id: string) => id !== offerId,
      );

      return updateDoc(artistRef, {
        appliedOfferIds: updatedOffers,
      });
    });

    await Promise.all(updates);
  };

  return { approve };
}
