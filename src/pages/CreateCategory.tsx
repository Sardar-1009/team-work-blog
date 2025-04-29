import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosApi from '../api/axiosApi';
import axios from 'axios';

const CreateCategory: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      console.log('Sending create category request:', { name });
      await axiosApi.post('/categories', { name });
      navigate('/posts');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        console.error('Create category error:', err.response.data);
        setError(`Ошибка создания категории: ${err.response.data.message || 'Попробуйте снова.'}`);
      } else {
        console.error('Network error:', err);
        setError('Ошибка соединения с сервером.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Создать категорию</h2>
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
          Создать
        </button>
      </form>
    </div>
  );
};

export default CreateCategory;
