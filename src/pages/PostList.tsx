import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosApi from '../api/axiosApi';
import { Post } from '../types';
import axios from 'axios';

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosApi.get<Post[]>('/posts');
        setPosts(response.data);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          setError(`Ошибка загрузки постов: ${err.response.data.message || 'Попробуйте снова.'}`);
        } else {
          setError('Ошибка соединения с сервером.');
        }
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <h2 className="text-2xl mb-4">Все посты</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="border p-4 rounded">
            <Link to={`/posts/${post.id}`}>
              <h3 className="text-xl font-bold">{post.title}</h3>
            </Link>
            <p>{post.content.substring(0, 100)}...</p>
            <p className="text-gray-500">Категория: {post.category?.name || 'Без категории'}</p>
          </div>
        ))}
      </div>
      <div> <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>↑</button>
      </div>
    </div>
  );
};

export default PostList;
