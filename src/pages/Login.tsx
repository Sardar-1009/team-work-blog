import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosApi from '../api/axiosApi';
import { UserCredentials, AuthResponse } from '../types';
import axios from 'axios';

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState<UserCredentials>({ email: '', password: '' });
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      console.log('Sending login request:', credentials);
      const response = await axiosApi.post<AuthResponse>('/auth/login', credentials);
      console.log('Login response:', response.data);
      localStorage.setItem('token', response.data.token);
      navigate('/posts');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        console.error('Login error:', err.response.data);
        setError(`Ошибка входа: ${err.response.data.message || 'Проверьте email и пароль.'}`);
      } else {
        console.error('Network error:', err);
        setError('Ошибка соединения с сервером.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Вход</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={credentials.email}
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
          placeholder="Email"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          placeholder="Пароль"
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login;
