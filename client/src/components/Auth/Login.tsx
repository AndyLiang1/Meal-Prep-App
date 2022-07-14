import { gql, useMutation } from '@apollo/client';
import { Formik, Form, Field } from 'formik';
import * as React from 'react';
import { useState } from 'react';
import * as Yup from 'yup';
import { bindActionCreators } from 'redux';
// import { login } from '../../state/action-creators';
import { useDispatch } from 'react-redux';
import { actionCreators } from '../../state';
import { useNavigate } from 'react-router-dom';
import { addUserToStore } from '../../state/action-creators';
import { LoginError, LoginResult, LoginSuccess, LoginUserDocument } from '../../generated/graphql-client';
import styles from './Login.module.css';
import { CloseBtn } from '../helpers/Icons';

export interface ILoginProps {
    setDisplayLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
}

interface LoginInput {
    email: string;
    password: string;
}

export function Login({ setDisplayLoginForm }: ILoginProps) {
    const initialValues: LoginInput = {
        email: '',
        password: ''
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('This field is required'),
        password: Yup.string().max(50).required('This field is required')
    });

    const navigate = useNavigate();

    const [loginErrorMsg, setLoginErrorMsg] = useState<string>();
    const [loginUser] = useMutation(LoginUserDocument);
    const onSubmit = async (userInfo: LoginInput) => {
        const { email, password } = userInfo;
        try {
            const { data } = await loginUser({
                variables: {
                    email,
                    password
                }
            });
            if ((data!.login as LoginError).message) {
                setLoginErrorMsg((data!.login as LoginError).message);
            }
            const { username, accessToken, id } = (data!.login as LoginSuccess).user;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('username', username);
            localStorage.setItem('id', id);
            localStorage.setItem('loggedIn', 'true');
            navigate('./userData');
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className={styles.container}>
            <CloseBtn
                className={styles.close_btn}
                type="button"
                onClick={() => {
                    setDisplayLoginForm(false);
                }}
            ></CloseBtn>
            <div className={styles.title_container}>
                <div className={styles.title}>Login</div>
            </div>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {({ errors, touched }) => (
                    <Form className={styles.form}>
                        <div className={styles.form_container}>
                            <div className={styles.sign_in_details}>
                                <label className={styles.sign_in_label} htmlFor="">
                                    Email
                                </label>
                                <Field className={styles.sign_in_field} name="email" type="email" />
                                {errors.email && touched.email ? <div className={styles.sign_in_field_errors}>{errors.email}</div> : null}
                            </div>
                            <div className={styles.sign_in_details}>
                                <label className={styles.sign_in_label} htmlFor="">
                                    Password
                                </label>
                                <Field className={styles.sign_in_field} name="password" type="password" />
                                {errors.password && touched.password ? <div className={styles.sign_in_field_errors}>{errors.password}</div> : null}
                            </div>
                            <div className={styles.sign_in_error_msg}>{loginErrorMsg}</div>

                            <div className={styles.btn_container}>
                                <button
                                    className="btn btn-primary"
                                    style={{
                                        width: '100%',
                                        fontSize: '16px'
                                    }}
                                    type="submit"
                                >
                                    Login
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
