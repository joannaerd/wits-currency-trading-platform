import { generateSpread } from './generateSpread';

const testCases = Array.from({ length: 50 });

it('returns the results within correct range by default', () => {
    testCases.forEach(() => {
        const defaultMin = .001;
        const defaultMax = .004;
        const result = generateSpread();

        expect(result).toBeGreaterThanOrEqual(defaultMin);
        expect(result).toBeLessThanOrEqual(defaultMax);
    });
});

it('returns the results within correct range with changed parameters', () => {
    testCases.forEach(() => {
        const min = .005;
        const max = .009;
        const result = generateSpread(min, max);

        expect(result).toBeGreaterThanOrEqual(min);
        expect(result).toBeLessThanOrEqual(max);
    });
})
