import { auth, db } from "@/config/firebaseConfig";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";

/**
 * Adds the current artist to an offer's appliedArtistIds array
 */
export const applyToOffer = async (offerId: string) => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User not authenticated");
  }

  const offerRef = doc(db, "offers", offerId);

  // Optional safety check (prevents duplicate apply)
  const snap = await getDoc(offerRef);
  if (!snap.exists()) {
    throw new Error("Offer does not exist");
  }

  const data = snap.data();
  const alreadyApplied = (data.appliedArtistIds || []).includes(user.uid);

  if (alreadyApplied) {
    throw new Error("You have already applied to this offer");
  }

  // Firestore-safe atomic update to add the offer UID to the artists appliedOfferIds array
  const userRef = doc(db, "users", user.uid);
  await updateDoc(userRef, {
    appliedOfferIds: arrayUnion(offerId),
  });

  // Firestore-safe atomic update
  await updateDoc(offerRef, {
    appliedArtistIds: arrayUnion(user.uid),
  });

  return { success: true };
};
