import { Genres, OriginalCoverOptions } from "@/models/artist";

export function getGenre(value: string): string {
  //Get label so that genres are not in lowercase from db
  const label = Genres.find((item) => item.value === value);

  return label ? label.label : value;
}

export function getType(value: string): string {
  //Get label so that types are not in lowercase from db
  const label = OriginalCoverOptions.find((item) => item.value === value);

  return label ? label.label : value;
}
