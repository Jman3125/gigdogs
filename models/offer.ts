//A venue adds an offer for artists to see
import { Venue } from "./venue";

export interface Offer {
  id: string;
  status: string;
  venue?: Venue;
  date: string;
  //Will be a window (ex: 7:00pm-10:00pm)
  time: string;
  arrivalTime: string;
  description: string;
  offerAmount: number;
  //What the venue will be providing at the gig
  providedEquipment: string;
  extraNotes?: string;
  //Artists that have applied
  appliedArtistIds: [];
}
