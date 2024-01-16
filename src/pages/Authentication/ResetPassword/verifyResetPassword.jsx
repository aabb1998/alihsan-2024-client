import React, { useEffect, useState, } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SnackMessages } from '../../../components/Toast';
import { verifyResetPassword } from './resetPasswordAPI';

const VerifyResetPassword = () => {
    const { token } = useParams();
    let submitTokenCalled = false;
    const { showSuccessMessage, showErrorMessage } = SnackMessages();
    let navigate = useNavigate();
    
    async function submitToken(token) {
        try {
            const response = await verifyResetPassword(token);
            if (response.status == 200) {
                // showSuccessMessage(response.data);
                navigate('/reset-new-password/' + token);
            } else {
                showErrorMessage(response.error);
                navigate('/login');
            }
        } catch (error) {
            showErrorMessage(error.message);
        }
    }

    useEffect(() => {
        if (!submitTokenCalled) {
            submitToken(token);
            submitTokenCalled = true;
        }
    }, [submitTokenCalled, token]);

    return (
        <div>
        </div>
    );
}

export default React.memo(VerifyResetPassword)