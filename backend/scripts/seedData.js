const db = require('../models');

async function seedDatabase() {
  try {
    console.log('🌱 Memulai seed database...\n');
    
    // Sync database
    await db.sequelize.sync({ alter: true });
    console.log('✅ Database tersinkronisasi\n');

    // Insert Products
    console.log('📦 Insert produk...');
    const products = [
      { nama: 'Semen Portland', kategori: 'Material', harga: 50000, stok: 100, deskripsi: 'Semen murni untuk konstruksi' },
      { nama: 'Keramik Lantai', kategori: 'Material', harga: 75000, stok: 50, deskripsi: 'Keramik premium 30x30cm' },
      { nama: 'Cat Tembok', kategori: 'Finishing', harga: 80000, stok: 75, deskripsi: 'Cat berkualitas tinggi 5kg' },
      { nama: 'Besi Cor', kategori: 'Material', harga: 120000, stok: 30, deskripsi: 'Besi konstruksi 10mm' },
      { nama: 'Pipa PVC', kategori: 'Material', harga: 45000, stok: 60, deskripsi: 'Pipa PVC 1 inch' },
      { nama: 'Kaca Sliding', kategori: 'Finishing', harga: 250000, stok: 15, deskripsi: 'Kaca sliding 2 meter' },
      { nama: 'Kayu Meranti', kategori: 'Material', harga: 150000, stok: 40, deskripsi: 'Kayu 4x6cm sejenis' },
      { nama: 'Paku', kategori: 'Peralatan', harga: 5000, stok: 500, deskripsi: 'Paku 2 inch per kg' }
    ];

    await db.Product.bulkCreate(products);
    console.log(`✅ ${products.length} produk berhasil ditambahkan\n`);

    // Insert Customers
    console.log('👥 Insert pelanggan...');
    const customers = [
      { nama: 'Budi Santoso', email: 'budi@example.com', telepon: '08123456789', alamat: 'Jl. Merdeka 1, Jakarta' },
      { nama: 'Siti Nurhaliza', email: 'siti@example.com', telepon: '08234567890', alamat: 'Jl. Ahmad Yani 2, Bandung' },
      { nama: 'Ahmad Wijaya', email: 'ahmad@example.com', telepon: '08345678901', alamat: 'Jl. Gatot Subroto 3, Surabaya' },
      { nama: 'Ratna Dewi', email: 'ratna@example.com', telepon: '08456789012', alamat: 'Jl. Sudirman 4, Medan' },
      { nama: 'Eko Prasetyo', email: 'eko@example.com', telepon: '08567890123', alamat: 'Jl. Diponegoro 5, Yogyakarta' }
    ];

    await db.Customer.bulkCreate(customers);
    console.log(`✅ ${customers.length} pelanggan berhasil ditambahkan\n`);

    // Insert Sales
    console.log('💰 Insert penjualan...');
    const sales = [
      { customerId: 1, productId: 1, jumlah: 5, hargaSatuan: 50000, total: 250000, tanggal: new Date('2026-03-10') },
      { customerId: 2, productId: 2, jumlah: 10, hargaSatuan: 75000, total: 750000, tanggal: new Date('2026-03-10') },
      { customerId: 3, productId: 3, jumlah: 3, hargaSatuan: 80000, total: 240000, tanggal: new Date('2026-03-11') },
      { customerId: 4, productId: 4, jumlah: 2, hargaSatuan: 120000, total: 240000, tanggal: new Date('2026-03-11') },
      { customerId: 5, productId: 5, jumlah: 8, hargaSatuan: 45000, total: 360000, tanggal: new Date('2026-03-12') },
      { customerId: 1, productId: 7, jumlah: 2, hargaSatuan: 150000, total: 300000, tanggal: new Date('2026-03-12') },
      { customerId: 2, productId: 6, jumlah: 1, hargaSatuan: 250000, total: 250000, tanggal: new Date('2026-03-12') },
      { customerId: 3, productId: 8, jumlah: 50, hargaSatuan: 5000, total: 250000, tanggal: new Date('2026-03-12') }
    ];

    await db.Sales.bulkCreate(sales);
    console.log(`✅ ${sales.length} penjualan berhasil ditambahkan\n`);

    console.log('═══════════════════════════════════');
    console.log('✅ SEED DATA BERHASIL!');
    console.log('═══════════════════════════════════\n');
    console.log('📊 RINGKASAN:');
    console.log(`  📦 ${products.length} Produk`);
    console.log(`  👥 ${customers.length} Pelanggan`);
    console.log(`  💰 ${sales.length} Penjualan`);
    console.log(`  💵 Total Penjualan: Rp ${sales.reduce((sum, s) => sum + s.total, 0).toLocaleString('id-ID')}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seed database:', error);
    process.exit(1);
  }
}

seedDatabase();
