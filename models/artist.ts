// Set up data model and mock data for bands in the application

export interface Artist {
  id: string;
  role: string;
  artistName: string;
  email: string;
  genre: string;
  originalsCovers: string;
  bio: string;
  picture: string;
  facebook?: string;
  instagram?: string;
  phone: string;
  //The events the artist has applied to
  appliedOfferIds: string[];
}

//Original or cover band selection

export const OriginalCoverOptions = [
  { label: "Originals/Covers", value: "original_covers" },
  { label: "Originals", value: "original" },
  { label: "Covers", value: "cover" },
];

//Genres

export const Genres = [
  { label: "Alt Rock", value: "alternative_rock" },
  { label: "Blues", value: "blues" },
  { label: "Pop Rock", value: "pop_rock" },
  { label: "Rock", value: "rock" },
  { label: "Country", value: "country" },
  { label: "Indie Rock", value: "indie_rock" },
  { label: "EDM", value: "edm" },
  { label: "Folk", value: "folk" },
  { label: "Metal", value: "metal" },
  { label: "Emo", value: "emo" },
  { label: "Funk", value: "funk" },
  { label: "Rap", value: "rap" },
  { label: "Gospel", value: "gospel" },
  { label: "Classical", value: "classical" },
  { label: "Hip-Hop", value: "hiphop" },
  { label: "Jazz", value: "jazz" },
  { label: "Latin", value: "latin" },
  { label: "Pop", value: "pop" },
  { label: "Punk", value: "punk" },
  { label: "R&B", value: "rnb" },
  { label: "Reggae", value: "reggae" },
  { label: "Soul", value: "soul" },
  { label: "Other", value: "other" },
];
