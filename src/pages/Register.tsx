import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosApi from '../api/axiosApi';
import { UserCredentials, AuthResponse } from '../types';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const Register: React.FC = () => {
  const [credentials, setCredentials] = useState<UserCredentials>({
    username: '',
    password: '',
    password_confirm: '',
  });
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const navigate = useNavigate();
  const { setTokens, setUser } = useAuthStore();

  const validateUsername = (username: string): boolean => {
    const usernameRegex = /^[\w.@+-]+$/;
    return usernameRegex.test(username) && username.length >= 1 && username.length <= 150;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Валидация на стороне клиента
    if (!validateUsername(credentials.username)) {
      setError('Имя пользователя должно содержать 1–150 символов: буквы, цифры, @/./+/-/_');
      return;
    }

    if (credentials.password !== credentials.password_confirm) {
      setError('Пароли не совпадают');
      return;
    }

    if (credentials.password.length < 1) {
      setError('Пароль должен содержать хотя бы 1 символ');
      return;
    }

    console.log('Sending register request:', {
      username: credentials.username,
      password: credentials.password,
      password_confirm: credentials.password_confirm,
    });

    try {
      const response = await axiosApi.post<AuthResponse>('/users/', {
        username: credentials.username,
        password: credentials.password,
        password_confirm: credentials.password_confirm,
      });
      console.log('Register response:', response.data);

      // Сохраняем токены и данные пользователя
      setTokens(response.data.access, response.data.refresh);
      setUser(response.data.user.username, response.data.user.id);

      setSuccess('Регистрация успешна! Перенаправляем...');
      setTimeout(() => navigate('/posts'), 2000);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        console.error('Register error:', err.response.data);
        const { status, data } = err.response;
        switch (status) {
          case 400:
            setError(`Ошибка: ${data.message || 'Неверный формат данных. Проверьте имя пользователя и пароль.'}`);
            break;
          case 409:
            setError(`Ошибка: ${data.message || 'Это имя пользователя уже занято.'}`);
            break;
          case 500:
            setError('Ошибка сервера. Попробуйте позже.');
            break;
          default:
            setError(`Ошибка регистрации: ${data.message || 'Попробуйте снова.'}`);
        }
      } else if (err instanceof Error) {
        console.error('Network or other error:', err.message);
        setError('Ошибка соединения с сервером. Проверьте интернет или попробуйте позже.');
      } else {
        console.error('Unknown error:', err);
        setError('Неизвестная ошибка. Попробуйте снова.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Регистрация</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
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
        <input
          type="password"
          value={credentials.password_confirm}
          onChange={(e) => setCredentials({ ...credentials, password_confirm: e.target.value })}
          placeholder="Подтвердите пароль"
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default Register;