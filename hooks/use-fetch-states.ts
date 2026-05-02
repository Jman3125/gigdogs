//Used for searching locations. Uses states list to return matching states

import { StatesSearchBar } from "@/models/venue";

export function useFetchStates() {
  const fetchStates = (text: string) => {
    try {
      //Match states with text input
      const matchingStates = StatesSearchBar.filter((state) =>
        state.label.toLowerCase().includes(text.toLowerCase()),
      );
      return matchingStates.map((state) => state.label);
    } catch (err) {
      return [];
    }
  };

  return { fetchStates };
}

// try {
//       const res = await fetch(
//         `https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?access_token=${process.env.EXPO_PUBLIC_MAP_API_KEY}&cachebuster=1625641871908&autocomplete=true&types=place`,
//       );
//       if (!res.ok) throw new Error(res.statusText);
//       return res.json();
//     } catch (err) {
//       return { error: "Unable to retrieve places" };
//     }
