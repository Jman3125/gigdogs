import { Artist } from "./artist";
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
      venueName: "Varnish bar and brewery",
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
              bio: "Neon Skyline blends atmospheric guitars with energetic rhythms, creating a modern indie sound inspired by late‑night city lights and coastal drives.",
              picture: "https://example.com/images/neon-skyline.jpg",

              instagram: "https://instagram.com/neonskylineband",
              facebook: "https://facebook.com/john.doe",
              phone: "555-123-9876",
              location: "Los Angeles, CA",
            },
            {
              id: "artist_002",
              bandName: "CornerstoneTheBand",
              email: "contact@neonskylineband.com",
              genre: "Indie Rock",
              bio: "Neon Skyline blends atmospheric guitars with energetic rhythms, creating a modern indie sound inspired by late‑night city lights and coastal drives.",
              picture: "https://example.com/images/neon-skyline.jpg",

              instagram: "https://instagram.com/neonskylineband",
              facebook: "https://facebook.com/john.doe",
              phone: "555-123-9876",
              location: "Los Angeles, CA",
            },
            {
              id: "artist_003",
              bandName: "Emerson Bruno and the Undercurrents",
              email: "contact@neonskylineband.com",
              genre: "Indie Rock",
              bio: "Neon Skyline blends atmospheric guitars with energetic rhythms, creating a modern indie sound inspired by late‑night city lights and coastal drives.",
              picture: "https://example.com/images/neon-skyline.jpg",

              instagram: "https://instagram.com/neonskylineband",
              facebook: "https://facebook.com/john.doe",
              phone: "555-123-9876",
              location: "Los Angeles, CA",
            },
            {
              id: "artist_004",
              bandName: "Antigravity",
              email: "contact@neonskylineband.com",
              genre: "Indie Rock",
              bio: "Neon Skyline blends atmospheric guitars with energetic rhythms, creating a modern indie sound inspired by late‑night city lights and coastal drives.",
              picture: "https://example.com/images/neon-skyline.jpg",

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
      venueName: "Ocean Grill and Bar",
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
          appliedArtists: [
            {
              id: "artist_003",
              bandName: "Emerson Bruno and the Undercurrents",
              email: "contact@neonskylineband.com",
              genre: "Indie Rock",
              bio: "Neon Skyline blends atmospheric guitars with energetic rhythms, creating a modern indie sound inspired by late‑night city lights and coastal drives.",
              picture: "https://example.com/images/neon-skyline.jpg",

              instagram: "https://instagram.com/neonskylineband",
              facebook: "https://facebook.com/john.doe",
              phone: "555-123-9876",
              location: "Los Angeles, CA",
            },
            {
              id: "artist_002",
              bandName: "CornerstoneTheBand",
              email: "contact@neonskylineband.com",
              genre: "Indie Rock",
              bio: "Neon Skyline blends atmospheric guitars with energetic rhythms, creating a modern indie sound inspired by late‑night city lights and coastal drives.",
              picture: "https://example.com/images/neon-skyline.jpg",

              instagram: "https://instagram.com/neonskylineband",
              facebook: "https://facebook.com/john.doe",
              phone: "555-123-9876",
              location: "Los Angeles, CA",
            },
          ],
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
          appliedArtists: [
            {
              id: "artist_003",
              bandName: "Emerson Bruno and the Undercurrents",
              email: "contact@neonskylineband.com",
              genre: "Indie Rock",
              bio: "Neon Skyline blends atmospheric guitars with energetic rhythms, creating a modern indie sound inspired by late‑night city lights and coastal drives.",
              picture: "https://example.com/images/neon-skyline.jpg",

              instagram: "https://instagram.com/neonskylineband",
              facebook: "https://facebook.com/john.doe",
              phone: "555-123-9876",
              location: "Los Angeles, CA",
            },
          ],
        },
      ],
    },
  ];

  static bands: Artist[] = [
    {
      id: "artist_001",
      bandName: "Neon Skyline",
      email: "contact@neonskylineband.com",
      genre: "Indie Rock",
      bio: "Neon Skyline blends atmospheric guitars with energetic rhythms, creating a modern indie sound inspired by late‑night city lights and coastal drives.",
      picture: "https://example.com/images/neon-skyline.jpg",

      instagram: "https://instagram.com/neonskylineband",
      facebook: "https://facebook.com/john.doe",
      phone: "555-123-9876",
      location: "Los Angeles, CA",
    },
    {
      id: "artist_002",
      bandName: "CornerstoneTheBand",
      email: "contact@neonskylineband.com",
      genre: "Indie Rock",
      bio: "Neon Skyline blends atmospheric guitars with energetic rhythms, creating a modern indie sound inspired by late‑night city lights and coastal drives.",
      picture: "https://example.com/images/neon-skyline.jpg",

      instagram: "https://instagram.com/neonskylineband",
      facebook: "https://facebook.com/john.doe",
      phone: "555-123-9876",
      location: "Los Angeles, CA",
    },
    {
      id: "artist_003",
      bandName: "Emerson Bruno and the Undercurrents",
      email: "contact@neonskylineband.com",
      genre: "Indie Rock",
      bio: "Neon Skyline blends atmospheric guitars with energetic rhythms, creating a modern indie sound inspired by late‑night city lights and coastal drives.",
      picture: "https://example.com/images/neon-skyline.jpg",

      instagram: "https://instagram.com/neonskylineband",
      facebook: "https://facebook.com/john.doe",
      phone: "555-123-9876",
      location: "Los Angeles, CA",
    },
    {
      id: "artist_004",
      bandName: "Antigravity",
      email: "contact@neonskylineband.com",
      genre: "Indie Rock",
      bio: "Neon Skyline blends atmospheric guitars with energetic rhythms, creating a modern indie sound inspired by late‑night city lights and coastal drives.",
      picture: "https://example.com/images/neon-skyline.jpg",

      instagram: "https://instagram.com/neonskylineband",
      facebook: "https://facebook.com/john.doe",
      phone: "555-123-9876",
      location: "Los Angeles, CA",
    },
  ];
}
