import { generateRates } from './helpers/generateRate';

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
TASK 6: Exchange rates history (type, class fields and methods)
In order to show market trends, historical rates should be stored.

- Define a new type `ExchangeRateHistoryItem` (composed of ExchangeRate properties and a date)
- In `Market` class (below), define the field `exchangeRateHistory` and initialize it as an empty array
- In `Market` class, define a method `saveRatesHistory` which appends the current exchange rates to `exchangeRateHistory` field.
- Refactor `updateRates` method to call `saveRatesHistory`
- In `Market` class, define a method `getRatesHistory` retrieving rates history for a given currency pair

In  `App.tsx` change the UI version to 3 for preview.
*/

export class Market {
  currentRates: ExchangeRate[] = [];

  constructor(initialRates: ExchangeRate[] = [
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
  ]) {
    this.updateRates(initialRates);
  };

  findCurrencyPairRate = ({ baseSymbol, quoteSymbol }: CurrencyPair): ExchangeRate | undefined =>
    this.currentRates.find(({ baseSymbol: b, quoteSymbol: q }) => baseSymbol === b && quoteSymbol === q);

  updateRates = (rates: ExchangeRate[] = generateRates(this.currentRates)): void => {
    this.currentRates = rates;
  };
};
