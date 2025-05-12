export interface IUser {
  id: string | null;
  username: string | null;
}

export interface UserCredentials {
  username: string;
  password: string;
  password_confirm?: string; 
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: {
    id: string;
    username: string;
  };
}

export interface Category {
  id: string;
  name: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  category?: Category;
}

export interface PostFormData {
  title: string;
  content: string;
  categoryId: string;
}