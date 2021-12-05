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


/*
TASK 10: Selling (class methods)
When executing a sell market order, the amount of quote currency to be obtained is calculated by multiplying the amount of base currency to be sold and the bid price.
Allow the user to perform sell operations.

1. In `Market` class (below), define the method `calculateBidQuote` returning the quote for a given currency pair.
2. In `Portfolio` class (below), add the `sell` method, taking an `orderParameters` argument. It should calculate the quote and update positions for both currencies affected.
3. Add a constrain regarding available funds.

In `App.tsx` change the UI version to 6 for preview.
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

export class Portfolio {
    market: Market;
    currentPositions: CurrencyPositions = {
        [CurrencySymbol.EUR]: 1000,
        [CurrencySymbol.GBP]: 2000,
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
};
