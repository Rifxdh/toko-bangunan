# 📡 API DOCUMENTATION - TOKO BANGUNAN

Base URL: `http://localhost:5000/api`

---

## 🔐 AUTHENTICATION

### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "admin@toko.com",
  "password": "password123"
}

Response (200):
{
  "success": true,
  "message": "Login berhasil",
  "data": {
    "user": {
      "id": 1,
      "email": "admin@toko.com",
      "nama": "Admin Toko",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Logout
```
POST /auth/logout

Response (200):
{
  "success": true,
  "message": "Logout berhasil"
}
```

---

## 📦 PRODUCTS

### Get All Products
```
GET /products

Response (200):
[
  {
    "id": 1,
    "nama": "Semen Portland",
    "kategori": "Material",
    "harga": 50000,
    "stok": 100,
    "deskripsi": "Semen murni untuk konstruksi",
    "createdAt": "2026-03-12T10:00:00.000Z",
    "updatedAt": "2026-03-12T10:00:00.000Z"
  },
  ...
]
```

### Get Product by ID
```
GET /products/{id}

Example: GET /products/1

Response (200):
{
  "id": 1,
  "nama": "Semen Portland",
  "kategori": "Material",
  "harga": 50000,
  "stok": 100,
  "deskripsi": "Semen murni untuk konstruksi",
  "createdAt": "2026-03-12T10:00:00.000Z",
  "updatedAt": "2026-03-12T10:00:00.000Z"
}
```

### Create Product
```
POST /products
Content-Type: application/json

{
  "nama": "Papan Kayu",
  "kategori": "Material",
  "harga": 100000,
  "stok": 50,
  "deskripsi": "Papan kayu berkualitas"
}

Response (201):
{
  "success": true,
  "message": "Produk berhasil ditambahkan",
  "data": {
    "id": 9,
    "nama": "Papan Kayu",
    "kategori": "Material",
    "harga": 100000,
    "stok": 50,
    "deskripsi": "Papan kayu berkualitas",
    "createdAt": "2026-03-12T10:30:00.000Z",
    "updatedAt": "2026-03-12T10:30:00.000Z"
  }
}
```

### Update Product
```
PUT /products/{id}
Content-Type: application/json

{
  "harga": 95000,
  "stok": 60
}

Response (200):
{
  "success": true,
  "message": "Produk berhasil diperbarui",
  "data": {
    "id": 1,
    "nama": "Semen Portland",
    "kategori": "Material",
    "harga": 95000,
    "stok": 60,
    "deskripsi": "Semen murni untuk konstruksi",
    "createdAt": "2026-03-12T10:00:00.000Z",
    "updatedAt": "2026-03-12T10:30:00.000Z"
  }
}
```

### Delete Product
```
DELETE /products/{id}

Response (200):
{
  "success": true,
  "message": "Produk berhasil dihapus"
}
```

---

## 👥 CUSTOMERS

### Get All Customers
```
GET /customers

Response (200):
[
  {
    "id": 1,
    "nama": "Budi Santoso",
    "email": "budi@example.com",
    "telepon": "08123456789",
    "alamat": "Jl. Merdeka 1, Jakarta",
    "totalPembelian": 250000,
    "createdAt": "2026-03-12T10:00:00.000Z",
    "updatedAt": "2026-03-12T10:00:00.000Z"
  },
  ...
]
```

### Get Customer by ID
```
GET /customers/{id}

Example: GET /customers/1

Response (200):
{
  "id": 1,
  "nama": "Budi Santoso",
  "email": "budi@example.com",
  "telepon": "08123456789",
  "alamat": "Jl. Merdeka 1, Jakarta",
  "totalPembelian": 250000,
  "createdAt": "2026-03-12T10:00:00.000Z",
  "updatedAt": "2026-03-12T10:00:00.000Z"
}
```

### Create Customer
```
POST /customers
Content-Type: application/json

{
  "nama": "Roni Wijaya",
  "email": "roni@example.com",
  "telepon": "08678901234",
  "alamat": "Jl. Sudirman 6, Bandung"
}

Response (201):
{
  "success": true,
  "message": "Pelanggan berhasil ditambahkan",
  "data": {
    "id": 6,
    "nama": "Roni Wijaya",
    "email": "roni@example.com",
    "telepon": "08678901234",
    "alamat": "Jl. Sudirman 6, Bandung",
    "totalPembelian": 0,
    "createdAt": "2026-03-12T10:30:00.000Z",
    "updatedAt": "2026-03-12T10:30:00.000Z"
  }
}
```

### Update Customer
```
PUT /customers/{id}
Content-Type: application/json

{
  "telepon": "08987654321",
  "alamat": "Jl. Sudirman 7, Bandung"
}

Response (200):
{
  "success": true,
  "message": "Pelanggan berhasil diperbarui",
  "data": {
    "id": 1,
    "nama": "Budi Santoso",
    "email": "budi@example.com",
    "telepon": "08987654321",
    "alamat": "Jl. Sudirman 7, Bandung",
    "totalPembelian": 250000,
    "createdAt": "2026-03-12T10:00:00.000Z",
    "updatedAt": "2026-03-12T10:30:00.000Z"
  }
}
```

### Delete Customer
```
DELETE /customers/{id}

Response (200):
{
  "success": true,
  "message": "Pelanggan berhasil dihapus"
}
```

---

## 💰 SALES

### Get All Sales
```
GET /sales

Response (200):
[
  {
    "id": 1,
    "customerId": 1,
    "productId": 1,
    "jumlah": 5,
    "hargaSatuan": "50000",
    "total": "250000",
    "tanggal": "2026-03-10T00:00:00.000Z",
    "keterangan": null,
    "createdAt": "2026-03-12T10:00:00.000Z",
    "updatedAt": "2026-03-12T10:00:00.000Z",
    "Customer": {
      "id": 1,
      "nama": "Budi Santoso",
      "email": "budi@example.com"
    },
    "Product": {
      "id": 1,
      "nama": "Semen Portland",
      "harga": "50000"
    }
  },
  ...
]
```

### Get Sales by ID
```
GET /sales/{id}

Example: GET /sales/1

Response (200):
{
  "id": 1,
  "customerId": 1,
  "productId": 1,
  "jumlah": 5,
  "hargaSatuan": "50000",
  "total": "250000",
  "tanggal": "2026-03-10T00:00:00.000Z",
  "keterangan": null,
  "createdAt": "2026-03-12T10:00:00.000Z",
  "updatedAt": "2026-03-12T10:00:00.000Z",
  "Customer": {
    "id": 1,
    "nama": "Budi Santoso",
    "email": "budi@example.com"
  },
  "Product": {
    "id": 1,
    "nama": "Semen Portland",
    "harga": "50000"
  }
}
```

### Create Sales
```
POST /sales
Content-Type: application/json

{
  "customerId": 1,
  "productId": 2,
  "jumlah": 3,
  "keterangan": "Pengiriman ke lokasi proyek"
}

Response (201):
{
  "success": true,
  "message": "Penjualan berhasil dicatat",
  "data": {
    "id": 9,
    "customerId": 1,
    "productId": 2,
    "jumlah": 3,
    "hargaSatuan": "75000",
    "total": "225000",
    "tanggal": "2026-03-12T10:30:00.000Z",
    "keterangan": "Pengiriman ke lokasi proyek",
    "createdAt": "2026-03-12T10:30:00.000Z",
    "updatedAt": "2026-03-12T10:30:00.000Z"
  }
}
```

**Note:** Stok produk otomatis berkurang, totalPembelian pelanggan otomatis bertambah.

### Update Sales
```
PUT /sales/{id}
Content-Type: application/json

{
  "jumlah": 5,
  "keterangan": "Perubahan jumlah sesuai permintaan"
}

Response (200):
{
  "success": true,
  "message": "Penjualan berhasil diperbarui",
  "data": {
    "id": 1,
    "customerId": 1,
    "productId": 1,
    "jumlah": 5,
    "hargaSatuan": "50000",
    "total": "250000",
    "tanggal": "2026-03-10T00:00:00.000Z",
    "keterangan": "Perubahan jumlah sesuai permintaan",
    "createdAt": "2026-03-12T10:00:00.000Z",
    "updatedAt": "2026-03-12T10:30:00.000Z"
  }
}
```

### Delete Sales
```
DELETE /sales/{id}

Response (200):
{
  "success": true,
  "message": "Penjualan berhasil dihapus"
}
```

**Note:** Stok produk otomatis akan ditambahkan kembali, totalPembelian pelanggan berkurang.

### Get Sales Report
```
GET /sales/report?startDate=2026-03-01&endDate=2026-03-31

Response (200):
{
  "success": true,
  "data": {
    "sales": [
      {
        "id": 1,
        "customerId": 1,
        "productId": 1,
        "jumlah": 5,
        "hargaSatuan": "50000",
        "total": "250000",
        "tanggal": "2026-03-10T00:00:00.000Z",
        "Customer": {
          "id": 1,
          "nama": "Budi Santoso"
        },
        "Product": {
          "id": 1,
          "nama": "Semen Portland"
        }
      },
      ...
    ],
    "summary": {
      "totalSales": 1240000,
      "totalTransactions": 8,
      "averageTransaction": 155000
    }
  }
}
```

---

## 🛠️ TESTING API DENGAN POSTMAN/THUNDER CLIENT

### 1. Buat Produk Baru
- Method: `POST`
- URL: `http://localhost:5000/api/products`
- Body (JSON):
```json
{
  "nama": "Pipa Besi",
  "kategori": "Material",
  "harga": 95000,
  "stok": 40,
  "deskripsi": "Pipa besi galvanis"
}
```

### 2. Buat Pelanggan Baru
- Method: `POST`
- URL: `http://localhost:5000/api/customers`
- Body (JSON):
```json
{
  "nama": "Siti Nurhaliza",
  "email": "siti@example.com",
  "telepon": "08234567890",
  "alamat": "Jl. Ahmad Yani 2, Bandung"
}
```

### 3. Catat Penjualan
- Method: `POST`
- URL: `http://localhost:5000/api/sales`
- Body (JSON):
```json
{
  "customerId": 1,
  "productId": 1,
  "jumlah": 2,
  "keterangan": "Pembayaran cash"
}
```

### 4. Lihat Laporan Penjualan
- Method: `GET`
- URL: `http://localhost:5000/api/sales/report?startDate=2026-03-01&endDate=2026-03-31`

---

## 📊 ERROR HANDLING

### Error: Stok Tidak Cukup
```json
{
  "success": false,
  "message": "Stok tidak cukup. Stok tersedia: 30"
}
```

### Error: Data Tidak Ditemukan
```json
{
  "success": false,
  "message": "Produk tidak ditemukan"
}
```

### Error: Validasi Gagal
```json
{
  "success": false,
  "message": "Nama, kategori, dan harga harus diisi"
}
```

---

## 🔗 QUICK LINKS

| Endpoint | Method | Keterangan |
|----------|--------|-----------|
| `/api/products` | GET | Lihat semua produk |
| `/api/products` | POST | Tambah produk |
| `/api/products/{id}` | PUT | Edit produk |
| `/api/products/{id}` | DELETE | Hapus produk |
| `/api/customers` | GET | Lihat semua pelanggan |
| `/api/customers` | POST | Tambah pelanggan |
| `/api/customers/{id}` | PUT | Edit pelanggan |
| `/api/customers/{id}` | DELETE | Hapus pelanggan |
| `/api/sales` | GET | Lihat semua penjualan |
| `/api/sales` | POST | Catat penjualan |
| `/api/sales/{id}` | PUT | Edit penjualan |
| `/api/sales/{id}` | DELETE | Hapus penjualan |
| `/api/sales/report` | GET | Laporan penjualan |

---

**Happy Testing! 🚀**
