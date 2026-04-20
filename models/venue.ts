export interface Venue {
  id: string;
  role: string;
  venueName: string;
  venueImage: string;
  state: string;
  address: string;
  //Venue contact information
  email: string;
  phone: string;
  website?: string;
  instagram?: string;
  facebook?: string;
  offerIds: string[];
}
