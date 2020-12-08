import React, { FC, useCallback, useEffect, useState } from 'react';

import { MainLayout } from './components/v0/MainLayout';
import { CurrencyPairList } from './components/v1/CurrencyPairList';
import { CurrencyPairDetails } from './components/v5/CurrencyPairDetails';
import { PortfolioPreview } from './components/v4/PortfolioPreview';

import { CurrencyPair, Market, Portfolio } from './types/v5';

const REFRESH_INTERVAL = 5;
let timerInterval: ReturnType<typeof setInterval>;

const market = new Market();
const portfolio = new Portfolio(market);

export const UI: FC = () => {
    const [selectedPair, setSelectedPair] = useState<CurrencyPair>(market.currentRates[0]);
    const [secondsLeft, setSecondsLeft] = useState(REFRESH_INTERVAL);

    const updateRates = useCallback(() => {
        market.updateRates();
        setSecondsLeft(REFRESH_INTERVAL);
    }, [setSecondsLeft]);

    useEffect(() => {
        timerInterval = setInterval(() => {
            if (secondsLeft < 1) {
                updateRates();
            } else {
                setSecondsLeft(secondsLeft - 1);
            }
        }, 1000);

        return () => {
            clearInterval(timerInterval);
        };
    })

    return (
        <MainLayout secondsLeft={secondsLeft} onUpdateClick={updateRates}>
            <CurrencyPairList
                currentRates={market.currentRates}
                selectedPair={selectedPair}
                onRowClick={setSelectedPair}
            />

            <CurrencyPairDetails currencyPair={selectedPair} market={market} portfolio={portfolio} />

            <PortfolioPreview portfolio={portfolio} />
        </MainLayout>
    );
};