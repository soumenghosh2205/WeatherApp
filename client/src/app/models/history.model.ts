import { City } from "./city.model";

export interface SearchedCity {
  username: string,
  city: City
}

export interface CreatedSearchedCity {
  acknowledged: boolean;
  insertedId: string
}
