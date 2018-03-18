export class Filter {
  name: string;
  countryName: string;
  size = 10;

  constructor(name: string, countryName: string, size: number) {
    this.name = name;
    this.countryName = countryName;
    this.size = size;
  }
  clear(): void {
    this.name = '';
    this.countryName = '';
    this.size = 10;
  }
}
