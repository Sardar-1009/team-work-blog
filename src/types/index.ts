export interface UserCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
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
