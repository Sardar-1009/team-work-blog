import { useState, useEffect, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosApi from '../api/axiosApi';
import { Category } from '../types';
import axios from 'axios';

const EditCategory: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axiosApi.get<Category>(`/categories/${id}`);
        setName(response.data.name);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          setError(`Ошибка загрузки категории: ${err.response.data.message || 'Попробуйте снова.'}`);
        } else {
          setError('Ошибка соединения с сервером.');
        }
      }
    };
    fetchCategory();
  }, [id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      console.log('Sending update category request:', { name });
      await axiosApi.put(`/categories/${id}`, { name });
      navigate('/posts');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        console.error('Update category error:', err.response.data);
        setError(`Ошибка сохранения категории: ${err.response.data.message || 'Попробуйте снова.'}`);
      } else {
        console.error('Network error:', err);
        setError('Ошибка соединения с сервером.');
      }
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Вы уверены, что хотите удалить категорию?')) {
      try {
        await axiosApi.delete(`/categories/${id}`);
        navigate('/posts');
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          setError(`Ошибка удаления категории: ${err.response.data.message || 'Попробуйте снова.'}`);
        } else {
          setError('Ошибка соединения с сервером.');
        }
      }
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Редактировать категорию</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Название категории"
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Сохранить
        </button>
      </form>
      {isAuthenticated && (
        <button
          onClick={handleDelete}
          className="w-full bg-red-500 text-white p-2 rounded mt-4"
        >
          Удалить
        </button>
      )}
    </div>
  );
};

export default EditCategory;
