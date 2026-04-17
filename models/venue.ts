import { Offer } from "./offer";

export interface Venue {
  id: string;
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
  offers: Offer[];
}

export class MockData {
  static venues: Venue[] = [
    {
      id: "1",
      venueName: "Sunset Bar",
      venueImage: "https://example.com/sunset.jpg",
      state: "NY",
      address: "123 avenue road",
      email: "test@gmail.com",
      phone: "6378253849",
      website: "varnwilm.com",
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
      offers: [
        {
          id: "o1",
          eventName: "Happy Hour",
          date: "March 7th, 2026",
          time: "7pm-10pm",
          hours: 2,
          minutes: 30,
          status: "pending",
          description: "50% off all drinks from 5 to 7 PM",
          offerAmount: 200,
          appliedArtists: [
            {
              id: "artist_001",
              bandName: "Neon Skyline",
              email: "contact@neonskylineband.com",
              genre: "Indie Rock",
              pricePerHour: 250,
              bio: "Neon Skyline blends atmospheric guitars with energetic rhythms, creating a modern indie sound inspired by late‑night city lights and coastal drives.",
              picture: "https://example.com/images/neon-skyline.jpg",

              // Set time
              hours: 1,
              minutes: 30,

              instagram: "https://instagram.com/neonskylineband",
              facebook: "https://facebook.com/john.doe",
              phone: "555-123-9876",
              location: "Los Angeles, CA",
            },
          ],
        },
      ],
    },
    {
      id: "2",
      venueName: "Ocean Grill",
      venueImage: "https://example.com/ocean.jpg",
      state: "FL",
      address: "1245 Miamia rd",
      email: "example@gmail.com",
      phone: "6378253849",
      website: "varnwilm.com",
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
      offers: [
        {
          id: "o2",
          eventName: "Lunch Special",
          date: "March 7th, 2026",
          time: "7pm-10pm",
          hours: 2,
          minutes: 30,
          status: "pending",
          description: "50% off all drinks from 5 to 7 PM",
          offerAmount: 100,
          appliedArtists: [],
        },
        {
          id: "o3",
          eventName: "Dinner Special",
          date: "March 7th, 2026",
          time: "7pm-10pm",
          hours: 2,
          minutes: 30,
          status: "pending",
          offerAmount: 500,
          description: "50% off all drinks from 5 to 7 PM",
          appliedArtists: [],
        },
      ],
    },
  ];
}
