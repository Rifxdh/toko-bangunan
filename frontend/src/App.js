import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProductPage from './pages/ProductPage';
import CustomerPage from './pages/CustomerPage';
import SalesPage from './pages/SalesPage';
import './App.css';

function AppContent() {
  const { token, user } = useAuth();
  const [currentPage, setCurrentPage] = useState('loading');

  useEffect(() => {
    // Delay sedikit untuk memastikan context sudah initialize
    setTimeout(() => {
      if (token && user) {
        setCurrentPage('dashboard');
      } else {
        setCurrentPage('login');
      }
    }, 100);
  }, [token, user]);

  const handleLoginSuccess = () => {
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setCurrentPage('login');
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const handleBackToDashboard = () => {
    setCurrentPage('dashboard');
  };

  // Loading screen sederhana
  if (currentPage === 'loading') {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
        fontSize: '18px',
        color: '#666'
      }}>
        Memuat aplikasi...
      </div>
    );
  }

  return (
    <div>
      {currentPage === 'login' ? (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      ) : currentPage === 'dashboard' ? (
        <DashboardPage onLogout={handleLogout} onNavigate={handleNavigate} />
      ) : currentPage === 'products' ? (
        <ProductPage onBack={handleBackToDashboard} />
      ) : currentPage === 'customers' ? (
        <CustomerPage onBack={handleBackToDashboard} />
      ) : currentPage === 'sales' ? (
        <SalesPage onBack={handleBackToDashboard} />
      ) : (
        <DashboardPage onLogout={handleLogout} onNavigate={handleNavigate} />
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
