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

export const bandsModel: Band[] = [
  {
    id: "1",
    bandName: "Tame Impala",
    email: "email@gmail.com",
    genre: "Alternative",
    pricePerHour: 100,
    bio: "Hey here is our bio this is a little bit about us but we're not real so you can just keep on doing whatever you want to do just a long bio for testing purposes and reasons should I add a limit onto this I don't know maybe so.",
    picture: "tame_impala.jpg",
    hours: 2,
    minutes: 30,
    instagram: "tame_impala",
    phone: "5717281098",
    location: "los angeles, ca",
  },
  {
    id: "2",
    bandName: "Miles Davis Quintet",
    email: "email@gmail.com",
    genre: "Jazz",
    pricePerHour: 150,
    bio: "Hey here is our bio this is a little bit about us but we're not real so you can just keep on doing whatever you want to do just a long bio for testing purposes and reasons should I add a limit onto this I don't know maybe so.",
    picture: "miles_davis.jpg",
    hours: 2,
    minutes: 45,
    instagram: "miles_davisInsta",
    phone: "5717281098",
    location: "new york, ny",
  },
  {
    id: "3",
    bandName: "The Rolling Stones",
    email: "email@gmail.com",
    genre: "Rock",
    pricePerHour: 120,
    bio: "Hey here is our bio this is a little bit about us but we're not real so you can just keep on doing whatever you want to do just a long bio for testing purposes and reasons should I add a limit onto this I don't know maybe so.",
    picture: "rolling_stones.jpg",
    hours: 5,
    minutes: 15,
    instagram: "the_stones",
    phone: "5717281098",
    location: "london, uk",
  },
  {
    id: "4",
    bandName: "Metallica",
    email: "email@gmail.com",
    genre: "Metal",
    pricePerHour: 150,
    bio: "Hey here is our bio this is a little bit about us but we're not real so you can just keep on doing whatever you want to do just a long bio for testing purposes and reasons should I add a limit onto this I don't know maybe so.",
    picture: "metallica.jpg",
    hours: 3,
    minutes: 0,
    instagram: "metallica",
    phone: "5717281098",
    location: "san francisco, ca",
  },
  {
    id: "5",
    bandName: "Kendrick Lamar",
    email: "email@gmail.com",
    genre: "Hip-Hop",
    pricePerHour: 100,
    bio: "Hey here is our bio this is a little bit about us but we're not real so you can just keep on doing whatever you want to do just a long bio for testing purposes and reasons should I add a limit onto this I don't know maybe so.",
    picture: "kendrick_lamar.jpg",
    hours: 0,
    minutes: 30,
    instagram: "kdott",
    phone: "5717281098",
    location: "compton, ca",
  },
  {
    id: "6",
    bandName: "Van Halen",
    email: "email@gmail.com",
    genre: "Rock",
    pricePerHour: 150,
    bio: "Hey here is our bio this is a little bit about us but we're not real so you can just keep on doing whatever you want to do just a long bio for testing purposes and reasons should I add a limit onto this I don't know maybe so.",
    picture: "van_halen.jpg",
    hours: 4,
    minutes: 0,
    instagram: "van_halen",
    phone: "5717281098",
    location: "pasadena, ca",
  },
];

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
