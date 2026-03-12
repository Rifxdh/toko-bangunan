import React, { useState } from 'react';
import { loginUser } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';

const LoginPage = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('admin@toko.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await loginUser(email, password);

      if (result.success) {
        login(result.data.user, result.data.token);
        setTimeout(() => {
          if (onLoginSuccess) onLoginSuccess();
        }, 300);
      } else {
        setError(result.message || 'Login gagal');
      }
    } catch (err) {
      setError('Terjadi kesalahan: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>🏢 Toko Bangunan</h2>
        <p className="login-box-subtitle">Sistem Manajemen Toko - Login</p>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email Akun</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@toko.com"
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={loading}
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? '⏳ Sedang login...' : '✓ Login ke Sistem'}
          </button>
        </form>
        {!loading && (
          <div className="loading-text" style={{ marginTop: '16px', fontSize: '0.85rem', color: '#999', textAlign: 'center' }}>
            Demo: admin@toko.com / password123
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
