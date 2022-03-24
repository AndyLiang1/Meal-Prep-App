import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MealData } from '../components/MealData/MealData';
import { login } from '../state/action-creators';
import { RootState } from '../state/reducers';
export interface IMealDataProps {}

export function UserData(props: IMealDataProps) {
    const { user } = useSelector((state: RootState) => state);
    const dispatch = useDispatch()
        


    
    useEffect(() => {
        if (!user.loggedIn) {
            const username = localStorage.getItem('username')!;
            const id = localStorage.getItem('id')!;
            const accessToken = localStorage.getItem('accessToken')!;
            dispatch(login({
              username, 
              id,
              accessToken,
              loggedIn: true
            }));
            console.log(accessToken);
        }
    });

    return (
        <div>
            <MealData></MealData>
            <div>{user.username}</div>
        </div>
    );
}
