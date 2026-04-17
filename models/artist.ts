// Set up data model and mock data for bands in the application
import { Offer } from "./offer";

export interface Artist {
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
  facebook?: string;
  instagram?: string;
  phone: string;
  location: string;
  //The events the artist has applied to
  appliedEvents?: Offer[];
}

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

//States
// States
export const States = [
  { label: "Select", value: "xyz" },
  { label: "Alabama", value: "AL" },
  { label: "Alaska", value: "AK" },
  { label: "Arizona", value: "AZ" },
  { label: "Arkansas", value: "AR" },
  { label: "California", value: "CA" },
  { label: "Colorado", value: "CO" },
  { label: "Connecticut", value: "CT" },
  { label: "Delaware", value: "DE" },
  { label: "Florida", value: "FL" },
  { label: "Georgia", value: "GA" },
  { label: "Hawaii", value: "HI" },
  { label: "Idaho", value: "ID" },
  { label: "Illinois", value: "IL" },
  { label: "Indiana", value: "IN" },
  { label: "Iowa", value: "IA" },
  { label: "Kansas", value: "KS" },
  { label: "Kentucky", value: "KY" },
  { label: "Louisiana", value: "LA" },
  { label: "Maine", value: "ME" },
  { label: "Maryland", value: "MD" },
  { label: "Massachusetts", value: "MA" },
  { label: "Michigan", value: "MI" },
  { label: "Minnesota", value: "MN" },
  { label: "Mississippi", value: "MS" },
  { label: "Missouri", value: "MO" },
  { label: "Montana", value: "MT" },
  { label: "Nebraska", value: "NE" },
  { label: "Nevada", value: "NV" },
  { label: "New Hampshire", value: "NH" },
  { label: "New Jersey", value: "NJ" },
  { label: "New Mexico", value: "NM" },
  { label: "New York", value: "NY" },
  { label: "North Carolina", value: "NC" },
  { label: "North Dakota", value: "ND" },
  { label: "Ohio", value: "OH" },
  { label: "Oklahoma", value: "OK" },
  { label: "Oregon", value: "OR" },
  { label: "Pennsylvania", value: "PA" },
  { label: "Rhode Island", value: "RI" },
  { label: "South Carolina", value: "SC" },
  { label: "South Dakota", value: "SD" },
  { label: "Tennessee", value: "TN" },
  { label: "Texas", value: "TX" },
  { label: "Utah", value: "UT" },
  { label: "Vermont", value: "VT" },
  { label: "Virginia", value: "VA" },
  { label: "Washington", value: "WA" },
  { label: "West Virginia", value: "WV" },
  { label: "Wisconsin", value: "WI" },
  { label: "Wyoming", value: "WY" },
];
