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


export type CurrencyPositions = { [key in keyof typeof CurrencySymbol]: number };

export class Portfolio {
    currentPositions: CurrencyPositions = {
        [CurrencySymbol.EUR]: 1000,
        [CurrencySymbol.GBP]: 2000,
        [CurrencySymbol.USD]: 3000,
    };

    constructor(initialPositions?: CurrencyPositions) {
        if (initialPositions) {
            this.currentPositions = initialPositions;
        }
    }
};

/*
TASK 8: Buy quote (type & class methods)
When executing a buy market order, the amount of quote currency to be paid is calculated by multiplying the amount of base currency requested and the ask price.

1. Define a new type `OrderParameters`, consisting of the properties of `CurrencyPair` and a numeric `amount`
2. In `Market` class (below), define the method `calculateAskQuote` returning the quote for a given currency pair.
3. To get exchange rates, use the method `findCurrencyPairRate`
*/

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
    };
};
