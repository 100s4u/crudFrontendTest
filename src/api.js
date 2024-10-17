import axios from 'axios';

const API_URL = process.env.REACT_APP_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_URL
});

axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

export const registerUser = async (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};

export const loginUser = async (userData) => {
  return axios.post(`${API_URL}/login`, userData);
};

export const logoutUser = async () => {
  return axiosInstance.post(`${API_URL}/logout`);
};

export const getMe = async () => {
    return axiosInstance.get('/me');
  };

export const getPosts = async () => {
  return axiosInstance.get('/posts');
};

export const createPost = async (postData) => {
  return axiosInstance.post('/posts', postData);
};

export const getPostById = async (id) => {
  return axiosInstance.get(`/posts/${id}`);
};

export const updatePost = async (id, postData) => {
  return axiosInstance.put(`/posts/${id}`, postData);
};

export const deletePost = async (id) => {
  return axiosInstance.delete(`/posts/${id}`);
};

export const createComment = async (id, postData) => {
  return axiosInstance.post(`/posts/${id}/comments`, postData);
};