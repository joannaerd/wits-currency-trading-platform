import React, { FC } from 'react';
import { Callout, Card } from '@blueprintjs/core';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, YAxis } from 'recharts';

import { Heading } from '../../v1/Heading';

import { CurrencyPair, ExchangeRateHistoryItem, Market, Portfolio } from '../../../types/v4';

import './style.scss';

type Props = {
    market: Market;
    currencyPair?: CurrencyPair;
    portfolio: Portfolio
};

const getTime = (d: Date) => `${d.getHours()}:${d.getMinutes()}.${d.getSeconds()}`
const getChartData = (items: ExchangeRateHistoryItem[]) => {
    const limit = 20;
    const start = Math.max(items.length - limit, 0);
    return items.slice(start, items.length).map(item => ({ ...item, time: getTime(item.date) }));
}

export const CurrencyPairDetails: FC<Props> = ({ currencyPair, market, portfolio }) => {
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
            <header className="CurrencyPairDetails__header">
                <Heading>{baseSymbol}/{quoteSymbol}</Heading>

                <span className="CurrencyPairDetails__description">
                    position: <strong>{portfolio.currentPositions[baseSymbol].toFixed(2)}</strong>
                </span>
            </header>

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

            <section className="CurrencyPairDetails__chart">
                <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={getChartData(market.getRatesHistory(currencyPair))}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <YAxis domain={['auto', 'auto']} />
                        <Line isAnimationActive={false} type="monotone" dataKey="bid" stroke="#FF7373" />
                        <Line isAnimationActive={false} type="monotone" dataKey="ask" stroke="#3DCC91" />
                    </LineChart>
                </ResponsiveContainer>
            </section>
        </Card>
    );
};
