//Validate Update Fields for a venue

export function validateOfferFields(
  eventName: string,
  date: Date,
  startTime: Date,
  endTime: Date,
  arrivalTime: Date,
  offerAmount: string,
  eventDetails: string,
  providedEquipment: string,
) {
  //Validate fields

  if (!eventName.trim()) {
    return { valid: false, message: "Please add an event name." };
  }

  // In validate-offer-fields.ts, replace the date validation block:
  let today = new Date();
  if (date < today) {
    return { valid: false, message: "Can not select a past date." };
  }

  if (!(arrivalTime < startTime && startTime < endTime)) {
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
