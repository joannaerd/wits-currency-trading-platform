import React, { FC } from 'react';
import { Card } from '@blueprintjs/core';
import { formatDistanceToNowStrict } from 'date-fns';

import { Table, TableCell, TableRow } from '../../v1/Table';
import { Heading } from '../../v1/Heading';

import { Operation, Portfolio } from '../../../types/v7';

import './style.scss';

type Props = Pick<Portfolio, 'ordersHistory'>

export const OrdersHistory: FC<Props> = ({ ordersHistory }) => (
    <Card className="OrdersHistory">
        <Heading>Orders history</Heading>

        {!ordersHistory.length ? (
            <p className="OrdersHistory__placeholder">Nothing to show yet</p>
        ) : (
                <section className="OrdersHistory__content">
                    <Table>
                        <tbody>
                            {[...ordersHistory].reverse().map(({ baseSymbol, quoteSymbol, operation, amount, date }) => (
                                <TableRow key={date.toISOString()}>
                                    <TableCell>{baseSymbol}</TableCell>
                                    <TableCell>{quoteSymbol}</TableCell>
                                    <TableCell>
                                        <span className={`Text Text--${operation === Operation.BUY ? 'success' : 'danger'}`}>
                                            {operation}
                                        </span>
                                    </TableCell>
                                    <TableCell isNumeric>{amount.toFixed(2)}</TableCell>
                                    <TableCell><small>{formatDistanceToNowStrict(date)}</small></TableCell>
                                </TableRow>
                            ))}
                        </tbody>
                    </Table>
                </section>
            )}
    </Card>
);
