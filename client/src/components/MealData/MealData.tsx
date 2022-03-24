import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/reducers';

export interface IMealDataProps {}

export function MealData(props: IMealDataProps) {
    const { user } = useSelector((state: RootState) => state);
    return (
        <div>
            <div>{user.username}</div>
            <div>{user.id}</div>
        </div>
    );
}
