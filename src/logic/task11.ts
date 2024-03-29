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
            bid: 1.1313,
            ask: 1.1323,
        },
        {
            baseSymbol: CurrencySymbol.USD,
            quoteSymbol: CurrencySymbol.PLN,
            bid: 4.0654,
            ask: 4.0668,
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

    calculateBidQuote = ({ baseSymbol, quoteSymbol, amount }: OrderParameters): number | null => {
        const pair = this.findCurrencyPairRate({ baseSymbol, quoteSymbol });

        if (pair) {
            const rate = pair.bid;
            return rate * amount;
        }

        return null;
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
TASK 10: Orders history (type & class methods)
1. Define a new enum `Operation`, holding the values of 'BUY' and 'SELL'
2. Define a new type `Order`, consisting of the properties of `OrderParameters`, a `date` and `operation`.
3. In `Portfolio` class (below), define the field `ordersHistory` and initialize it with an empty array
4. In `Portfolio` class, define the method `saveOrder` adding the given order to `ordersHistory`
5. Add `saveOrder` call in `buy` and `sell` methods

In `App.tsx` change the UI version to 7 for preview.
*/

export class Portfolio {
    market: Market;
    currentPositions: CurrencyPositions = {
        [CurrencySymbol.EUR]: 1000,
        [CurrencySymbol.PLN]: 2000,
        [CurrencySymbol.USD]: 3000,
    };

    constructor(market: Market, initialPositions?: CurrencyPositions) {
        this.market = market;

        if (initialPositions) {
            this.currentPositions = initialPositions;
        }
    }

    setPosition = (symbol: CurrencySymbol, amount: number): void => {
        this.currentPositions = {
            ...this.currentPositions,
            [symbol]: amount
        };
    };

    buy = (orderParameters: OrderParameters): void => {
        const { baseSymbol, quoteSymbol, amount } = orderParameters;
        const currentBasePosition = this.currentPositions[baseSymbol];
        const currentQuotePosition = this.currentPositions[quoteSymbol];

        const askQuote = this.market.calculateAskQuote(orderParameters);

        if (askQuote && askQuote <= currentQuotePosition) {
            this.setPosition(baseSymbol, currentBasePosition + amount);
            this.setPosition(quoteSymbol, currentQuotePosition - askQuote);
        }
    };

    sell = (orderParameters: OrderParameters): void => {
        const { baseSymbol, quoteSymbol, amount } = orderParameters;
        const currentBasePosition = this.currentPositions[baseSymbol];
        const currentQuotePosition = this.currentPositions[quoteSymbol];

        const bidQuote = this.market.calculateBidQuote(orderParameters);

        if (bidQuote && amount <= currentBasePosition) {
            this.setPosition(baseSymbol, currentBasePosition - amount);
            this.setPosition(quoteSymbol, currentQuotePosition + bidQuote);
        }
    };
};
