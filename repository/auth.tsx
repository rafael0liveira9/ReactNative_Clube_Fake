import axios from "axios";

interface UserParams {
  email: string;
  password: string;
  name?: string;
}
const API_URL = "https://node-api-my-fit.vercel.app";

export async function login({ email, password }: UserParams) {
  try {
    if (!API_URL) {
      throw new Error("API URL não encontrada no extra do app.json.");
    }

    const response = await axios.post(`${API_URL}/sign-in`, {
      email,
      password,
    });

    return response.data;
  } catch (error: any) {
    return {
      status: error?.status,
      message:
        error?.response?.data?.message ||
        error.message ||
        "Ocorreu um erro desconhecido.",
    };
  }
}

export async function register({ email, password, name }: UserParams) {
  try {
    if (!API_URL) {
      throw new Error("API URL não encontrada no extra do app.json.");
    }

    const response = await axios.post(`${API_URL}/user/2`, {
      name: name,
      description: "",
      nick: name,
      phone: "",
      email: email,
      password: password,
      tip: "",
      reply: "",
      objective: "",
      photo: "",
      backgroundImage: "",
      instagram: "",
      cref: "",
      document: "",
    });

    return response.data;
  } catch (error: any) {
    return {
      status: error?.status,
      message:
        error?.response?.data?.message ||
        error.message ||
        "Ocorreu um erro desconhecido.",
    };
  }
}
