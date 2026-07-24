import './App.css';
import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { userAuthStore } from './services/api.js';
import { checkUser } from './services/auth/authService.js';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import MainPage from './pages/main';
import HomePage from './pages/home/index.js';
import Layout from './layout/layout';

function App() {
  const { isAuthenticated, isCheckingAuth } = userAuthStore();

  useEffect(() => {
    checkUser();
  }, []);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-gray-400 text-sm animate-pulse">Verifying session…</span>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/login"    element={<Layout><LoginPage /></Layout>} />
        <Route path="/register" element={<Layout><RegisterPage /></Layout>} />
        <Route path="/"         element={<Layout><MainPage /></Layout>} />
        <Route
          path="/home"
          element={
            isAuthenticated
              ? <Layout><HomePage /></Layout>
              : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </>
  );
}

export default App;
