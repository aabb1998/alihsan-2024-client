import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '../../../components/Button'
import { SideImage } from '../Common/SideImage'
import { FormikValidationError } from '../Common/FormikValidationError';
import { EyeOffIcon, EyeIcon } from '../../../theme/svg-icons';
import { SnackMessages } from '../../../components/Toast';
import { resetPassword } from './resetPasswordAPI';
import { useNavigate, useParams } from 'react-router-dom';
import { PasswordMeter } from '../Signup/PasswordMeter';
import { PrimaryLoadingButton } from '../../../components/LoadingButtons';

const ResetNewPassword = () => {
    const { token } = useParams();
    const [isVisiblePassword, setVisiblePassword] = useState(false);
    const [isVisibleConfirmPassword, setVisibleConfirmPassword] = useState(false);
    const [isVisiblePasswordMeter, setVisiblePasswordMeter] = useState(false);
    const [passwordScore, setPasswordScore] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const { showSuccessMessage, showErrorMessage } = SnackMessages();
    let navigate = useNavigate();

    const validationSchema = yup.object({
        newPassword: yup
            .string('Enter your password')
            .test('password-score', 'Password must have atleast good strength', function (value) {
                // `value` is the value of the field being validated, in this case, the password
                // Check if the `passwordScore` is greater than or equal to 8
                if (passwordScore > 7) {
                    return true;
                } else {
                    return false;
                }
            })
            .required('Password is required'),
        confirmpassword: yup
            .string('Enter your password')
            .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
            .required('Confirm Password is required')
    });

    const formik = useFormik({
        initialValues: {
            newPassword: '',
            confirmpassword: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                setIsLoading(true);
                const response = await resetPassword(token, formik.values.newPassword);
                if (response.status == 200) {
                    showSuccessMessage(response.data);
                    navigate('/login');
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

    const handleChangePassword = (e) => {
        if (e.target.value.trim().length > 0) {
            const passwordValue = e.target.value.trim();
            const hasLowercase = /[a-z]/.test(passwordValue);
            const hasUppercase = /[A-Z]/.test(passwordValue);
            const hasSymbol = /[!@#$%^&*()+{}\[\]:;<>,.?~\\-]/.test(passwordValue);
            const hasNumber = /\d/.test(passwordValue);

            const trueCount = [hasLowercase, hasUppercase, hasNumber, hasSymbol].filter(Boolean).length;

            if (trueCount > 3) {
                if (passwordValue.length > 9) {
                    setPasswordScore(10);
                } else if (passwordValue.length > 7) {
                    setPasswordScore(8);
                } else {
                    setPasswordScore(6);
                }
            } else if (trueCount > 2) {
                setPasswordScore(6);
            } else if (trueCount > 1) {
                setPasswordScore(4);
            } else {
                setPasswordScore(2);
            }

            setVisiblePasswordMeter(true)
        }
        formik.setFieldValue('newPassword', e.target.value.trim());
    };
    const handleChangeConfirmPassword = (e) => formik.setFieldValue('confirmpassword', e.target.value.trim());
    const handlePasswordFocus = () => { setVisiblePasswordMeter(true); };

    useEffect(() => {
        document.title = 'Al-Ihsan Foundation - Reset Password';
    }, []);
    return (
        <div>
            <main className="mx-auto">
                <div className="flex justify-center min-h-screen gap-4 px-4 py-4 md:px-6 lg:justify-normal">
                    <div className="flex items-center justify-center w-full md:w-8/12">
                        <div className="w-full sm:w-[30.625rem]">
                            <a href="/"><img src="/images/assets/logo.svg" className="mx-auto mb-15" alt="Al-Ihsan Foundation" /></a>
                            <h1 className="mb-10 text-center text-heading-5 md:text-heading-4 text-neutral-900">Reset Password</h1>
                            <form onSubmit={formik.handleSubmit} id="SignupForm" className="mb-6" aria-label="Signup Form">
                                <div className="w-full mb-6 form-group">
                                    <div className="relative">
                                        <label htmlFor="Password" className="sr-only">New Password</label>
                                        <div className="absolute inset-y-0 right-0 flex items-center px-4 text-neutral-500">
                                            <a href="#" aria-label="View Password" onClick={() => setVisiblePassword(!isVisiblePassword)}>{isVisiblePassword ? <EyeOffIcon iconSize={20} /> : <EyeIcon iconSize={20} />}</a>
                                        </div>
                                        <input type={isVisiblePassword ? "text" : "password"} value={formik.values.newPassword} onChange={handleChangePassword} onFocus={handlePasswordFocus} name="newPassword" className="w-full form-control" id="Password" placeholder="New Password" />
                                    </div>
                                    {formik.touched.newPassword && Boolean(formik.errors.newPassword) &&
                                        <FormikValidationError formikTouched={formik.touched.newPassword} formikError={formik.errors.newPassword} />
                                    }

                                    <PasswordMeter isVisiblePasswordMeter={isVisiblePasswordMeter} passwordScore={passwordScore} passwordValue={formik.values.newPassword} />
                                </div>

                                <div className="relative w-full mb-5 form-group">
                                    <div className="relative">
                                        <label htmlFor="ConfirmPassword" className="sr-only">Confirm Password</label>
                                        <div className="absolute inset-y-0 right-0 flex items-center px-4 text-neutral-500">
                                            <a href="#" aria-label="View Confirm Password" onClick={() => setVisibleConfirmPassword(!isVisibleConfirmPassword)}>{isVisibleConfirmPassword ? <EyeOffIcon iconSize={20} /> : <EyeIcon iconSize={20} />}</a>
                                        </div>
                                        <input type={isVisibleConfirmPassword ? "text" : "password"} value={formik.values.confirmpassword} onChange={handleChangeConfirmPassword} name="confirmpassword" className="w-full form-control" id="ConfirmPassword" placeholder="Confirm New Password" />
                                    </div>
                                    {formik.touched.confirmpassword && Boolean(formik.errors.confirmpassword) &&
                                        <FormikValidationError formikTouched={formik.touched.confirmpassword} formikError={formik.errors.confirmpassword} />
                                    }
                                </div>

                                {/* Primary button - full width */}
                                {!isLoading ?
                                    <Button disabled={isLoading} variant="primaryFull" type="submit" label="Change Password" />
                                    : <PrimaryLoadingButton additionalButtonClasses="w-full" />
                                }
                            </form>
                        </div>
                    </div>
                    <SideImage image="/images/banner/authentication/signup.jpg"
                        altText="Sign Up"
                        heading="On-the Ground"
                        content="We are dedicated to being on the front lines, offering direct assistance to people. We prioritize face-to-face interactions over CEOs confined to their offices."
                    />
                </div>
            </main>
        </div>
    )
}

export default React.memo(ResetNewPassword)
