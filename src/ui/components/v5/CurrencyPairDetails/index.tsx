import React, { FC } from 'react';
import { Card } from '@blueprintjs/core';

import { CurrencyPairDetailsContent } from './content';

import { CurrencyPair, Market, Portfolio } from '../../../types/v5';

import './style.scss';

type Props = {
    market: Market;
    currencyPair?: CurrencyPair;
    portfolio: Portfolio;
};

export const CurrencyPairDetails: FC<Props> = ({ currencyPair, market, portfolio }) => {
    if (!currencyPair) {
        return <Card>select currency pair</Card>;
    }

    const rate = market.findCurrencyPairRate(currencyPair);

    if (!rate) {
        return <Card>select different currency pair</Card>;
    }

    return <CurrencyPairDetailsContent {...rate} portfolio={portfolio} market={market} />
};
