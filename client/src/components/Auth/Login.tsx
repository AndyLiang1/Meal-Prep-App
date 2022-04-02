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
import { LoginError, LoginResult, LoginSuccess } from '../../generated/graphql-client';

export interface ILoginProps {}

interface LoginInput {
    email: string;
    password: string;
}

const LOGIN_USER = gql`
    mutation LoginUser($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            ... on LoginSuccess {
                user {
                    id
                    username
                    accessToken
                }
            }
            ... on LoginError {
                message
            }
        }
    }
`;

export function Login(props: ILoginProps) {
    const initialValues: LoginInput = {
        email: '',
        password: ''
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required(),
        password: Yup.string().max(50).required()
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //
    const [loginErrorMsg, setLoginErrorMsg] = useState<string>();
    const [loginUser] = useMutation<{ login: LoginResult }, LoginInput>(LOGIN_USER);
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
