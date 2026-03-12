import React from 'react';
import { useAuth } from '../context/AuthContext';
import { logoutUser } from '../services/authService';
import './DashboardPage.css';

const DashboardPage = ({ onLogout, onNavigate }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logoutUser();
    logout();
    if (onLogout) onLogout();
  };

  const handleNavigate = (page) => {
    if (onNavigate) onNavigate(page);
  };

  if (!user) {
    return <div className="dashboard-container"><p>Memuat...</p></div>;
  }

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="navbar-brand">
          <h1>🏢</h1>
          <div>
            <h1 style={{ display: 'inline', marginLeft: '8px' }}>Toko Bangunan</h1>
            <p>Sistem Manajemen Toko</p>
          </div>
        </div>
        <div className="navbar-user">
          <div className="user-info">
            <span className="user-email">{user.email}</span>
            <span className="user-role">{user.role}</span>
          </div>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="welcome-card">
          <h2>Selamat datang, {user.nama}! 👋</h2>
          <p>Kelola seluruh aspek toko bangunan Anda dari satu dashboard terpusat</p>
        </div>

        <div className="dashboard-grid">
          <div className="module-card" onClick={() => handleNavigate('products')}>
            <div className="module-card-icon">📦</div>
            <h3>Produk</h3>
            <p>Kelola katalog produk dan stok</p>
          </div>
          <div className="module-card" onClick={() => handleNavigate('sales')}>
            <div className="module-card-icon">💰</div>
            <h3>Penjualan</h3>
            <p>Catat dan analisis penjualan</p>
          </div>
          <div className="module-card" onClick={() => handleNavigate('customers')}>
            <div className="module-card-icon">👥</div>
            <h3>Pelanggan</h3>
            <p>Kelola data dan riwayat pelanggan</p>
          </div>
          <div className="module-card" onClick={() => handleNavigate('settings')}>
            <div className="module-card-icon">⚙️</div>
            <h3>Pengaturan</h3>
            <p>Konfigurasi aplikasi</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
