import * as React from 'react';
import { Login } from '../components/Auth/Login';
import { Register } from '../components/Auth/Register';
import { Header } from '../components/Others/Header';

export interface IAuthProps {}

export function Auth(props: IAuthProps) {
    return (
        <div>
            <Header></Header>
            <Register></Register>
            <Login></Login>
        </div>
    );
}
