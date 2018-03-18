import {Team} from './team.model';

export class Page {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}

export class Links {
    first: string;
    self: string;
    next: string;
    previous: string;
    last: string;
}

export class PaginatedList {
  list: Team[] = [];
  page: Page;
  links: Links;
}

