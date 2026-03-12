const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./models');

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/customers', require('./routes/customerRoutes'));
app.use('/api/sales', require('./routes/salesRoutes'));

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend API berjalan dengan baik' });
});

const PORT = process.env.PORT || 5000;

const initializeApp = async () => {
  try {
    console.log('\n🔗 Menghubungkan ke database...');
    await db.sequelize.authenticate();
    console.log('✅ Koneksi database berhasil');

    console.log('🔄 Sinkronisasi database...');
    await db.sequelize.sync({ alter: true });
    console.log('✅ Database tersinkronisasi');

    app.listen(PORT, () => {
      console.log(`🚀 Server berjalan di http://localhost:${PORT}\n`);
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

initializeApp();
