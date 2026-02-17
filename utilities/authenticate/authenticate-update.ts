//Validate Update Fields

export function validateUpdateFields(
  bandName: string,
  location: string,
  genre: string,
  pricePerHour: number,
  bio: string,
  picture: string,
  hours: number,
  minutes: number,
  instagram: string,
  phone: string,
) {
  //ensure no fields are empty
  if (!bandName.trim()) {
    return { valid: false, message: "Please add your band name." };
  }

  if (!location.trim()) {
    return { valid: false, message: "Please add a location." };
  }

  if (!genre.trim()) {
    return { valid: false, message: "Please add a genre." };
  }

  if (isNaN(pricePerHour) || pricePerHour <= 0) {
    return { valid: false, message: "Please enter a valid price per hour." };
  }

  if (isNaN(hours) || hours <= 0) {
    return { valid: false, message: "Please enter a valid number of hours." };
  }
  if (isNaN(minutes) || minutes < 0 || minutes > 59) {
    return { valid: false, message: "Please enter a valid number of minutes." };
  }

  if (!picture || !picture.trim()) {
    return { valid: false, message: "Please add a profile picture." };
  }

  if (!bio.trim()) {
    return { valid: false, message: "Please add a bio." };
  }

  if (!phone.trim()) {
    return { valid: false, message: "Please add a phone number." };
  }

  if (!instagram.trim()) {
    return { valid: false, message: "Please add an Instagram username." };
  }

  return { valid: true };
}
