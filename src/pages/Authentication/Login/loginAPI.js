import { api } from "../../../utils/api";

export async function logIn(email, password) {
    try {
        const response = await api.post('auth/login', {
            email: email,
            password: password
        });
        api.defaults.headers.common["Authorization"] = `Bearer ${response.data.payload?.token}`;
        return { data: response.data, status: response.status };
    } catch (error) {
        return { error: error.response.data.message, status: error.response.status, data: {} };
    }
}