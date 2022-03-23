import { gql, useMutation } from '@apollo/client';
import { Formik, Form, Field } from 'formik';
import * as React from 'react';
import { useState } from 'react';
import * as Yup from 'yup';

export interface ILoginProps {}

interface RegisterInfo {
    email: string;
    password: string;
}

const LOGIN_USER = gql`
    mutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            ... on LoginSuccess {
                user {
                    id
                    username
                    token 
                }
            }
            ... on LoginError {
                message
            }
        }
    }
`;

export function Login(props: ILoginProps) {
    const initialValues: RegisterInfo = {
        email: '',
        password: ''
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required(),
        password: Yup.string().max(50).required()
    });

    const [loginErrorMsg, setLoginErrorMsg] = useState<string>();
    const [loginUser] = useMutation(LOGIN_USER);
    const onSubmit = async (userInfo: RegisterInfo) => {
        const { email, password } = userInfo;
        try {
            const { data } = await loginUser({
                variables: {
                    email,
                    password
                }
            });
            if (data.login.message) {
                setLoginErrorMsg(data.login.message);
            }
            console.log(data);
            const { username, token, id } = data.login.user 
            localStorage.setItem('accessToken', token);
            localStorage.setItem('username', username);
            localStorage.setItem('id', id);
            localStorage.setItem('loggedIn', 'true');
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {({ errors, touched }) => (
                    <Form>
                        <div className="sign_in_details">
                            <label className="sign_in_label required" htmlFor="">
                                Email
                            </label>
                            <Field className="sign_in_field" name="email" type="email" />
                            {errors.email && touched.email ? <div className="sign_in_field_errors">{errors.email}</div> : null}
                        </div>
                        <div className="sign_in_details">
                            <label className="sign_in_label required" htmlFor="">
                                Password
                            </label>
                            <Field className="sign_in_field" name="password" type="password" />
                            {errors.password && touched.password ? <div className="sign_in_field_errors">{errors.password}</div> : null}
                        </div>
                        <div className="sign_in_error_msg">{loginErrorMsg}</div>

                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
