import * as React from 'react';
import { useState } from 'react';
import { Login } from '../components/Auth/Login';
import { Register } from '../components/Auth/Register';
import { Header } from '../components/Others/Header';
import styles from './Auth.module.css';
export interface IAuthProps {}

export function Auth(props: IAuthProps) {
    const [displayRegisterForm, setDisplayRegisterForm] = useState(false);
    const [displayLoginForm, setDisplayLoginForm] = useState(false);
    const handleSignUpClicked = () => {
        if (!displayLoginForm) {
            setDisplayRegisterForm(true);
        }
    };

    const handleSignInClicked = () => {
        if (!displayRegisterForm) {
            setDisplayLoginForm(true);
        }
    };
    return (
        <div>
            <Header></Header>
            <div className={styles.content}>
                <div className={styles.left_side}></div>
                <div className={styles.right_side}>
                    <div className={styles.title_container}>
                        <div className={styles.title}>All your meal and food information laid out in one spot!</div>
                    </div>
                    <div className={styles.btn_container}>
                        <button onClick={handleSignUpClicked} className={styles.sign_up_btn}>
                            Register
                        </button>
                        <button onClick={handleSignInClicked} className={styles.sign_in_btn}>
                            Login
                        </button>
                    </div>

                    {displayRegisterForm && <Register setDisplayRegisterForm={setDisplayRegisterForm}></Register>}
                    {displayLoginForm && <Login setDisplayLoginForm={setDisplayLoginForm}></Login>}
                </div>
            </div>
        </div>
    );
}
