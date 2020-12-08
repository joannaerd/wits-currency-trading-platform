import React, { FC } from 'react';
import { Card } from '@blueprintjs/core';

import { Table, TableCell, TableHeading, TableRow } from '../Table';

import { Heading } from '../Heading';

import { CurrencyPair, Market } from '../../../types/v1';

import './style.scss';

type Props = Pick<Market, 'currentRates'> & {
    selectedPair: CurrencyPair,
    onRowClick: (currencyPair: CurrencyPair) => void;
};

export const CurrencyPairList: FC<Props> = ({ currentRates, selectedPair, onRowClick = () => { } }) => (
    <Card className="CurrencyPairList">
        <Heading>Current exchange rates</Heading>

        <Table>
            <thead>
                <TableRow>
                    <TableHeading />
                    <TableHeading />
                    <TableHeading>bid</TableHeading>
                    <TableHeading>ask</TableHeading>
                </TableRow>
            </thead>

            <tbody>
                {currentRates.map(({ baseSymbol, quoteSymbol, bid, ask }) => {
                    const isSelected = selectedPair.baseSymbol === baseSymbol && selectedPair.quoteSymbol === quoteSymbol;
                    const onClick = () => onRowClick({ baseSymbol: baseSymbol, quoteSymbol });

                    return (
                        <TableRow
                            key={`${baseSymbol}${quoteSymbol}`}
                            onClick={onClick}
                            isSelected={isSelected}
                        >
                            <TableCell>{baseSymbol}</TableCell>
                            <TableCell>{quoteSymbol}</TableCell>
                            <TableCell isNumeric>{bid.toFixed(5)}</TableCell>
                            <TableCell isNumeric>{ask.toFixed(5)}</TableCell>
                        </TableRow>
                    );
                })}
            </tbody>
        </Table>
    </Card>
);
