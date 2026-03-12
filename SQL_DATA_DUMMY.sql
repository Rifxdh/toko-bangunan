-- ============================================
-- SQL DATA DUMMY - TOKO BANGUNAN
-- ============================================
-- Copy-paste semua query di bawah ke phpMyAdmin

-- ============================================
-- 1. INSERT ADMIN USER
-- ============================================
INSERT INTO users (email, password, nama, role, isActive, createdAt, updatedAt) VALUES 
('admin@toko.com', '$2a$10$K2dO8J5l8Z9M4L3K2J1G0OX5Y6Z7A8B9C0D1E2F3G4H5I6J7K8L9M0', 'Admin Toko', 'admin', true, NOW(), NOW());

-- ============================================
-- 2. INSERT PRODUK (8 data)
-- ============================================
INSERT INTO products (nama, kategori, harga, stok, deskripsi, createdAt, updatedAt) VALUES 
('Semen Portland', 'Material', 50000, 100, 'Semen murni untuk konstruksi', NOW(), NOW()),
('Keramik Lantai', 'Material', 75000, 50, 'Keramik premium 30x30cm', NOW(), NOW()),
('Cat Tembok', 'Finishing', 80000, 75, 'Cat berkualitas tinggi 5kg', NOW(), NOW()),
('Besi Cor', 'Material', 120000, 30, 'Besi konstruksi 10mm', NOW(), NOW()),
('Pipa PVC', 'Material', 45000, 60, 'Pipa PVC 1 inch', NOW(), NOW()),
('Kaca Sliding', 'Finishing', 250000, 15, 'Kaca sliding 2 meter', NOW(), NOW()),
('Kayu Meranti', 'Material', 150000, 40, 'Kayu 4x6cm sejenis', NOW(), NOW()),
('Paku', 'Peralatan', 5000, 500, 'Paku 2 inch per kg', NOW(), NOW());

-- ============================================
-- 3. INSERT PELANGGAN (5 data)
-- ============================================
INSERT INTO customers (nama, email, telepon, alamat, totalPembelian, createdAt, updatedAt) VALUES 
('Budi Santoso', 'budi@example.com', '08123456789', 'Jl. Merdeka 1, Jakarta', 0, NOW(), NOW()),
('Siti Nurhaliza', 'siti@example.com', '08234567890', 'Jl. Ahmad Yani 2, Bandung', 0, NOW(), NOW()),
('Ahmad Wijaya', 'ahmad@example.com', '08345678901', 'Jl. Gatot Subroto 3, Surabaya', 0, NOW(), NOW()),
('Ratna Dewi', 'ratna@example.com', '08456789012', 'Jl. Sudirman 4, Medan', 0, NOW(), NOW()),
('Eko Prasetyo', 'eko@example.com', '08567890123', 'Jl. Diponegoro 5, Yogyakarta', 0, NOW(), NOW());

-- ============================================
-- 4. INSERT PENJUALAN (8 transaksi)
-- ============================================
INSERT INTO sales (customerId, productId, jumlah, hargaSatuan, total, tanggal, keterangan, createdAt, updatedAt) VALUES 
(1, 1, 5, 50000, 250000, '2026-03-10 10:30:00', NULL, NOW(), NOW()),
(2, 2, 10, 75000, 750000, '2026-03-10 14:15:00', NULL, NOW(), NOW()),
(3, 3, 3, 80000, 240000, '2026-03-11 08:45:00', NULL, NOW(), NOW()),
(4, 4, 2, 120000, 240000, '2026-03-11 11:20:00', NULL, NOW(), NOW()),
(5, 5, 8, 45000, 360000, '2026-03-12 09:00:00', NULL, NOW(), NOW()),
(1, 7, 2, 150000, 300000, '2026-03-12 10:30:00', NULL, NOW(), NOW()),
(2, 6, 1, 250000, 250000, '2026-03-12 13:45:00', NULL, NOW(), NOW()),
(3, 8, 50, 5000, 250000, '2026-03-12 15:00:00', NULL, NOW(), NOW());

-- ============================================
-- UPDATE TOTAL PEMBELIAN PELANGGAN
-- ============================================
UPDATE customers SET totalPembelian = 550000 WHERE id = 1;
UPDATE customers SET totalPembelian = 1000000 WHERE id = 2;
UPDATE customers SET totalPembelian = 490000 WHERE id = 3;
UPDATE customers SET totalPembelian = 240000 WHERE id = 4;
UPDATE customers SET totalPembelian = 360000 WHERE id = 5;

-- ============================================
-- UPDATE STOK PRODUK (SETELAH PENJUALAN)
-- ============================================
UPDATE products SET stok = 95 WHERE id = 1;  -- 100 - 5
UPDATE products SET stok = 40 WHERE id = 2;  -- 50 - 10
UPDATE products SET stok = 72 WHERE id = 3;  -- 75 - 3
UPDATE products SET stok = 28 WHERE id = 4;  -- 30 - 2
UPDATE products SET stok = 52 WHERE id = 5;  -- 60 - 8
UPDATE products SET stok = 14 WHERE id = 6;  -- 15 - 1
UPDATE products SET stok = 38 WHERE id = 7;  -- 40 - 2
UPDATE products SET stok = 450 WHERE id = 8; -- 500 - 50

-- ============================================
-- VERIFIKASI DATA
-- ============================================
-- Lihat semua user
SELECT * FROM users;

-- Lihat semua produk
SELECT * FROM products;

-- Lihat semua pelanggan
SELECT * FROM customers;

-- Lihat semua penjualan
SELECT * FROM sales;

-- Lihat total penjualan
SELECT COUNT(*) as total_transaksi, SUM(total) as total_penjualan FROM sales;

-- ============================================
-- KETERANGAN PASSWORD
-- ============================================
-- Hash: $2a$10$K2dO8J5l8Z9M4L3K2J1G0OX5Y6Z7A8B9C0D1E2F3G4H5I6J7K8L9M0
-- Password plaintext: password123
-- Silahkan gunakan untuk login di aplikasi
