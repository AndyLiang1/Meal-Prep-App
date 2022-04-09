import * as React from 'react';
import style from './Header.module.css'
export interface IHeaderProps {
}

export function Header (props: IHeaderProps) {
  return (
    <div className = {style.header}>
      <h1 className = {style.title}>Meal Prep App</h1>
    </div>
  );
}
