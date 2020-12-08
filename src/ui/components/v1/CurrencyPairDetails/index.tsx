import React, { FC } from 'react';
import { Callout, Card } from '@blueprintjs/core';

import { Heading } from '../Heading';

import { CurrencyPair, Market } from '../../../types/v1';

import './style.scss';

type Props = {
    market: Market;
    currencyPair?: CurrencyPair;
};

export const CurrencyPairDetails: FC<Props> = ({ currencyPair, market }) => {
    if (!currencyPair) {
        return <Card>select currency pair</Card>;
    }

    const rate = market.findCurrencyPairRate(currencyPair);

    if (!rate) {
        return <Card>select different currency pair</Card>;
    }

    const { baseSymbol, quoteSymbol, bid, ask } = rate;

    return (
        <Card className="CurrencyPairDetails">
            <Heading>{baseSymbol}/{quoteSymbol}</Heading>

            <section className="CurrencyPairDetails__actions">
                <Callout className="CurrencyPairDetails__action">
                    <h3 className="CurrencyPairDetails__subheading">
                        BID&nbsp;
                        <strong className="Text Text--danger">{bid.toFixed(5)}</strong>
                    </h3>
                </Callout>

                <Callout className="CurrencyPairDetails__action">
                    <h3 className="CurrencyPairDetails__subheading">
                        ASK&nbsp;
                        <strong className="Text Text--success">{ask.toFixed(5)}</strong>
                    </h3>
                </Callout>
            </section>
        </Card>
    );
};
