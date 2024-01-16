import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { SideImage } from '../Common/SideImage'
import { FormikValidationError } from '../Common/FormikValidationError';
import { SnackMessages } from '../../../components/Toast';
import { forgotPassword } from './resetPasswordAPI';
import { Button } from '../../../components';
import { PrimaryLoadingButton } from '../../../components/LoadingButtons';
import { useNavigate } from 'react-router';

const ResetPassword = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { showSuccessMessage, showErrorMessage } = SnackMessages();
    let navigate = useNavigate();
    let isLoggedInChecked = false;

    const validationSchema = yup.object({
        email: yup
            .string('Enter your email')
            .email('Enter a valid email')
            .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Enter a valid email')
            .required('Email is required')
    });

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                setIsLoading(true);
                const response = await forgotPassword(formik.values.email);
                if (response.status == 200) {
                    showSuccessMessage(response.data);
                } else {
                    showErrorMessage(response.error);
                }
                setIsLoading(false);
            } catch (error) {
                showErrorMessage(error.message);
                setIsLoading(false);
            }
        }
    });

    const handleChangeEmail = (e) => formik.setFieldValue('email', e.target.value.trim());

    useEffect(() => {
        document.title = 'Al-Ihsan Foundation - Reset Your Password';
        const userData = localStorage.getItem('loggedIn') ? localStorage.getItem('loggedIn') : sessionStorage.getItem('loggedIn');
        if (userData && isLoggedInChecked == false) {
            const parsedData = JSON.parse(userData);
            if (parsedData.isloggedIn == true) {
                isLoggedInChecked = true;
                // showSuccessMessage('Already logged in');
                navigate('/');
            }
        }
    }, []);

    return (
        <div>
            <main className="mx-auto">
                <div className="flex justify-center min-h-screen gap-4 px-4 py-4 md:px-6 lg:justify-normal">
                    <div className="flex items-center justify-center md:w-8/12">
                        <div className="w-full sm:w-[30.625rem]">
                            <a href="/"><img src="/images/assets/logo.svg" className="mx-auto mb-15" alt="Al-Ihsan Foundation" /></a>
                            <h1 className="mb-5 text-center text-heading-5 md:text-heading-4 text-neutral-900">Reset your password</h1>
                            <form id="ResetPasswordForm" onSubmit={formik.handleSubmit} className="mb-6" aria-label="Reset Password Form">
                                <p className="mb-10 text-sm font-medium text-center text-neutral-600"> Enter the email address that you wish to reset the password for and we'll send you an email with the instructions.</p>
                                <div className="form-group mb-7.5 flex flex-col">
                                    <label htmlFor="emailAddress" className="sr-only">Email Address</label>
                                    <input type="text" value={formik.values.email} name="email" onChange={handleChangeEmail} className="w-full form-control" id="emailAddress" placeholder="Email Address" />
                                    {formik.touched.email && Boolean(formik.errors.email) &&
                                        <FormikValidationError formikTouched={formik.touched.email} formikError={formik.errors.email} />
                                    }
                                </div>

                                {/* Primary button - full width */}
                                {!isLoading ?
                                    <Button disabled={isLoading} variant="primaryFull" type="submit" label="Reset Password" />
                                    : <PrimaryLoadingButton additionalButtonClasses="w-full" />
                                }
                                <div className="text-center mt-7.5">
                                    <span className="font-Inter text-neutral-600">Back to </span>
                                    <a href="/login" className="font-medium text-primary-300">Login</a>
                                </div>
                            </form>
                        </div>
                    </div>

                    <SideImage image="/images/banner/authentication/signup.jpg"
                        altText="Reset Password"
                        heading="On-the Ground"
                        content="We are dedicated to being on the front lines, offering direct assistance to people. We prioritize face-to-face interactions over CEOs confined to their offices."
                    />
                </div>
            </main>
        </div>
    )
}

export default React.memo(ResetPassword)
