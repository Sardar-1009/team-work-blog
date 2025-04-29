import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosApi from '../api/axiosApi';
import { Post } from '../types';
import axios from 'axios';

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axiosApi.get<Post>(`/posts/${id}`);
        setPost(response.data);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          setError(`Ошибка загрузки поста: ${err.response.data.message || 'Попробуйте снова.'}`);
        } else {
          setError('Ошибка соединения с сервером.');
        }
      }
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Вы уверены, что хотите удалить пост?')) {
      try {
        await axiosApi.delete(`/posts/${id}`);
        navigate('/posts');
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          setError(`Ошибка удаления поста: ${err.response.data.message || 'Попробуйте снова.'}`);
        } else {
          setError('Ошибка соединения с сервером.');
        }
      }
    }
  };

  if (!post) return <div>Загрузка...</div>;

  return (
    <div>
      <h2 className="text-2xl mb-4">{post.title}</h2>
      {error && <p className="text-red-500">{error}</p>}
      <p className="mb-4">{post.content}</p>
      <p className="text-gray-500">Категория: {post.category?.name || 'Без категории'}</p>
      {isAuthenticated && (
        <div className="mt-4">
          <button
            onClick={() => navigate(`/edit-post/${id}`)}
            className="bg-yellow-500 text-white p-2 rounded mr-2"
          >
            Редактировать
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white p-2 rounded"
          >
            Удалить
          </button>
        </div>
      )}
    </div>
  );
};

export default PostDetail;
