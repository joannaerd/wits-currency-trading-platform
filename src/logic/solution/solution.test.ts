import { CurrencyPositions, CurrencySymbol, Market, Operation, Portfolio } from './solution';

const initialRates = [
    {
        baseSymbol: CurrencySymbol.EUR,
        quoteSymbol: CurrencySymbol.USD,
        bid: 0.95,
        ask: 1,
    },
    {
        baseSymbol: CurrencySymbol.GBP,
        quoteSymbol: CurrencySymbol.USD,
        bid: 1.95,
        ask: 2.05,
    },
    {
        baseSymbol: CurrencySymbol.GBP,
        quoteSymbol: CurrencySymbol.EUR,
        bid: 2.95,
        ask: 3.05,
    }
];

describe('Market', () => {
    let market = new Market(initialRates);

    beforeEach(() => {
        market = new Market(initialRates);
    });

    it('initializes currentRates properly', () => {
        expect(market.currentRates).toEqual(initialRates);
    });

    describe('calculate bidQuote', () => {
        it('returns correct value for valid pair', () => {
            const amount = 700;
            const result = market.calculateBidQuote({
                baseSymbol: CurrencySymbol.GBP,
                quoteSymbol: CurrencySymbol.USD,
                amount,
            })
            expect(result).toBe(amount * 1.95);
        });

        it('returns null for invalid pair', () => {
            const amount = 700;
            const result = market.calculateBidQuote({
                baseSymbol: CurrencySymbol.USD,
                quoteSymbol: CurrencySymbol.USD,
                amount,
            })
            expect(result).toBe(null);
        });
    });

    describe('calculate askQuote', () => {
        it('returns correct value for valid pair', () => {
            const amount = 700;
            const result = market.calculateAskQuote({
                baseSymbol: CurrencySymbol.GBP,
                quoteSymbol: CurrencySymbol.USD,
                amount,
            })
            expect(result).toBe(amount * 2.05);
        });

        it('returns null for invalid pair', () => {
            const amount = 700;
            const result = market.calculateAskQuote({
                baseSymbol: CurrencySymbol.USD,
                quoteSymbol: CurrencySymbol.USD,
                amount,
            })
            expect(result).toBe(null);
        });
    });
});

const initialPositions: CurrencyPositions = {
    [CurrencySymbol.USD]: 1000,
    [CurrencySymbol.EUR]: 1000,
    [CurrencySymbol.GBP]: 1000,
};

describe('Portfolio', () => {
    const market = new Market(initialRates);
    let portfolio: Portfolio = new Portfolio(market, initialPositions);

    beforeEach(() => {
        portfolio = new Portfolio(market, initialPositions);
    });

    it('initializes currentPositions properly', () => {
        expect(portfolio.currentPositions).toEqual(initialPositions);
    });

    describe('buy', () => {
        describe('with correct parameters', () => {
            const amount = 10;

            beforeEach(() => {
                portfolio.buy({
                    baseSymbol: CurrencySymbol.GBP,
                    quoteSymbol: CurrencySymbol.USD,
                    amount,
                });
            })

            it('updates position correctly', () => {
                expect(portfolio.currentPositions.GBP).toBe(1000 + amount);
                expect(portfolio.currentPositions.USD).toBe(1000 - (amount * 2.05));
            });

            it('saves the order in the history', () => {
                expect(portfolio.ordersHistory.length).toBe(1);

                expect(portfolio.ordersHistory[0].operation).toBe(Operation.BUY);
                expect(portfolio.ordersHistory[0].baseSymbol).toBe(CurrencySymbol.GBP);
                expect(portfolio.ordersHistory[0].quoteSymbol).toBe(CurrencySymbol.USD);
                expect(portfolio.ordersHistory[0].amount).toBe(amount);
                expect(typeof portfolio.ordersHistory[0].date).toBe('object');
            });
        });

        describe('with incorrect parameters', () => {
            it('does not update position if the amount is too big', () => {
                const amount = 15000;
                portfolio.buy({
                    baseSymbol: CurrencySymbol.GBP,
                    quoteSymbol: CurrencySymbol.USD,
                    amount,
                });
                expect(portfolio.currentPositions.USD).toBe(initialPositions.USD);
                expect(portfolio.currentPositions.USD).toBe(initialPositions.USD);
                expect(portfolio.ordersHistory.length).toBe(0);
            });

            it('does not update position if the pair is invalid', () => {
                const amount = 10;
                portfolio.buy({
                    baseSymbol: CurrencySymbol.USD,
                    quoteSymbol: CurrencySymbol.GBP,
                    amount,
                });
                expect(portfolio.currentPositions.GBP).toBe(initialPositions.GBP);
                expect(portfolio.currentPositions.USD).toBe(initialPositions.USD);
                expect(portfolio.ordersHistory.length).toBe(0);
            });
        });
    });

    describe('sell', () => {
        describe('with correct parameters', () => {
            const amount = 10;

            beforeEach(() => {
                portfolio.sell({
                    baseSymbol: CurrencySymbol.GBP,
                    quoteSymbol: CurrencySymbol.USD,
                    amount,
                });
            })

            it('updates position correctly', () => {
                expect(portfolio.currentPositions.GBP).toBe(1000 - amount);
                expect(portfolio.currentPositions.USD).toBe(1000 + (amount * 1.95));
            });

            it('saves the order in the history', () => {
                expect(portfolio.ordersHistory.length).toBe(1);

                expect(portfolio.ordersHistory[0].operation).toBe(Operation.SELL);
                expect(portfolio.ordersHistory[0].baseSymbol).toBe(CurrencySymbol.GBP);
                expect(portfolio.ordersHistory[0].quoteSymbol).toBe(CurrencySymbol.USD);
                expect(portfolio.ordersHistory[0].amount).toBe(amount);
                expect(typeof portfolio.ordersHistory[0].date).toBe('object');
            });
        });

        describe('with incorrect parameters', () => {
            it('does not update position if the amount is too big', () => {
                const amount = 15000;
                portfolio.buy({
                    baseSymbol: CurrencySymbol.GBP,
                    quoteSymbol: CurrencySymbol.USD,
                    amount,
                });
                expect(portfolio.currentPositions.GBP).toBe(initialPositions.GBP);
                expect(portfolio.currentPositions.USD).toBe(initialPositions.USD);
                expect(portfolio.ordersHistory.length).toBe(0);
            });

            it('does not update position if the pair is invalid', () => {
                const amount = 10;
                portfolio.buy({
                    baseSymbol: CurrencySymbol.USD,
                    quoteSymbol: CurrencySymbol.GBP,
                    amount,
                });
                expect(portfolio.currentPositions.GBP).toBe(initialPositions.GBP);
                expect(portfolio.currentPositions.USD).toBe(initialPositions.USD);
                expect(portfolio.ordersHistory.length).toBe(0);
            });
        });
    });
});