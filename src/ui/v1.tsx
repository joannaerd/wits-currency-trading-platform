import React, { FC, useState } from 'react';

import { MainLayout } from './components/v0/MainLayout';
import { CurrencyPairList } from './components/v1/CurrencyPairList';
import { CurrencyPairDetails } from './components/v1/CurrencyPairDetails';

import { CurrencyPair, Market } from './types/v1';

const market = new Market();

export const UI: FC = () => {
    const [selectedPair, setSelectedPair] = useState<CurrencyPair>(market.currentRates[0]);
  
    return (
        <MainLayout isSingle>
            <CurrencyPairList
                currentRates={market.currentRates}
                selectedPair={selectedPair}
                onRowClick={setSelectedPair}
            />

            <CurrencyPairDetails currencyPair={selectedPair} market={market} />
        </MainLayout>
    );
};