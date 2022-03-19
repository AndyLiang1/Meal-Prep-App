import * as React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';

export interface ILoginProps {}

const REGISTER_USER = gql`
    mutation($input: RegisterInput!) {
        register(input: $input) {
            username
        }
    }
`;
interface UserInfo {
    username: string;
    email: string;
    password: string;
}

export function Login(props: ILoginProps) {
    const initialValues: UserInfo = {
        username: '',
        email: '',
        password: ''
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().max(50).required(),
        email: Yup.string().email('Invalid email').required(),
        password: Yup.string().max(50).required()
    });
    const [registerErrorMsg, setRegisterErrorMsg] = useState<any>();

    const [registerUser] = useMutation(REGISTER_USER);
    const onSubmit = async (userInfo: any) => {
        const { username, email, password } = userInfo;
        // registerUser({
        //     variables: {
        //         input: {
        //             username,
        //             email,
        //             password
        //         }
        //     }
        // }).then((user) => console.log('ayaya')).catch((err) => {console.log(err)})
        try {
            console.log('heree')
            await registerUser({
                variables: {
                    input: {
                        username,
                        email,
                        password
                    }
                }
            });
        } catch (e: any) {
            setRegisterErrorMsg(e.message);
            for (const property in e) {
                console.log(property)
            }
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
                        <div className="sign_up_error_msg">hey{registerErrorMsg}</div>

                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
