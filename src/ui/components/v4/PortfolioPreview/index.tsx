import React, { FC } from 'react';
import { Card } from '@blueprintjs/core';

import { Table, TableCell, TableHeading, TableRow } from '../../v1/Table';
import { Heading } from '../../v1/Heading';

import { Portfolio } from '../../../types/v4';

import './style.scss';

type Props = {
    portfolio: Portfolio;
};

export const PortfolioPreview: FC<Props> = ({ portfolio: { currentPositions } }) => (
    <Card className="PortfolioPreview">
        <Heading>Your portfolio</Heading>

        <Table>
            <thead>
                <TableRow>
                    <TableHeading />
                    <TableHeading>position</TableHeading>
                </TableRow>
            </thead>

            <tbody>
                {Object.entries(currentPositions).map(([symbol, position]) => (
                    <TableRow key={symbol}>
                        <TableCell>{symbol}</TableCell>
                        <TableCell isNumeric>{position.toFixed(2)}</TableCell>
                    </TableRow>
                ))}
            </tbody>
        </Table>
    </Card>
);
