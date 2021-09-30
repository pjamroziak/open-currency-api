export class EcbCurrency {
  currency: string;
  rate: number;

  constructor(currency: string, rate: number) {
    this.currency = currency;
    this.rate = rate;
  }
}
