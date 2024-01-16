import { api } from "../../../utils/api";

export async function verifyUser(token) {
  try {
    const response = await api.post("auth/verifyuser", {
      token: token,
    });
    return { data: response.data.message, status: response.status };
  } catch (error) {
    return {
      error: error.response.data.message,
      status: error.response.status,
      data: {},
    };
  }
}
