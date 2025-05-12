import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosApi from '../api/axiosApi';
import { UserCredentials, AuthResponse } from '../types';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState<UserCredentials>({ username: '', password: '' });
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const { setTokens, setUser } = useAuthStore();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    console.log('Sending login request:', credentials);

    try {
      const response = await axiosApi.post<AuthResponse>('/token/', credentials);
      console.log('Login response:', response.data);


      setTokens(response.data.access, response.data.refresh);
      setUser(response.data.user.username, response.data.user.id);

      navigate('/posts');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        console.error('Login error:', err.response.data);
        const { status, data } = err.response;
        switch (status) {
          case 400:
            setError(`Ошибка: ${data.message || 'Неверный формат данных.'}`);
            break;
          case 401:
            setError(`Ошибка: ${data.message || 'Неверное имя пользователя или пароль.'}`);
            break;
          case 500:
            setError('Ошибка сервера. Попробуйте позже.');
            break;
          default:
            setError(`Ошибка входа: ${data.message || 'Проверьте имя пользователя и пароль.'}`);
        }
      } else if (err instanceof Error) {
        console.error('Network or other error:', err.message);
        setError('Ошибка соединения с сервером.');
      } else {
        console.error('Unknown error:', err);
        setError('Неизвестная ошибка. Попробуйте снова.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Вход</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          placeholder="Имя пользователя"
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