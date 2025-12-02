import axios from 'axios';
import type { Post } from '../types/post.type'
import type { User } from '../types/user.type'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:20001';

const ENV_TOKEN = import.meta.env.VITE_TOKEN as string | undefined;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor: añade el token de .env en cada request y así no tienes que estar repitiendolo todo el rato
api.interceptors.request.use((config) => {
  if (ENV_TOKEN) {
    config.headers.Authorization = `Bearer ${ENV_TOKEN}`;
  }
  return config;
});

export const registerUser = async (user: Omit<User, 'uuid'>): Promise<User> => {
  const response = await api.post('/users', user);
  return response.data;
};

export const getUserByUsername = async (username: string): Promise<User> => {
  const response = await api.get('/users/by-username', { params: { username } });
  return response.data;
};

export const getPosts = async (): Promise<Post[]> => {
  const response = await api.get('/posts');
  return response.data;
};

export const getPostsByUsername = async (username: string): Promise<Post[]> => {
  const response = await api.get('/posts/by-username', { params: { username } });
  return response.data;
};

export const deletePost = async (id: string): Promise<void> => {
  await api.delete(`/posts/${id}`);
};
