import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { accessToken, clearTokens } = useAuthStore();

  const handleLogout = () => {
    clearTokens();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <Link to="/posts" className="text-white font-bold">Blog</Link>
        <div>
          <Link to="/posts" className="text-white mr-4">Посты</Link>
          {accessToken ? (
            <>
              <Link to="/create-post" className="text-white mr-4">Создать пост</Link>
              <Link to="/create-category" className="text-white mr-4">Создать категорию</Link>
              <button onClick={handleLogout} className="text-white">Выйти</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white mr-4">Войти</Link>
              <Link to="/register" className="text-white">Регистрация</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;