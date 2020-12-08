import { ExchangeRate } from '../solution/solution';

import { generatePrice } from './generatePrice';
import { generateSpread } from './generateSpread';

export const generateRate = (oldRate: ExchangeRate) => {
    const { bid: oldBid } = oldRate;

    const bid = parseFloat(generatePrice(oldBid).toFixed(5));
    const ask = parseFloat((bid + generateSpread()).toFixed(5));

    return { ...oldRate, bid, ask };
};

export const generateRates = (oldRates: ExchangeRate[]) => oldRates.map(generateRate);
