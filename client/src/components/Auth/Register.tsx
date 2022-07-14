import * as React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import { RegisterInput, RegisterResult, RegisterError, RegisterUserDocument } from '../../generated/graphql-client';
import styles from './Register.module.css'
import { CloseBtn } from '../helpers/Icons';

export interface IRegisterProps {
    setDisplayRegisterForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Register({setDisplayRegisterForm}: IRegisterProps) {
    const initialValues: RegisterInput = {
        username: '',
        email: '',
        password: ''
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().max(50).required('This field is required'),
        email: Yup.string().email('Invalid email').required('This field is required'),
        password: Yup.string().max(50).required('This field is required')
    });

    const [registerErrorMsg, setRegisterErrorMsg] = useState<string>();
    const [registerUser] = useMutation(RegisterUserDocument);
    const onSubmit = async (userInfo: RegisterInput) => {
        const { username, email, password } = userInfo;
        try {
            const { data } = await registerUser({
                variables: {
                    input: {
                        username,
                        email,
                        password
                    }
                }
            });
            // make the data!.resiger into a register error first 
            if ((data!.register as RegisterError).message) {
                setRegisterErrorMsg((data!.register as RegisterError).message);
            }
        } catch (error: any) {
            console.error('Error with registering: ');
            console.error(error);
        }
    };

    return (
        <div className={styles.container}>
            <CloseBtn
                className={styles.close_btn}
                type="button"
                onClick={() => {
                    setDisplayRegisterForm(false);
                }}
            ></CloseBtn>
            <div className={styles.title_container}>
                <div className={styles.title}>Register</div>
            </div>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {({ errors, touched }) => (
                    <Form className={styles.form}>
                        <div className={styles.form_container}>
                            <div className={styles.sign_up_details}>
                                <label className={styles.sign_up_label} htmlFor="">
                                    Username
                                </label>
                                <Field className={styles.sign_up_field} name="username" type="text" />
                                {errors.username && touched.username ? <div className={styles.sign_up_field_errors}>{errors.username}</div> : null}
                            </div>
                            <div className={styles.sign_up_details}>
                                <label className={styles.sign_up_label} htmlFor="">
                                    Email
                                </label>
                                <Field className={styles.sign_up_field} name="email" type="email" />
                                {errors.email && touched.email ? <div className={styles.sign_up_field_errors}>{errors.email}</div> : null}
                            </div>
                            <div className={styles.sign_up_details}>
                                <label className={styles.sign_up_label} htmlFor="">
                                    Password
                                </label>
                                <Field className={styles.sign_up_field} name="password" type="password" />
                                {errors.password && touched.password ? <div className={styles.sign_up_field_errors}>{errors.password}</div> : null}
                            </div>
                            <div className={styles.sign_up_error_msg}>{registerErrorMsg}</div>

                            <div className={styles.btn_container}>
                                <button
                                    className="btn btn-primary"
                                    style={{
                                        width: '100%',
                                        fontSize: '16px'
                                    }}
                                    type="submit"
                                >
                                    Register
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
