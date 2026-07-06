import axios from "axios";
import { API_BASE_URL } from "../config/apiConfig";
import storageHelper from "../utils/storageHelper";
import { clearAuthData } from "../utils/authReset";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// api.interceptors.request.use((config) => {
//   const token = storageHelper.getItem("token");

//   console.log("================================");
//   console.log("TOKEN:", token);
//   console.log("URL:", config.url);

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   console.log("AUTH HEADER:", config.headers.Authorization);
//   console.log("================================");

//   return config;
// });

api.interceptors.request.use((config) => {
  const token = storageHelper.getItem("token");

  console.log("TOKEN:", token);
  console.log("URL:", config.url);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  console.log("AUTH HEADER:", config.headers.Authorization);

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAuthData();
    }

    return Promise.reject(error);
  },
);

export const authAPI = {
  login: (data) => api.post("/auth/login", data),
  getProfile: () => api.get("/auth/validate-token"),
  logout: () => api.post("/auth/logout"),
};

export const boardsAPI = {
  getAll: () => api.get("/classes"),
};

export const classesAPI = {
  getByBoard: (boardId) => api.get(`/classes/filter?board_id=${boardId}`),
};

export const subjectsAPI = {
  getAll: (classId) => api.get(`/subjects?classId=${classId}`),
};

export const chaptersAPI = {
  getBySubject: (classId, subjectId) =>
    api.get(`/chapters/by-subject?classId=${classId}&subjectId=${subjectId}`),
};

export const topicsAPI = {
  getAll: (classId, subjectId, chapterId) => {
    const params = new URLSearchParams();

    params.append("classId", classId);
    params.append("subjectId", subjectId);
    params.append("chapterId", chapterId);

    return api.get(`/topics?${params.toString()}`);
  },
};

export const contentAPI = {
  getAll: (classId, subjectId, chapterId, topicId) => {
    const params = new URLSearchParams();

    params.append("classId", classId);
    params.append("subjectId", subjectId);
    params.append("chapterId", chapterId);
    params.append("topicId", topicId);

    return api.get(`/content?${params.toString()}`);
  },
};

export default api;
