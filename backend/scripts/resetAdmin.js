const bcrypt = require('bcryptjs');
const db = require('../models');

const resetAdmin = async () => {
  try {
    console.log('\n🔗 Menghubungkan ke database...');
    await db.sequelize.authenticate();
    console.log('✅ Koneksi database berhasil\n');

    console.log('🔄 Sinkronisasi database...');
    await db.sequelize.sync({ alter: true });
    console.log('✅ Database tersinkronisasi\n');

    console.log('🗑️  Menghapus user admin lama...');
    await db.User.destroy({ where: {} });
    console.log('✅ Semua user dihapus\n');

    console.log('🔐 Membuat hash password...');
    const plainPassword = 'password123';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);
    console.log('✅ Hash dibuat\n');

    console.log('👤 Membuat user admin baru...');
    const newAdmin = await db.User.create({
      email: 'admin@toko.com',
      password: hashedPassword,
      nama: 'Admin Toko',
      role: 'admin',
      isActive: true
    });
    console.log('✅ User admin berhasil dibuat\n');

    // Verifikasi
    console.log('🔍 Verifikasi dari database...');
    const savedUser = await db.User.findOne({
      where: { email: 'admin@toko.com' },
      raw: true
    });
    
    if (savedUser) {
      const testPassword = await bcrypt.compare(plainPassword, savedUser.password);
      console.log('✅ User ditemukan');
      console.log('   Email:', savedUser.email);
      console.log('   Password valid:', testPassword, '\n');
    }

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ SETUP ADMIN BERHASIL');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧 Email    : admin@toko.com');
    console.log('🔑 Password : password123');
    console.log('👑 Role     : admin');
    console.log('✨ Status   : Active');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    process.exit(0);

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
};

resetAdmin();
