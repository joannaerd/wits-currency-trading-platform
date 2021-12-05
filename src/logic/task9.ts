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

export type OrderParameters = CurrencyPair & {
    amount: number;
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
    };

    calculateAskQuote = ({ baseSymbol, quoteSymbol, amount }: OrderParameters): number | null => {
        const pair = this.findCurrencyPairRate({ baseSymbol, quoteSymbol });

        if (pair) {
            const rate = pair.ask;
            return rate * amount;
        }

        return null;
    };
};

export type CurrencyPositions = { [key in keyof typeof CurrencySymbol]: number };

/*
TASK 9: Buying (class methods)
Allow the user to perform buy operations.

1. In `Portfolio` class (below), add the `setPosition` method, changing the corresponding value in `currentPosition` for a given currency and amount
2. In `Portfolio` class, add  the field `market` and initialize it with a `Market` instance passed to the constructor. Make it the first argument (as `initialPositions` is optional).
3. In `Portfolio` class, add the `buy` method taking an `orderParameters` argument. It should calculate the quote and update positions for both currencies affected.
4. Add a constrain regarding available funds.

In `App.tsx` change the UI version to 5 for preview.
*/

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
