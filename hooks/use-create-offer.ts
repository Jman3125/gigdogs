import { auth } from "@/config/firebaseConfig";
import { validateOfferFields } from "@/utilities/validate/validate-offer-fields";
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
