import React, { FC } from 'react';
import { Button, Navbar, NavbarGroup, NavbarHeading } from '@blueprintjs/core';

import "./style.scss";

type Props = {
    secondsLeft?: number;
    onUpdateClick?: () => void;
    isSingle?: boolean;
}
export const MainLayout: FC<Props> = ({ secondsLeft, onUpdateClick = () => { }, isSingle, children }) => {
    const secondsHelperString = typeof secondsLeft === 'number' ? `0${secondsLeft}` : '';
    const secondsString = secondsHelperString.substring(secondsHelperString.length - 2);

    return (
        <div className="MainLayout bp3-dark">
            <Navbar fixedToTop>
                <NavbarGroup>
                    <NavbarHeading>Currency Trading Platform</NavbarHeading>
                </NavbarGroup>

                {secondsString && (
                    <NavbarGroup align="right">
                        <span className="MainLayout__timer">Time to update: <strong>0:{secondsString}</strong></span>

                        <Button onClick={onUpdateClick}> Update now </Button>
                    </NavbarGroup>
                )}
            </Navbar>

            <main className={`MainLayout__content ${isSingle ? 'MainLayout__content--single' : ''}`}>
                {children}
            </main>
        </div>
    );
}