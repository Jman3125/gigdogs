// Set up data model and mock data for bands in the application

export interface Band {
  id: string;
  bandName: string;
  email: string;
  genre: string;
  pricePerHour: number;
  bio: string;
  picture: string;
  //Set time
  hours: number;
  minutes: number;
  instagram: string;
  phone: string;
  location: string;
}

export const Genres = [
  { label: "Alternative Rock", value: "alternative_rock" },
  { label: "Blues", value: "blues" },
  { label: "Classical", value: "classical" },
  { label: "Rock", value: "rock" },
  { label: "Country", value: "country" },
  { label: "EDM", value: "edm" },
  { label: "Folk", value: "folk" },
  { label: "Funk", value: "funk" },
  { label: "Gospel", value: "gospel" },
  { label: "Hip-Hop", value: "hiphop" },
  { label: "Indie Rock", value: "indie_rock" },
  { label: "Jazz", value: "jazz" },
  { label: "Latin", value: "latin" },
  { label: "Metal", value: "metal" },
  { label: "Pop", value: "pop" },
  { label: "Punk", value: "punk" },
  { label: "R&B", value: "rnb" },
  { label: "Rap", value: "rap" },
  { label: "Reggae", value: "reggae" },
  { label: "Soul", value: "soul" },
];
