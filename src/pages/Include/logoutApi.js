import { api } from "../../utils/api";

export async function logOut() {
    try {
        const token = localStorage.getItem('loggedIn') ? JSON.parse(localStorage.getItem('loggedIn')).token : sessionStorage.getItem('loggedIn') ? JSON.parse(sessionStorage.getItem('loggedIn')).token : ''; // Retrieve the token from local storage
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        const response = await api.get('auth/logout', { headers });
        return { data: response.data.message, status: response.status };
    } catch (error) {
        return { error: error.response.data.message, status: error.response.status, data: {} };
    }
}
