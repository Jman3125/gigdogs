//Validate Update Fields for a venue

export function validateOfferFields(
  date: Date,
  startTime: Date,
  endTime: Date,
  arrivalTime: Date,
  offerAmount: string,
  eventDetails: string,
  providedEquipment: string,
) {
  //Validate fields

  const now = new Date();
  if (date < now) {
    return { valid: false, message: "Can not select a past date." };
  }

  if (!(endTime > startTime && startTime > arrivalTime)) {
    return {
      valid: false,
      message:
        "Arrival must be before the start time, and the start time must be before the end time.",
    };
  }

  if (!offerAmount.trim()) {
    return { valid: false, message: "Please add an offer amount." };
  }

  if (!eventDetails.trim()) {
    return {
      valid: false,
      message: "Please add event details.",
    };
  }

  if (!providedEquipment.trim()) {
    return {
      valid: false,
      message: "Please add any equipment you will provide. Can be none.",
    };
  }

  return { valid: true };
}
