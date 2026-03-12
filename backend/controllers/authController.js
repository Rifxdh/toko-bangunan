const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = db.User;

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validasi input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email dan password harus diisi'
      });
    }

    // Cari user berdasarkan email (case-insensitive)
    const user = await User.findOne({
      where: { email: email.toLowerCase().trim() },
      raw: false
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Email atau password salah'
      });
    }

    // Cek status user
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Akun Anda telah dinonaktifkan'
      });
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Email atau password salah'
      });
    }

    // Generate token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET || 'secret-key-development',
      { expiresIn: '24h' }
    );

    // Response
    res.status(200).json({
      success: true,
      message: 'Login berhasil',
      data: {
        user: {
          id: user.id,
          email: user.email,
          nama: user.nama,
          role: user.role
        },
        token: token
      }
    });

  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server'
    });
  }
};

exports.logout = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Logout berhasil'
  });
};