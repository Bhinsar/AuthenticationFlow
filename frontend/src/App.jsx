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

function ProtectedRoute({ children }) {
  const { isAuthenticated } = userAuthStore();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}


function PublicOnlyRoute({ children }) {
  const { isAuthenticated } = userAuthStore();
  return isAuthenticated ? <Navigate to="/home" replace /> : children;
}

function App() {
  const { isCheckingAuth } = userAuthStore();

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
        <Route
          path="/"
          element={
            <PublicOnlyRoute>
              <Layout><MainPage /></Layout>
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <Layout><LoginPage /></Layout>
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicOnlyRoute>
              <Layout><RegisterPage /></Layout>
            </PublicOnlyRoute>
          }
        />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
