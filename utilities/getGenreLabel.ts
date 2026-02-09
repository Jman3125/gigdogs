import { Genres } from "@/models/band";

export function getGenre(value: string): string {
  //Get label so that genres are not in lowercase from db
  const label = Genres.find((item) => item.value === value);

  return label ? label.label : value;
}
