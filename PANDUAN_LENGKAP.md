# 📚 PANDUAN LENGKAP - TOKO BANGUNAN

---

## 🎯 PENGENALAN APLIKASI

**Toko Bangunan** adalah sistem manajemen toko untuk:
- ✅ Login/Logout user
- ✅ Kelola produk bangunan
- ✅ Catat penjualan
- ✅ Kelola pelanggan
- ✅ Lihat laporan

**Stack Teknologi:**
- Backend: Node.js + Express (port 5000)
- Frontend: React (port 3000)
- Database: MySQL via XAMPP

---

## 🔧 SETUP AWAL (HANYA KALI PERTAMA)

### **Step 1: Download & Install**

**A. Node.js**
1. Buka https://nodejs.org
2. Download versi LTS (Long Term Support)
3. Install dengan next-next-finish
4. Verifikasi: Buka PowerShell, ketik:
   ```powershell
   node --version
   npm --version
   ```

**B. XAMPP**
1. Buka https://www.apachefriends.org
2. Download XAMPP
3. Install di C:/xampp
4. Buka XAMPP Control Panel
5. Start **Apache** dan **MySQL**

---

### **Step 2: Download Project**

Folder sudah ada di:
```
c:\xampp\htdocs\toko-bangunan
```

---

### **Step 3: Install Dependencies**

Buka **PowerShell** di folder project:

**Terminal 1 - Backend:**
```powershell
cd c:\xampp\htdocs\toko-bangunan\backend
npm install
```

**Terminal 2 - Frontend:**
```powershell
cd c:\xampp\htdocs\toko-bangunan\frontend
npm install
```

Tunggu sampai selesai (±2 menit tergantung internet).

---

### **Step 4: Setup Database**

1. Buka browser: http://localhost/phpmyadmin
2. Login tanpa password (default)
3. Klik **New** di sidebar kiri
4. Ketik nama database: `toko_bangunan`
5. Klik **Create**

Database sudah siap!

---

## 🚀 CARA MENJALANKAN APLIKASI

### **SETIAP KALI MAU GUNAKAN APP:**

**Buka 2 Terminal PowerShell**

**Terminal 1 - Jalankan Backend:**
```powershell
cd c:\xampp\htdocs\toko-bangunan\backend
npm run dev
```

**Expected Output:**
```
✅ Koneksi database berhasil
🚀 Server berjalan di http://localhost:5000
```

---

**Terminal 2 - Jalankan Frontend:**
```powershell
cd c:\xampp\htdocs\toko-bangunan\frontend
npm start
```

**Expected Output:**
```
Compiled successfully!
Local: http://localhost:3000
```

---

### **Terminal 3 (Opsional) - Insert Data Dummy:**
```powershell
cd c:\xampp\htdocs\toko-bangunan\backend
npm run seed
```

---

## 📱 MENGGUNAKAN APLIKASI

### **1. Buka Browser**

Ketik URL:
```
http://localhost:3000
```

Akan muncul halaman **Login**.

---

### **2. Login**

| Field | Isi |
|-------|-----|
| 📧 Email | `admin@toko.com` |
| 🔑 Password | `password123` |

Tekan **LOGIN** atau Enter.

---

### **3. Halaman Dashboard**

Setelah login, akan melihat:
- 👤 Nama user (Admin Toko)
- 📧 Email (admin@toko.com)
- 👑 Role (admin)

Menu navigasi:
```
├── Dashboard
├── Produk
├── Penjualan
├── Pelanggan
├── Laporan
└── Logout (keluar)
```

---

## 📦 MODUL PRODUK

### **Apa itu Modul Produk?**

Untuk mengelola barang-barang yang dijual:
- Tambah produk baru
- Edit harga/stok
- Hapus produk
- Lihat daftar produk

### **Struktur Data Produk**

```
ID          | Nama Produk           | Kategori    | Harga  | Stok
1           | Semen Portland        | Material    | 50000  | 100
2           | Keramik Lantai        | Material    | 75000  | 50
3           | Cat Tembok            | Finishing   | 80000  | 75
```

### **Cara Menggunakan**

1. Klik menu **Produk** di dashboard
2. Akan melihat tabel daftar produk
3. **Tambah Produk**: Klik tombol **+ Tambah Produk**
4. **Edit Produk**: Klik **Edit** di baris produk
5. **Hapus Produk**: Klik **Hapus** (akan minta konfirmasi)

---

## 💰 MODUL PENJUALAN

### **Apa itu Modul Penjualan?**

Untuk mencatat setiap transaksi penjualan:
- Catat penjualan produk
- Lihat total penjualan
- Cetak invoice
- Lihat riwayat penjualan

### **Struktur Data Penjualan**

```
ID  | Tanggal     | Pelanggan    | Produk            | Qty | Harga Satuan | Total
1   | 2026-03-12  | Budi         | Semen Portland    | 5   | 50000        | 250000
2   | 2026-03-12  | Siti         | Keramik Lantai    | 10  | 75000        | 750000
3   | 2026-03-12  | Ahmad        | Cat Tembok        | 3   | 80000        | 240000
```

### **Cara Menggunakan**

1. Klik menu **Penjualan** di dashboard
2. Klik **+ Tambah Penjualan**
3. Pilih **Pelanggan** (dropdown)
4. Pilih **Produk** (dropdown)
5. Isi **Jumlah**
6. Harga otomatis terisi
7. Klik **Simpan**
8. Transaksi tercatat dan stok produk berkurang otomatis

---

## 👥 MODUL PELANGGAN

### **Apa itu Modul Pelanggan?**

Untuk kelola data pembeli:
- Tambah pelanggan baru
- Edit data pelanggan
- Lihat riwayat pembelian pelanggan
- Hapus pelanggan

### **Struktur Data Pelanggan**

```
ID  | Nama        | Email              | Telepon      | Alamat
1   | Budi        | budi@example.com   | 08123456789  | Jl. Merdeka 1
2   | Siti        | siti@example.com   | 08234567890  | Jl. Ahmad Yani 2
3   | Ahmad       | ahmad@example.com  | 08345678901  | Jl. Gatot Subroto 3
```

### **Cara Menggunakan**

1. Klik menu **Pelanggan** di dashboard
2. Akan melihat daftar pelanggan
3. **Tambah Pelanggan**: Klik **+ Tambah Pelanggan**
4. Isi form: Nama, Email, Telepon, Alamat
5. Klik **Simpan**

---

## 📊 MODUL LAPORAN

### **Apa itu Modul Laporan?**

Untuk melihat analisis penjualan:
- Total penjualan per hari/bulan/tahun
- Produk terlaris
- Pelanggan setia
- Grafik penjualan

### **Contoh Laporan**

**Laporan Penjualan (Bulan Maret 2026):**
```
Total Penjualan:        Rp 1.240.000
Total Transaksi:        3
Rata-rata Transaksi:    Rp 413.333
Produk Terlaris:        Keramik Lantai (10 unit)
```

### **Cara Menggunakan**

1. Klik menu **Laporan** di dashboard
2. Pilih **Periode**: Hari / Minggu / Bulan / Tahun
3. Otomatis menampilkan laporan
4. Klik **Print** untuk cetak

---

## 🔒 USER & ROLES

### **Admin**
User: `admin@toko.com`
Pass: `password123`
Hak akses: Semua menu (Produk, Penjualan, Pelanggan, Laporan)

### **Penjual**
User: `penjual@toko.com`
Pass: `password123`
Hak akses: Produk, Penjualan, Pelanggan (tidak bisa laporan)

### **Kasir**
User: `kasir@toko.com`
Pass: `password123`
Hak akses: Hanya Penjualan dan Pelanggan

---

## 📋 FLOW PENGGUNAAN HARIAN

### **Pagi (Pembukaan Toko)**
1. Jalankan aplikasi (2 terminal)
2. Login admin
3. Cek **Dashboard** melihat stok produk yang tinggal sedikit
4. Update stok di menu **Produk** jika perlu

### **Siang (Penjualan)**
1. Kasir login dengan user kasir
2. Setiap ada pembeli, klik **Penjualan**
3. Catat produk yang dibeli
4. Stok otomatis berkurang
5. Print invoice untuk pelanggan

### **Sore (Rekapitulasi)**
1. Login admin
2. Klik **Laporan**
3. Lihat total penjualan hari ini
4. Cek produk apa yang laris
5. Export report jika perlu

### **Malam (Penutupan)**
1. Logout dari aplikasi
2. Hentikan kedua terminal (Ctrl + C)
3. Matikan MySQL di XAMPP Control Panel

---

## 🐛 TROUBLESHOOTING

### **❌ Aplikasi tidak bisa diakses**

**Error:** Blank page / loading terus

**Solusi:**
1. Tekan **Ctrl + Shift + R** (hard refresh)
2. Buka **F12 → Console**, lihat error apa
3. Jika masih error, hentikan kedua terminal:
   ```powershell
   Get-Process node | Stop-Process -Force
   ```
4. Jalankan lagi dari step awal

---

### **❌ Login gagal**

**Error:** Email atau password salah

**Solusi:**
1. Cek email: harus `admin@toko.com` (huruf kecil)
2. Cek password: `password123`
3. Jika lupa, reset admin:
   ```powershell
   cd c:\xampp\htdocs\toko-bangunan\backend
   npm run reset
   ```

---

### **❌ Database tidak terhubung**

**Error:** Connection failed / ECONNREFUSED

**Solusi:**
1. Buka **XAMPP Control Panel**
2. Start **MySQL** (klik tombol Start)
3. Tunggu sampai berwarna hijau
4. Coba login lagi

---

### **❌ Port 3000 atau 5000 sudah terpakai**

**Error:** Port 3000 already in use

**Solusi:**
```powershell
# Kill process di port 3000
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue).OwningProcess -ErrorAction SilentlyContinue | Stop-Process -Force

# Kill process di port 5000
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue).OwningProcess -ErrorAction SilentlyContinue | Stop-Process -Force
```

---

## 📂 STRUKTUR FOLDER PROJECT

```
toko-bangunan/
│
├── backend/                    # Server Node.js
│   ├── config/
│   │   └── database.js        # Konfigurasi database
│   ├── controllers/           # Business logic
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── salesController.js
│   │   └── customerController.js
│   ├── models/                # Database schema
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Sales.js
│   │   └── Customer.js
│   ├── routes/                # API endpoints
│   │   └── authRoutes.js
│   ├── scripts/               # Helper scripts
│   │   ├── resetAdmin.js
│   │   └── seedData.js
│   ├── .env                   # Environment variables
│   ├── server.js              # Entry point
│   └── package.json
│
├── frontend/                  # React app
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── pages/
│   │   │   ├── LoginPage.js
│   │   │   └── DashboardPage.js
│   │   ├── services/
│   │   │   └── authService.js
│   │   ├── App.js
│   │   └── index.js
│   ├── .env
│   └── package.json
│
└── PANDUAN_LENGKAP.md         # File ini
```

---

## 🎓 TIPS & TRICKS

### **Tip 1: Gunakan User yang Sesuai**
Jangan gunakan admin untuk kasir. Buat user kasir dengan password sendiri.

### **Tip 2: Backup Data Rutin**
Export database setiap minggu dari phpMyAdmin untuk backup.

### **Tip 3: Update Stok Berkala**
Cek ke database MySQL jika stok tidak sesuai secara fisik.

### **Tip 4: Monitor Penjualan**
Lihat laporan setiap minggu untuk tahu produk apa yang paling laris.

---

## 📞 QUICK REFERENCE

| Kebutuhan | Solusi |
|-----------|--------|
| Run aplikasi | `cd backend && npm run dev` + `cd frontend && npm start` |
| Reset admin | `cd backend && npm run reset` |
| Insert data dummy | `cd backend && npm run seed` |
| Buka database | http://localhost/phpmyadmin |
| Buka aplikasi | http://localhost:3000 |
| Login admin | admin@toko.com / password123 |
| Lihat error backend | Lihat terminal backend |
| Lihat error frontend | Buka F12 (DevTools) |

---

## ✅ CHECKLIST SEBELUM MENGGUNAKAN

- [ ] Node.js sudah install
- [ ] XAMPP sudah install
- [ ] MySQL XAMPP sudah running
- [ ] Database `toko_bangunan` sudah buat
- [ ] Dependencies sudah install (npm install)
- [ ] Backend berjalan (npm run dev)
- [ ] Frontend berjalan (npm start)
- [ ] Bisa buka http://localhost:3000
- [ ] Data dummy sudah insert (npm run seed)
- [ ] Login berhasil dengan admin

---

**Semoga bermanfaat! Happily coding! 🚀**
