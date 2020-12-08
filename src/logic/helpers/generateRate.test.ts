import { generateRate } from './generateRate';

import { CurrencySymbol, ExchangeRate } from '../solution/solution'

const testCases = Array.from({ length: 50 }, () => Math.floor(Math.random() * 50));

it('returns correct values', () => {
    testCases.forEach(testCase => {
        const initialData: ExchangeRate = {
            baseSymbol: CurrencySymbol.USD, quoteSymbol: CurrencySymbol.EUR, bid: testCase, ask: testCase - .001,
        };

        const result = generateRate(initialData);

        expect(result.bid).toBeGreaterThanOrEqual(0.8 * initialData.bid);
        expect(result.bid).toBeLessThanOrEqual(1.2 * initialData.bid);
        expect(result.ask - result.bid).toBeGreaterThanOrEqual(.001);
        expect(result.ask - result.bid).toBeLessThanOrEqual(.004);
    });
})