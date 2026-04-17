//A venue adds an offer for artists to see
import { Artist } from "./artist";
import { Venue } from "./venue";

export interface Offer {
  id: string;
  venue?: Venue;
  eventName: string;
  date: string;
  //Will be a window (ex: 7:00pm-10:00pm)
  time: string;
  //Required set time
  hours: number;
  minutes: number;
  description: string;
  status: string;
  offerAmount: number;
  //Artists that have applied
  appliedArtists: Artist[];
}
