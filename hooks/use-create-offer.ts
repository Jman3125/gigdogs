import { auth, db } from "@/config/firebaseConfig";
import { Venue } from "@/models/venue";
import { getOneItem } from "@/utilities/firebase/fetch-data";
import { validateOfferFields } from "@/utilities/validate/validate-offer-fields";
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
export function useCreateOffer() {
  const create = async (
    date: Date,
    startTime: Date,
    endTime: Date,
    arrivalTime: Date,
    offerAmount: string,
    eventDetails: string,
    providedEquipment: string,
    extraNotes: string,
  ) => {
    // Validate fields
    const result = validateOfferFields(
      date,
      startTime,
      endTime,
      arrivalTime,
      offerAmount,
      eventDetails,
      providedEquipment,
    );

    if (!result.valid) {
      throw new Error(result.message);
    }

    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User not authenticated.");
      }

      //I also need to pass the current venues state and name with the offer so it's easy to put in feed

      //Create an ID for the offer
      const generateID = () => {
        return Math.random().toString(36).substring(2, 9);
      };

      const offerId = generateID();

      //Create an 'offers' array on the venue object, add the offer ID
      await updateDoc(doc(db, "venues", user.uid), {
        offers: arrayUnion(offerId),
      });

      //Grab the current venues name and state to put on the offer object so it's easy to display in feed without having to grab the venue data
      const venueData = await getOneItem<Venue>(user.uid, "venues");

      //Create a collection for offers with all information and corresponding ID
      await setDoc(doc(db, "offers", offerId), {
        parentVenueId: venueData?.id || "Unknown Venue ID",
        id: offerId,
        status: "open",
        venueName: venueData?.venueName || "Unknown Venue",
        state: venueData?.state || "Unknown State",
        date: date,
        time: startTime + " - " + endTime,
        arrivalTime: arrivalTime,
        description: eventDetails,
        offerAmount: parseFloat(offerAmount),
        providedEquipment: providedEquipment,
        extraNotes: extraNotes,
        appliedArtistIds: [],
      });

      return { success: true };
    } catch (error: any) {
      console.error("Signup error:", {
        code: error.code,
        message: error.message,
        fullError: error,
      });
      throw new Error(error.message || "Signup failed");
    }
  };

  return { create };
}
