import * as React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';

export interface IRegisterProps {}

interface RegisterInfo {
    username: string;
    email: string;
    password: string;
}

const REGISTER_USER = gql`
    mutation($input: RegisterInput!) {
        register(input: $input) {
            ... on RegisterSuccess {
                user {
                    id
                    username
                    email
                    password
                    token
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
    const initialValues: RegisterInfo = {
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
    const [registerUser] = useMutation(REGISTER_USER);
    const onSubmit = async (userInfo: RegisterInfo) => {
        const { username, email, password } = userInfo;
        try {
            const {data} = await registerUser({
                variables: {
                    input: {
                        username,
                        email,
                        password
                    }
                }
            });
            if (data.register.message) {
                setRegisterErrorMsg(data.register.message);

            }

        } catch (error: any) {
            console.log('Error with registering: ')
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
