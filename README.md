# 🏢 Toko Bangunan - Sistem Manajemen

Sistem manajemen toko bangunan modern dengan backend Node.js + Express + Sequelize dan frontend React.

---

## 🚀 QUICK START

### Opsi 1: Otomatis (Recommended) ⭐

**Double-click:** `QUICK-START.bat`

Ini akan:

- ✅ Setup semua dependencies
- ✅ Menjalan backend & frontend
- ✅ Membuka browser otomatis di `http://localhost:3000`

### Opsi 2: Manual

#### 1. **Install Dependencies**

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

#### 2. **Setup Database** (Auto)

Database akan dibuat otomatis saat server pertama kali dijalankan.

```
✅ Pastikan MySQL XAMPP berjalan
```

#### 3. **Jalankan Server** (Open 2 Terminals)

```bash
# Terminal 1 - Backend (port 5000)
cd backend
npm run dev

# Terminal 2 - Frontend (port 3000)
cd frontend
npm start
```

#### 4. **Buka Browser**

```
http://localhost:3000
```

#### 5. **Reset Admin User** (Jika diperlukan)

```bash
cd backend
npm run reset
```

---

## 📋 LOGIN CREDENTIALS

| Field | Value |
|-------|-------|
| Email | `admin@toko.com` |
| Password | `password123` |
| Role | Admin |

---

## 🛠️ UTILITY SCRIPTS

Berada di **project root** folder:

```bash
QUICK-START.bat      # ⭐ Recommended - Setup & Run lengkap
TROUBLESHOOT.bat     # 🔧 Diagnostics & troubleshooting
setup-and-run.bat    # 📦 Alternative setup script
```

---

## 🗂️ PROJECT STRUCTURE

```
toko-bangunan/
│
├── backend/
│   ├── config/
│   │   └── database.js           # Konfigurasi Sequelize
│   ├── controllers/
│   │   └── authController.js     # Login/Logout logic
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT verification
│   ├── models/
│   │   ├── index.js              # Model registry
│   │   └── User.js               # User model
│   ├── routes/
│   │   └── authRoutes.js         # Auth endpoints
│   ├── scripts/
│   │   └── resetAdmin.js         # Admin reset script
│   ├── .env                      # Environment variables
│   ├── server.js                 # Entry point
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   └── index.html            # HTML template
│   ├── src/
│   │   ├── context/
│   │   │   └── AuthContext.js    # Auth state management
│   │   ├── pages/
│   │   │   ├── LoginPage.js      # Login form
│   │   │   ├── LoginPage.css
│   │   │   ├── DashboardPage.js  # Dashboard
│   │   │   └── DashboardPage.css
│   │   ├── services/
│   │   │   └── authService.js    # API calls
│   │   ├── App.js                # Main component
│   │   ├── App.css
│   │   ├── index.js              # ReactDOM entry
│   │   └── index.css
│   ├── .env                      # Frontend config
│   ├── .env.development          # Dev config
│   └── package.json
│
└── README.md                     # This file
```

---

## 🔧 API ENDPOINTS

### **Authentication**

#### Login

```bash
POST /api/auth/login

Body:
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

#### Logout

```bash
POST /api/auth/logout

Response (200):
{
  "success": true,
  "message": "Logout berhasil"
}
```

#### Test API

```bash
GET /api/test

Response (200):
{
  "message": "Backend API berjalan dengan baik"
}
```

---

## 🔐 AUTHENTICATION FLOW

```
1. User login dengan email & password
   ↓
2. Backend hash password dengan bcrypt
   ↓
3. Compare dengan password di database
   ↓
4. Generate JWT token (24h validity)
   ↓
5. Return user data + token
   ↓
6. Frontend simpan token ke localStorage
   ↓
7. Redirect ke Dashboard
   ↓
8. Token included di setiap request (Authorization header)
```

---

## 🛠️ DEVELOPMENT

### **Available Commands**

```bash
# Backend
npm run dev      # Run with nodemon (development)
npm start        # Run production
npm run reset    # Reset admin user

# Frontend
npm start        # Development server
npm run build    # Production build
npm test         # Run tests
```

### **Environment Variables**

**Backend (.env)**

```
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=toko_bangunan
JWT_SECRET=secret-key-development
NODE_ENV=development
```

**Frontend (.env)**

```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 📦 DEPENDENCIES

### **Backend**

- `express` - Web framework
- `cors` - Cross-origin support
- `dotenv` - Environment variables
- `sequelize` - ORM
- `mysql2` - MySQL driver
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT tokens
- `nodemon` - Development auto-reload

### **Frontend**

- `react` - UI library
- `react-dom` - React DOM
- `react-scripts` - Build tool

---

## 🐛 TROUBLESHOOTING

### **Quick Diagnostic**

Run script di project root:
```bash
TROUBLESHOOT.bat
```

Ini akan mengecek semua requirements dan memberikan solusi.

### **Port Already in Use (Windows)**

```bash
# Option 1: Kill node processes
taskkill /im node.exe /f

# Option 2: Change PORT in backend/.env
PORT=5001
```

### **Database Connection Failed**

**Checklist:**
1. ✅ XAMPP Control Panel → MySQL → Click "Start"
2. ✅ Backend `.env` file:
   - DB_HOST=localhost
   - DB_PORT=3306
   - DB_USER=root
   - DB_PASSWORD= (kosong)
   - DB_NAME=toko_bangunan
3. ✅ Jalankan: `npm run reset` di backend folder

### **Frontend tidak bisa connect ke Backend**

```bash
# Frontend folder → .env
REACT_APP_API_URL=http://localhost:5000/api

# Kemudian:
# - Close terminal Frontend
# - Jalankan: npm start ulang
# - Hard refresh browser: Ctrl+Shift+R
# - Clear cache: F12 → Application → Clear Storage
```

### **Login gagal (Email atau password salah)**

```bash
# Reset admin ke default:
cd backend
npm run reset

# Output:
# Email: admin@toko.com
# Password: password123
```

### **npm ERR! / Dependencies Error**

```bash
# Solution: Clean Install
# 1. Jalankan TROUBLESHOOT.bat
# 2. Pilih opsi 3 (Clean install)
# Atau manual:
cd backend
rmdir /s /q node_modules
del package-lock.json
npm install
```

### **Cannot find module (Error saat run)**

```bash
# Backend:
cd backend
npm install --save [package-name]

# Frontend:
cd frontend
npm install --save [package-name]

# Jika masih error, lakukan clean install (lihat di atas)
```

---

## 📱 FEATURES

✅ User Authentication (Login/Logout)  
✅ Password Hashing (bcrypt)  
✅ JWT Token Based Auth  
✅ Role-Based Access (admin, pelanggan, penjual)  
✅ Responsive Dashboard  
✅ User Profile Display  
✅ Auto-Redirect After Login  
✅ Logout Functionality

---

## 🚀 DEPLOYMENT

### **Production Build**

```bash
# Frontend
cd frontend
npm run build
# Output: build/ folder

# Backend
npm start
# Make sure NODE_ENV=production in .env
```

---

## 📞 SUPPORT

### **Utilities untuk Debugging:**

1. **TROUBLESHOOT.bat** - Automated diagnostics
   - Cek Node.js, npm
   - Test database connection
   - Reset admin user
   - Kill processes
   - View users di database

2. **Browser Console (F12)**
   - Network tab: Cek API requests
   - Console tab: Error messages
   - Application tab: Check localStorage & tokens

3. **Backend Logs**
   - Lihat terminal backend saat error terjadi
   - Database connection status
   - API request logs

4. **Database (phpMyAdmin)**
   - URL: `http://localhost/phpmyadmin`
   - User: root
   - Password: (empty)
   - Database: toko_bangunan
   - Table: users

---

## ⚙️ SYSTEM REQUIREMENTS

- **Node.js** v14+ ([Download](https://nodejs.org))
- **npm** v6+ (comes with Node.js)
- **MySQL 5.7+** (via XAMPP)
- **Windows/macOS/Linux**
- **Modern Browser** (Chrome, Firefox, Edge, Safari)

---

## 💾 PROJECT INFO

- **Backend**: Express.js + Sequelize ORM
- **Frontend**: React 18 + React Scripts
- **Database**: MySQL with auto-migration
- **Authentication**: JWT + bcrypt
- **API Format**: RESTful JSON

---

## 📄 LICENSE

Toko Bangunan Management System - 2026

---

**Status: ✅ READY FOR USE**

Last Updated: March 12, 2026
