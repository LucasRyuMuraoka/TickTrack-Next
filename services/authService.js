import { API_URL } from "../services/apiClient";

export const getCsrfCookie = async () => {
  const response = await fetch(`${API_URL}/sanctum/csrf-cookie`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Erro de CSRF");
  }

  return response;
};

export const login = async (email, password) => {
  await getCsrfCookie();

  const response = await fetch(`${API_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw errorData;
  }

  return response.json();
};