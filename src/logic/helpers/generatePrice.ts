export const generatePrice = (oldPrice: number, volatility: number = .1): number => {
    const rnd = Math.random();
    let changePercent = 2 * volatility * rnd;
    if (changePercent > volatility) {
        changePercent -= (2 * volatility);
    }

    return Math.max(0, oldPrice * (1 + changePercent));
};
