import * as React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import { RegisterInput, RegisterResult, RegisterError } from '../../generated/graphql-client';

export interface IRegisterProps {}

const REGISTER_USER = gql`
    mutation RegisterUser($input: RegisterInput!) {
        register(input: $input) {
            ... on RegisterSuccess {
                user {
                    id
                    username
                    email
                    password
                    accessToken
                    days {
                        meals {
                            foods {
                                calories
                            }
                        }
                    }
                }
            }

            ... on RegisterError {
                message
            }
            # username
        }
    }
`;

export function Register(props: IRegisterProps) {
    const initialValues: RegisterInput = {
        username: '',
        email: '',
        password: ''
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().max(50).required(),
        email: Yup.string().email('Invalid email').required(),
        password: Yup.string().max(50).required()
    });

    const [registerErrorMsg, setRegisterErrorMsg] = useState<string>();
    const [registerUser] = useMutation<{ register: RegisterResult }, { input: RegisterInput }>(REGISTER_USER);
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
            console.log('Error with registering: ');
            console.log(error);
        }
    };

    return (
        <div>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {({ errors, touched }) => (
                    <Form>
                        <div className="sign_up_details">
                            <label className="sign_up_label required" htmlFor="">
                                Username
                            </label>
                            <Field className="sign_up_field" name="username" type="text" />
                            {errors.username && touched.username ? <div className="sign_up_field_errors">{errors.username}</div> : null}
                        </div>
                        <div className="sign_up_details">
                            <label className="sign_up_label required" htmlFor="">
                                Email
                            </label>
                            <Field className="sign_up_field" name="email" type="email" />
                            {errors.email && touched.email ? <div className="sign_up_field_errors">{errors.email}</div> : null}
                        </div>
                        <div className="sign_up_details">
                            <label className="sign_up_label required" htmlFor="">
                                Password
                            </label>
                            <Field className="sign_up_field" name="password" type="password" />
                            {errors.password && touched.password ? <div className="sign_up_field_errors">{errors.password}</div> : null}
                        </div>
                        <div className="sign_up_error_msg">{registerErrorMsg}</div>

                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
