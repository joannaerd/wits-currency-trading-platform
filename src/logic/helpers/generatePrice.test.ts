import { generatePrice } from './generatePrice';

const testCases = Array.from({ length: 50 }, () => Math.floor(Math.random() * 50));

it('returns the results within correct range by default', () => {
    testCases.forEach((basePrice) => {
        const defaultMargin = 0.2;
        const result = generatePrice(basePrice);

        expect(result).toBeGreaterThanOrEqual(basePrice * (1 - defaultMargin));
        expect(result).toBeLessThanOrEqual(basePrice * (1 + defaultMargin));
    });
});

it('returns the results within correct range with changed volatility', () => {
    testCases.forEach((basePrice) => {
        const volatility = 1;
        const result = generatePrice(basePrice, volatility);

        expect(result).toBeGreaterThanOrEqual(basePrice * (1 - 2 * volatility));
        expect(result).toBeLessThanOrEqual(basePrice * (1 + 2 * volatility));
    });
});

it('returns only positive values', () => {
    const negativeTestCases = Array.from({ length: 50 }, () => -Math.floor(Math.random() * 50));
    negativeTestCases.forEach((basePrice) => {
        const result = generatePrice(basePrice);

        expect(result).toBeGreaterThanOrEqual(0);
    });
});