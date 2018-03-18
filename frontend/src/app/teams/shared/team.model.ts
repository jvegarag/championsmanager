import { Country } from './country.model';

export class Team {
  id: number;
  href: string;
  favorite: false;
  name: string;
  country: Country;
  opponents: Team[];
}

