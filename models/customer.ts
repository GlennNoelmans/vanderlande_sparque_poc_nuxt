export class Customer {
    id: number | string;
    name: string;
    countryCode: string;

    constructor() {
        this.id = 0;
        this.name = ''; 
        this.countryCode = '';
      }
}