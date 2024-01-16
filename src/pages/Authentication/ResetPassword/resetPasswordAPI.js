import { api } from "../../../utils/api";

export async function forgotPassword(email) {
    try {
        const response = await api.post('auth/forgotpassword', {
            email: email
        });
        return { data: response.data.message, status: response.status };
    } catch (error) {
        return { error: error.response.data.message, status: error.response.status, data: {} };
    }
}

export async function verifyResetPassword(token) {
    try {
        const response = await api.post('auth/verifyreseturl', {
            token: token
        });
        return { data: response.data.message, status: response.status };
    } catch (error) {
        return { error: error.response.data.message, status: error.response.status, data: {} };
    }
}

export async function resetPassword(token, password) {
    try {
        const response = await api.post('auth/resetpassword', {
            token: token,
            newPassword: password
        });
        return { data: response.data.message, status: response.status };
    } catch (error) {
        return { error: error.response.data.message, status: error.response.status, data: {} };
    }
}