//Validate Update Fields for an artist

export function validateUpdateFieldsArtist(
  artistName: string,
  genre: string,
  originalsCovers: string,
  bio: string,
  picture: string,
  instagram: string,
  facebook: string,
  phone: string,
) {
  //ensure no fields are empty
  if (!artistName.trim()) {
    return { valid: false, message: "Please add your band name." };
  }

  if (!genre.trim()) {
    return { valid: false, message: "Please add a genre." };
  }

  if (!originalsCovers.trim()) {
    return { valid: false, message: "Please select originals/covers." };
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

  if (!instagram.trim() && !facebook.trim()) {
    return {
      valid: false,
      message: "Please add at least one social media account.",
    };
  }

  return { valid: true };
}

//Validate Update Fields for a venue

export function validateUpdateFieldsVenue(
  venueName: string,
  address: string,
  state: string,
  picture: string,
  website: string,
  instagram: string,
  facebook: string,
) {
  //ensure no fields are empty
  if (!venueName.trim()) {
    return { valid: false, message: "Please add your band name." };
  }

  if (!address.trim()) {
    return { valid: false, message: "Please add an address for the venue." };
  }

  if (!state.trim()) {
    return { valid: false, message: "Please select the venues state." };
  }

  if (!picture || !picture.trim()) {
    return { valid: false, message: "Please add a profile picture." };
  }

  if (!website.trim() && !instagram.trim() && !facebook.trim()) {
    return {
      valid: false,
      message: "Please add at least one link/social media account.",
    };
  }

  return { valid: true };
}
