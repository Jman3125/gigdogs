//A venue adds an offer for artists to see

export interface Offer {
  parentVenueId: string;
  id: string;
  status: string;
  eventName: string;
  state: string;
  date: string;
  //Will be a window (ex: 7:00pm-10:00pm)
  time: string;
  arrivalTime: string;
  description: string;
  offerAmount: number;
  //What the venue will be providing at the gig
  providedEquipment: string;
  extraNotes?: string;
  //IDs of artists that have applied
  appliedArtistIds: string[];
}
