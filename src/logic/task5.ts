// import { generateRates } from '../helpers/generateRate';

export enum CurrencySymbol {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
};

export type CurrencyPair = {
  baseSymbol: CurrencySymbol;
  quoteSymbol: CurrencySymbol;
};

export type ExchangeRate = CurrencyPair & {
  bid: number;
  ask: number;
};

/*
TASK 5: Market updating (class method definition)

Knowing the syntax of class definition:

class Greeter {
  greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }

  greet() {
    return 'Hello, ' + this.greeting;
  }
}

refactor the existing class `Market` (below).

1. Add a method `updateRates` taking an array of `ExchangeRate`s as an argument
and setting it as the `currentRates` field.
2. Use the helper `generateRates` to create a default value for `updateRates` method's
argument. The import is commented out at the top of the file (guide below)
3. Add the `constructor` taking an array of initial `ExchangeRate`s as an argument.
Call the `updateRates` method within the constructor.
4. Use the initial value of `currentRates` field as a default value of the constructor argument.
5. Set initial value of `currentRates` field to an empty array.

How to use the helper:
- parameters: old rates with ExchangeRate type - ExchangeRate[]
- returns:  new rated - ExchangeRate[]

In  `App.tsx` change the UI version to 2 for preview.
*/

export class Market {
  currentRates: ExchangeRate[] = [
    {
      baseSymbol: CurrencySymbol.EUR,
      quoteSymbol: CurrencySymbol.USD,
      bid: 1.182,
      ask: 1.182,
    },
    {
      baseSymbol: CurrencySymbol.GBP,
      quoteSymbol: CurrencySymbol.USD,
      bid: 1.3081,
      ask: 1.3085,
    },
    {
      baseSymbol: CurrencySymbol.EUR,
      quoteSymbol: CurrencySymbol.GBP,
      bid: 0.9035,
      ask: 0.9038,
    }
  ];

  findCurrencyPairRate = ({ baseSymbol, quoteSymbol }: CurrencyPair): ExchangeRate | undefined =>
    this.currentRates.find(({ baseSymbol: b, quoteSymbol: q }) => baseSymbol === b && quoteSymbol === q);
};
