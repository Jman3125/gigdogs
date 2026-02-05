// Set up mock data for bands in the application

interface SetTime {
  hours: number;
  minutes: number;
}

export interface Band {
  id: string;
  bandName: string;
  email: string;
  password: string;
  genre: string;
  pricePerHour: number;
  bio: string;
  picture: string;
  setTime: SetTime;
  instagram: string;
  //ADD A PHONE NUMBER
}

export const bandsModel: Band[] = [
  {
    id: "1",
    bandName: "Tame Impala",
    email: "email@gmail.com",
    password: "password123@",
    genre: "Alternative",
    pricePerHour: 100,
    bio: "Hey here is our bio this is a little bit about us but we're not real so you can just keep on doing whatever you want to do just a long bio for testing purposes and reasons should I add a limit onto this I don't know maybe so.",
    picture: "tame_impala.jpg",
    setTime: { hours: 2, minutes: 30 },
    instagram: "tame_impala",
  },
  {
    id: "2",
    bandName: "Miles Davis Quintet",
    email: "email@gmail.com",
    password: "password123@",
    genre: "Jazz",
    pricePerHour: 150,
    bio: "Hey here is our bio this is a little bit about us but we're not real so you can just keep on doing whatever you want to do just a long bio for testing purposes and reasons should I add a limit onto this I don't know maybe so.",
    picture: "miles_davis.jpg",
    setTime: { hours: 2, minutes: 45 },
    instagram: "miles_davisInsta",
  },
  {
    id: "3",
    bandName: "The Rolling Stones",
    email: "email@gmail.com",
    password: "password123@",
    genre: "Rock",
    pricePerHour: 120,
    bio: "Hey here is our bio this is a little bit about us but we're not real so you can just keep on doing whatever you want to do just a long bio for testing purposes and reasons should I add a limit onto this I don't know maybe so.",
    picture: "rolling_stones.jpg",
    setTime: { hours: 5, minutes: 15 },
    instagram: "the_stones",
  },
  {
    id: "4",
    bandName: "Metallica",
    email: "email@gmail.com",
    password: "password123@",
    genre: "Metal",
    pricePerHour: 150,
    bio: "Hey here is our bio this is a little bit about us but we're not real so you can just keep on doing whatever you want to do just a long bio for testing purposes and reasons should I add a limit onto this I don't know maybe so.",
    picture: "metallica.jpg",
    setTime: { hours: 3, minutes: 0 },
    instagram: "metallica",
  },
  {
    id: "5",
    bandName: "Kendrick Lamar",
    email: "email@gmail.com",
    password: "password123@",
    genre: "Hip-Hop",
    pricePerHour: 100,
    bio: "Hey here is our bio this is a little bit about us but we're not real so you can just keep on doing whatever you want to do just a long bio for testing purposes and reasons should I add a limit onto this I don't know maybe so.",
    picture: "kendrick_lamar.jpg",
    setTime: { hours: 0, minutes: 30 },
    instagram: "kdott",
  },
  {
    id: "6",
    bandName: "Van Halen",
    email: "email@gmail.com",
    password: "password123@",
    genre: "Rock",
    pricePerHour: 150,
    bio: "Hey here is our bio this is a little bit about us but we're not real so you can just keep on doing whatever you want to do just a long bio for testing purposes and reasons should I add a limit onto this I don't know maybe so.",
    picture: "van_halen.jpg",
    setTime: { hours: 4, minutes: 0 },
    instagram: "van_halen",
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

export const Minutes = [
  { label: "0 min", value: 0 },
  { label: "15 min", value: 15 },
  { label: "30 min", value: 30 },
  { label: "45 min", value: 45 },
];

export const Hours = [
  { label: "1 hr", value: 1 },
  { label: "2 hr", value: 2 },
  { label: "3 hr", value: 3 },
  { label: "4 hr", value: 4 },
  { label: "5 hr", value: 5 },
  { label: "6 hr", value: 6 },
  { label: "7 hr", value: 7 },
  { label: "8 hr", value: 8 },
];
