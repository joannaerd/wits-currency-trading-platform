import React, { FC } from 'react';

import './style.scss';

type BaseProps = {
    className?: string;
};

export const Table: FC<BaseProps> = ({ className, ...props }) => {
    const newClassName = `Table ${className || ''}`;
    return <table cellSpacing="0" {...props} className={newClassName} />
};

type RowProps = BaseProps & {
    isSelected?: boolean;
    onClick?: (params: any) => void
};

export const TableRow: FC<RowProps> = ({ className, isSelected, ...props }) => {
    const newClassName = `Table__row ${isSelected ? 'Table__row--selected' : ''} ${className || ''}`;

    return <tr {...props} className={newClassName} />
};

export const TableHeading: FC<BaseProps> = ({ className, ...props }) => {
    const newClassName = `Table__heding ${className || ''}`;
    return <th {...props} className={newClassName} />
};

type CellProps = BaseProps & {
    isNumeric?: boolean;
};

export const TableCell: FC<CellProps> = ({ className, isNumeric, ...props }) => {
    const newClassName = `Table__cell ${isNumeric ? 'Table__cell--numeric' : ''} ${className || ''}`;
    return <td {...props} className={newClassName} />
};
