import { api } from "../../../utils/api";

export async function signUp(firstName, lastName, email, password) {
    try {
        const response = await api.post('auth/register', {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            timezoneOffset:new Date().getTimezoneOffset(),
        });
        return { data: response.data.message, status: response.status };
    } catch (error) {
        return { error: error.response.data.message, status: error.response.status, data: {} };
    }
}