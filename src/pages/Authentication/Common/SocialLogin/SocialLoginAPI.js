import { api } from "../../../../utils/api";

export async function facebookLogin(firstName, lastName, email, userId) {
  try {
    const response = await api.post("auth/facebooklogin", {
      email: email,
      facebookId: userId,
      firstName: firstName,
      lastName: lastName,
      timezoneOffset: new Date().getTimezoneOffset(),
    });
    return { data: response.data, status: response.status };
  } catch (error) {
    return {
      error: error.response.data.message,
      status: error.response.status,
      data: {},
    };
  }
}

export async function googleLogin(firstName, lastName, email) {
  try {
    const response = await api.post("auth/googlelogin", {
      email: email,
      firstName: firstName,
      lastName: lastName,
      timezoneOffset: new Date().getTimezoneOffset(),
    });
    return { data: response.data, status: response.status };
  } catch (error) {
    return {
      error: error.response.data.message,
      status: error.response.status,
      data: {},
    };
  }
}
