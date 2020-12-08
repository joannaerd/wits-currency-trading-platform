export const generateSpread = (min: number = .001, max: number = .004): number => {
    return Math.random() * (max - min) + min;
};