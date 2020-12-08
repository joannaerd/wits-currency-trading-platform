import { generateRates } from '../helpers/generateRate';

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

export type OrderParameters = CurrencyPair & {
    amount: number;
};

export enum Operation {
    BUY = 'BUY',
    SELL = 'SELL',
};

export type Order = OrderParameters & {
    operation: Operation;
    date: Date;
};

export type Price = {
    bid: number,
    ask: number
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

export class Portfolio {
    market: Market;
    currentPositions: CurrencyPositions = {
        [CurrencySymbol.EUR]: 1000,
        [CurrencySymbol.GBP]: 2000,
        [CurrencySymbol.USD]: 3000,
    };
    ordersHistory: Order[] = [];

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

    saveOrder = (order: Order): void => {
        this.ordersHistory = [...this.ordersHistory, order];
    };

    buy = (orderParameters: OrderParameters): void => {
        const { baseSymbol, quoteSymbol, amount } = orderParameters;
        const currentBasePosition = this.currentPositions[baseSymbol];
        const currentQuotePosition = this.currentPositions[quoteSymbol];

        const askQuote = this.market.calculateAskQuote(orderParameters);

        if (askQuote && askQuote <= currentQuotePosition) {
            this.setPosition(baseSymbol, currentBasePosition + amount);
            this.setPosition(quoteSymbol, currentQuotePosition - askQuote);

            this.saveOrder({ ...orderParameters, operation: Operation.BUY, date: new Date() });
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

            this.saveOrder({ ...orderParameters, operation: Operation.SELL, date: new Date() });
        }
    };
};
