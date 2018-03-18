export class Filter {
  name: string;
  countryName: string;

  constructor(name: string, countryName: string) {
    this.name = name;
    this.countryName = countryName;
  }
  clear(): void {
    this.name = '';
    this.countryName = '';
  }
}
