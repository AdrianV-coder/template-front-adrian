import axios from 'axios';
import type { Post } from '../types/post.type'
import type { User } from '../types/user.type'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:20001';

const ENV_TOKEN = (import.meta.env.VITE_TOKEN as string | undefined)?.trim();

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    ...(ENV_TOKEN ? { Authorization: `Bearer ${ENV_TOKEN}` } : {}),
  },
});

export const registerUser = async (user: Omit<User, 'id'>): Promise<User> => {
  const response = await api.post('/users', user);
  return response.data;
};

export const createPost = async (post: Omit<Post, 'id'>): Promise<Post> => {
  const response = await api.post('/posts', post);
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

export const createComment = async (comment: {
  userId: string;
  postId: string;
  name: string;
  email: string;
  body: string;
}): Promise<void> => {
  const response = await api.post('/comments', comment);
  return response.data;
};

export const getCommentsByPostId = async (postId: string): Promise<Comment[]> => {
  const response = await api.get(`/comments/post/${postId}`);
  return response.data;
};

export const getPostById = async (id: string): Promise<Post> => {
  const response = await api.get(`/posts/${id}`);
  return response.data;
};
