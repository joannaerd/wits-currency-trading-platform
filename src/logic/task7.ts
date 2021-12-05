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

export type ExchangeRateHistoryItem = ExchangeRate & {
  date: Date;
};

export class Market {
  currentRates: ExchangeRate[] = [];
  exchangeRatesHistory: ExchangeRateHistoryItem[] = [];

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
    this.saveRatesHistory();
  };

  saveRatesHistory = () => {
    const date = new Date();
    const exchangeRatesHistoryItems = this.currentRates.map(rate => ({ ...rate, date }));
    this.exchangeRatesHistory = [...this.exchangeRatesHistory, ...exchangeRatesHistoryItems];
  };

  getRatesHistory = ({ baseSymbol, quoteSymbol }: CurrencyPair): ExchangeRateHistoryItem[] => {
    return this.exchangeRatesHistory.filter(({ baseSymbol: b, quoteSymbol: q }) => baseSymbol === b && quoteSymbol === q);
  }
};

/*
TASK 7: Portfolio (class definition)
A collection of financial investments is called a portfolio.

1. Define the type `CurrencyPositions` using the following syntax:
export type CurrencyPositions = { [key in keyof typeof CurrencySymbol]: number };

2. Define the class `Portfolio`
3. Define a field `currentPositions` of `CurrencyPositions` type and initialize it with the following value:
  {
      [CurrencySymbol.EUR]: 1000,
      [CurrencySymbol.GBP]: 2000,
      [CurrencySymbol.USD]: 3000,
  };

4. Allow the optional value of `currentPositions` to be initalized with a given value in the constructor

In  `App.tsx` change the UI version to 4 for preview.
*/
