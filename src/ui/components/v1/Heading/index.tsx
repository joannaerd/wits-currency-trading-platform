import React, { FC } from 'react';

import './style.scss';

type Props = {
    level?: number;
    className?: string;
};

export const Heading: FC<Props> = ({ level = 2, className, ...props }) => {
    const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    const newClassName = `Heading ${className || ''}`;

    return <Tag  {...props} className={newClassName} />
};
