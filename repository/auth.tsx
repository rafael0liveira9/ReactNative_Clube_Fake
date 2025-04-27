import axios from "axios";

interface UserParams {
  name?: string;
  description?: string;
  nick?: string;
  phone?: string;
  email?: string;
  password?: string;
  tip?: string;
  reply?: string;
  objective?: string;
  photo?: string;
  backgroundImage?: string;
  instagram?: string;
  cref?: string;
  document?: string;
}

const API_URL = "https://node-api-my-fit.vercel.app";

export async function getMyData({ token }: { token: string }) {
  try {
    if (!API_URL) {
      throw new Error("API URL não encontrada no extra do app.json.");
    }

    const response = await axios.get(`${API_URL}/get-my-user`, {
      headers: {
        Authorization: token,
      },
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

export async function update(name: string, token: string) {
  try {
    if (!API_URL) {
      throw new Error("API URL não encontrada no extra do app.json.");
    }

    const response = await axios.put(
      `${API_URL}/user`,
      { name: name },
      {
        headers: {
          Authorization: token,
        },
      }
    );

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

export async function updatePhoto(file: any, path: string, token: string) {
  try {
    if (!API_URL) {
      throw new Error("API URL não encontrada no extra do app.json.");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("path", path);

    console.log("file", file);
    console.log("path", path);

    const response = await axios.put(`${API_URL}/photo-user`, formData, {
      headers: {
        Authorization: token,
        "content-type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.log("response error", error.response.data);
      console.log("response status", error.response.status);
    } else if (error.request) {
      console.log("request error", error.request);
    } else {
      console.log("general error", error.message);
    }
    return {
      status: error?.response?.status || error?.status,
      message:
        error?.response?.data?.message ||
        error.message ||
        "Ocorreu um erro desconhecido.",
    };
  }
}
