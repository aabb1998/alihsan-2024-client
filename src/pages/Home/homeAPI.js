import { api } from "../../utils/api";

export async function homeData() {
    try {
        const response = await api.get('home');
        return { data: response.data, status: response.status };
    } catch (error) {
        return { error: error.response.data.message, status: error.response.status, data: {} };
    }
}