import * as React from 'react';
import style from './Header.module.css';
export interface IHeaderProps {}

export function Header(props: IHeaderProps) {
    return (
        <div className={style.header}>
            <div className={style.title}>Meal Prep App</div>
        </div>
    );
}
