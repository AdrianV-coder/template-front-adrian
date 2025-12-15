export type Comment = {
  id: string;
  userId: string;
  postId: string;
  name: string;
  email: string;
  body: string;
  createdAt?: string;
};