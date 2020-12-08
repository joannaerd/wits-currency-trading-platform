import React, { FC, useCallback, useState } from 'react';
import { Button, Callout, Card, FormGroup, NumericInput } from '@blueprintjs/core';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, YAxis } from 'recharts';

import { Heading } from '../../v1/Heading';

import { ExchangeRate, ExchangeRateHistoryItem, Market, Portfolio } from '../../../types/v6';

import './style.scss';

type Props = ExchangeRate & {
    market: Market;
    portfolio: Portfolio;
};

const getTime = (d: Date) => `${d.getHours()}:${d.getMinutes()}.${d.getSeconds()}`
const getChartData = (items: ExchangeRateHistoryItem[]) => {
    const limit = 20;
    const start = Math.max(items.length - limit, 0);
    return items.slice(start, items.length).map(item => ({ ...item, time: getTime(item.date) }));
}

export const CurrencyPairDetailsContent: FC<Props> = ({ baseSymbol, quoteSymbol, bid, ask, market, portfolio }) => {
    const [currentBuyAmount, setCurrentBuyAmount] = useState(100);
    const [currentSellAmount, setCurrentSellAmount] = useState(100);

    const basePosition = portfolio.currentPositions[baseSymbol];
    const quotePosition = portfolio.currentPositions[quoteSymbol];
    const buyOrderParameters = { baseSymbol, quoteSymbol, amount: currentBuyAmount };
    const sellOrderParameters = { baseSymbol, quoteSymbol, amount: currentSellAmount };
    const askQuote = portfolio.market.calculateAskQuote(buyOrderParameters);
    const bidQuote = portfolio.market.calculateBidQuote(sellOrderParameters);
    const canBuy = askQuote && quotePosition >= askQuote;
    const canSell = basePosition >= currentSellAmount;

    const onBuyClick = useCallback(() => {
        canBuy && portfolio.buy({ baseSymbol, quoteSymbol, amount: currentBuyAmount });
    }, [canBuy, baseSymbol, currentBuyAmount, portfolio, quoteSymbol]);

    const onSellClick = useCallback(() => {
        canSell && portfolio.sell({ baseSymbol, quoteSymbol, amount: currentSellAmount });
    }, [canSell, baseSymbol, currentSellAmount, portfolio, quoteSymbol]);

    return (
        <Card className="CurrencyPairDetails">
            <header className="CurrencyPairDetails__header">
                <Heading>{baseSymbol}/{quoteSymbol}</Heading>

                <span className="CurrencyPairDetails__description">
                    position: <strong>{basePosition.toFixed(2)}</strong>
                </span>
            </header>

            <section className="CurrencyPairDetails__actions">
                <Callout className="CurrencyPairDetails__action">
                    <h3 className="CurrencyPairDetails__subheading">
                        BID&nbsp;
                        <strong className="Text Text--danger">{bid.toFixed(5)}</strong>
                    </h3>

                    <section className="CurrencyPairDetails__controls">
                        <FormGroup
                            helperText={bidQuote ? `value: ${bidQuote.toFixed(2)}` : 'invalid value'}
                            intent={canSell ? 'none' : 'danger'}
                            labelFor="sell-input"
                        >
                            <NumericInput
                                fill={false}
                                id="sell-input"
                                min={0}
                                value={currentSellAmount}
                                onValueChange={setCurrentSellAmount}
                            />
                        </FormGroup>

                        <Button onClick={onSellClick} intent="danger" disabled={!canSell}>Sell</Button>
                    </section>
                </Callout>

                <Callout className="CurrencyPairDetails__action">
                    <h3 className="CurrencyPairDetails__subheading">
                        ASK&nbsp;
                        <strong className="Text Text--success">{ask.toFixed(5)}</strong>
                    </h3>

                    <section className="CurrencyPairDetails__controls">
                        <FormGroup
                            helperText={askQuote ? `value: ${askQuote.toFixed(2)}` : 'invalid value'}
                            intent={canBuy ? 'none' : 'danger'}
                            labelFor="buy-input"
                        >
                            <NumericInput
                                fill={false}
                                id="buy-input"
                                min={0}
                                value={currentBuyAmount}
                                onValueChange={setCurrentBuyAmount}
                            />
                        </FormGroup>

                        <Button onClick={onBuyClick} intent="success" disabled={!canBuy}>Buy</Button>
                    </section>
                </Callout>
            </section>

            <section className="CurrencyPairDetails__chart">
                <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={getChartData(market.getRatesHistory({ baseSymbol, quoteSymbol }))}>
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
