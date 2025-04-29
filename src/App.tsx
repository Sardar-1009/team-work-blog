import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import PostList from './pages/PostList';
import PostDetail from './pages/PostDetail';
import CreateCategory from './pages/CreateCategory';
import EditCategory from './pages/EditCategory';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route
            path="/create-post"
            element={<ProtectedRoute><CreatePost /></ProtectedRoute>}
          />
          <Route
            path="/edit-post/:id"
            element={<ProtectedRoute><EditPost /></ProtectedRoute>}
          />
          <Route
            path="/create-category"
            element={<ProtectedRoute><CreateCategory /></ProtectedRoute>}
          />
          <Route
            path="/edit-category/:id"
            element={<ProtectedRoute><EditCategory /></ProtectedRoute>}
          />
          <Route path="/" element={<Navigate to="/posts" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

// // index.tsx
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';

// const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
