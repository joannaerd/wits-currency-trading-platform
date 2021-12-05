import { generateRates } from './helpers/generateRate';

export enum CurrencySymbol {
  USD = 'USD',
  EUR = 'EUR',
  PLN = 'PLN',
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

1. Define a new type `ExchangeRateHistoryItem` (composed of ExchangeRate properties and a date)
2. In `Market` class (below), define the field `exchangeRateHistory` and initialize it as an empty array
3. In `Market` class, define a method `saveRatesHistory` which appends the current exchange rates to `exchangeRateHistory` field.
4. Refactor `updateRates` method to call `saveRatesHistory`
5. In `Market` class, define a method `getRatesHistory` retrieving rates history for a given currency pair

In  `App.tsx` change the UI version to 3 for preview.
*/

export class Market {
  currentRates: ExchangeRate[] = [];

  constructor(initialRates: ExchangeRate[] = [
    {
        baseSymbol: CurrencySymbol.EUR,
        quoteSymbol: CurrencySymbol.USD,
        bid: 1.1313,
        ask: 1.1323,
    },
    {
        baseSymbol: CurrencySymbol.PLN,
        quoteSymbol: CurrencySymbol.USD,
        bid: 0.24595,
        ask: 0.24591,
    },
    {
        baseSymbol: CurrencySymbol.EUR,
        quoteSymbol: CurrencySymbol.PLN,
        bid: 4.5963,
        ask: 4.6023,
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
