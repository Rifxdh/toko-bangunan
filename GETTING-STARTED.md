# 🚀 GETTING STARTED GUIDE

## ⚡ Fastest Way (5 minutes)

### Step 1: Ensure MySQL is Running

- Open **XAMPP Control Panel**
- Click **Start** next to **MySQL**
- Wait for it to show "running"

### Step 2: Run Quick Start Script

1. Navigate to project folder: `c:\xampp\htdocs\toko-bangunan`
2. **Double-click** `QUICK-START.bat`
3. Choose option **1** to start both servers
4. Browser will open automatically at `http://localhost:3000`

### Step 3: Login

```
Email:    admin@toko.com
Password: password123
```

✅ Done! You're in the dashboard.

---

## 📋 Full Setup (Manual)

### Prerequisites

- ✅ Node.js v14+ installed ([Download](https://nodejs.org))
- ✅ XAMPP with MySQL running
- ✅ This project folder: `c:\xampp\htdocs\toko-bangunan`

### 1. Install Backend Dependencies

```cmd
cd c:\xampp\htdocs\toko-bangunan\backend
npm install
```

Wait for it to finish (~2 minutes first time)

### 2. Install Frontend Dependencies

```cmd
cd c:\xampp\htdocs\toko-bangunan\frontend
npm install
```

Wait for it to finish (~3 minutes first time)

### 3. Start Backend Server (Terminal 1)

```cmd
cd c:\xampp\htdocs\toko-bangunan\backend
npm run dev
```

You should see:

```
✅ Koneksi database berhasil
✅ Database tersinkronisasi
🚀 Server berjalan di http://localhost:5000
```

### 4. Start Frontend Server (Terminal 2)

```cmd
cd c:\xampp\htdocs\toko-bangunan\frontend
npm start
```

Browser will open automatically at `http://localhost:3000`

### 5. Login

When you see the login page:

```
Email:    admin@toko.com
Password: password123
```

---

## 🔑 Default Credentials

After first setup, default admin user:

| Field    | Value            |
| -------- | ---------------- |
| Email    | `admin@toko.com` |
| Password | `password123`    |
| Role     | admin            |

### Reset Admin to Default

If you forgot password or want to reset:

```cmd
cd backend
npm run reset
```

---

## 📊 Port Information

| Service     | URL                         | Status     |
| ----------- | --------------------------- | ---------- |
| Frontend    | http://localhost:3000       | React App  |
| Backend API | http://localhost:5000       | REST API   |
| MySQL       | localhost:3306              | Database   |
| phpMyAdmin  | http://localhost/phpmyadmin | DB Manager |

---

## 🛠️ Scripts & Commands

### Quick Start (Recommended)

```bash
QUICK-START.bat          # Menu-driven setup
TROUBLESHOOT.bat         # Diagnostics & fixes
setup-and-run.bat        # Alternative setup
```

### Backend Commands

```bash
cd backend

npm install              # Install dependencies
npm run dev              # Development mode (auto-reload)
npm start                # Production mode
npm run reset            # Reset admin user
```

### Frontend Commands

```bash
cd frontend

npm install              # Install dependencies
npm start                # Development server
npm run build            # Production build
npm test                 # Run tests
```

---

## ❓ Common Issues & Solutions

### Issue: MySQL Connection Failed

**Solution:**

1. Open XAMPP Control Panel
2. Click **Start** on MySQL
3. In backend `.env`, verify:
   ```
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=
   ```
4. Run: `npm run reset`

### Issue: Port Already in Use

**Solution:**

```cmd
# Kill all node processes
taskkill /im node.exe /f

# Then start again
npm run dev
```

Or change port in `backend/.env`:

```
PORT=5001
```

### Issue: npm ERR! / Module Not Found

**Solution:**

```cmd
# Clean install
cd backend
rmdir /s /q node_modules
del package-lock.json
npm install
```

Or use: `TROUBLESHOOT.bat` → Option 3

### Issue: Login Failed (Wrong Credentials)

**Solution:**

```cmd
cd backend
npm run reset
```

Then login with:

- Email: `admin@toko.com`
- Password: `password123`

### Issue: Frontend doesn't connect to Backend

**Checklist:**

1. Backend is running (Terminal shows "Server berjalan di http://localhost:5000")
2. Frontend `.env` is correct: `REACT_APP_API_URL=http://localhost:5000/api`
3. Hard refresh: `Ctrl+Shift+R`
4. Clear cache: `F12` → `Application` → `Clear Storage`
5. Restart: Close & re-run `npm start`

### Issue: React Page is Blank or Not Loading

**Solution:**

1. Check browser console: `F12` → `Console` tab
2. Check for errors
3. Hard refresh: `Ctrl+Shift+R`
4. Clear localStorage: `F12` → `Application` → Clear Storage
5. Restart frontend: `npm start`

---

## 🔐 Security Notes

⚠️ **Development Only!**

This setup is for development. For production:

1. Change JWT_SECRET in `backend/.env`

   ```
   JWT_SECRET=your-very-secure-random-key-here
   ```

2. Use real database password

   ```
   DB_PASSWORD=your-real-password
   ```

3. Update CORS origin in `backend/server.js`

   ```js
   origin: "https://yourdomain.com";
   ```

4. Set NODE_ENV=production
   ```
   NODE_ENV=production
   ```

---

## 📚 Project Structure

```
toko-bangunan/
├── backend/                    # Node.js + Express
│   ├── config/
│   │   └── database.js         # Database configuration
│   ├── controllers/
│   │   └── authController.js   # Auth logic
│   ├── models/
│   │   ├── index.js
│   │   └── User.js             # User model
│   ├── routes/
│   │   └── authRoutes.js       # API endpoints
│   ├── scripts/
│   │   └── resetAdmin.js       # Admin setup
│   ├── .env                    # Config file
│   ├── server.js               # Entry point
│   └── package.json
│
├── frontend/                   # React
│   ├── public/
│   │   └── index.html          # HTML template
│   ├── src/
│   │   ├── context/
│   │   │   └── AuthContext.js  # Auth state
│   │   ├── pages/
│   │   │   ├── LoginPage.js    # Login form
│   │   │   └── DashboardPage.js
│   │   ├── services/
│   │   │   └── authService.js  # API calls
│   │   ├── App.js              # Root component
│   │   └── index.js
│   ├── .env
│   └── package.json
│
├── README.md                   # Full documentation
├── QUICK-START.bat             # ⭐ Recommended
├── TROUBLESHOOT.bat            # Diagnostics
├── GETTING-STARTED.md          # This file
└── setup-and-run.bat
```

---

## 🚀 Next Steps

1. ✅ Run the application successfully
2. 📝 Explore the code structure
3. 🔧 Customize for your needs
4. 🧪 Test the API endpoints
5. 📦 Prepare for deployment

---

## 📞 Help & Resources

- **Error in browser?** Check F12 Console
- **Error in backend?** Check backend terminal
- **Database error?** Check XAMPP MySQL status
- **Module error?** Run TROUBLESHOOT.bat
- **Still stuck?** Check README.md for more details

---

**Good luck! Happy coding! 🚀**

Last Updated: March 12, 2026
