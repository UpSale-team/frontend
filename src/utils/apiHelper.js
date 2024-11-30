import axios from "axios";
import { baseUrl } from "./constants";
import { formatErrorResponse } from "./utils";
import { getCookie } from "./cookie";

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${getCookie("token")}`,
    "Content-Type": "application/json",
  },
});

const apiHelper = {
  addToken: (token) => {
    api.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
  },

  get: async (url, params = {}) => {
    try {
      const response = await api.get(url, { params });
      return response.data;
    } catch (error) {
      return formatErrorResponse(error);
    }
  },

  post: async (url, data = {}, config = {}) => {
    try {
      const response = await api.post(url, data, {
        ...config,
        headers: { "Content-Type": "application/json", ...config.headers },
      });
      return response.data;
    } catch (error) {
      return formatErrorResponse(error);
    }
  },

  postFormData: async (url, formData, config = {}) => {
    try {
      const response = await api.post(url, formData, {
        ...config,
        headers: { "Content-Type": "multipart/form-data", ...config.headers },
      });
      return response.data;
    } catch (error) {
      return formatErrorResponse(error);
    }
  },

  put: async (url, data = {}, config = {}) => {
    try {
      const response = await api.put(url, data, {
        ...config,
        headers: { "Content-Type": "application/json", ...config.headers },
      });
      return response.data;
    } catch (error) {
      return formatErrorResponse(error);
    }
  },

  delete: async (url, config = {}) => {
    try {
      const response = await api.delete(url, { ...config });
      return response.data;
    } catch (error) {
      return formatErrorResponse(error);
    }
  },
};

export default apiHelper;