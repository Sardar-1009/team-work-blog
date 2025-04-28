import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-white font-bold">Blog</Link>
        <div>
          {isAuthenticated ? (
            <>
              <Link to="/create-post" className="text-white mr-4">Создать пост</Link>
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