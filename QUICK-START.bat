@echo off
chcp 65001 >nul
color 0B
cls

echo.
echo ╔══════════════════════════════════════════════════════════════════╗
echo ║                                                                  ║
echo ║           ⚡ TOKO BANGUNAN - QUICK START                       ║
echo ║                                                                  ║
echo ║  Sistem Manajemen Toko Bangunan dengan Node.js + React         ║
echo ║                                                                  ║
echo ╚══════════════════════════════════════════════════════════════════╝
echo.

setlocal enabledelayedexpansion

REM Check Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js tidak ditemukan! Install dari https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js: 
node --version
echo.

REM Check MySQL/XAMPP
echo 🔍 Status:
echo   - Database akan dibuat otomatis (toko_bangunan)
echo   - Pastikan MySQL XAMPP berjalan
echo   - Port Backend: 5000
echo   - Port Frontend: 3000
echo.

REM Install Dependencies
echo 📦 Installing dependencies...
echo.

cd /d c:\xampp\htdocs\toko-bangunan\backend

if not exist node_modules (
    echo   [Backend] Installing npm packages...
    call npm install --silent >nul 2>&1
    if %errorlevel% neq 0 (
        echo   ❌ Backend installation failed
        pause
        exit /b 1
    )
)
echo   ✅ Backend ready

cd /d c:\xampp\htdocs\toko-bangunan\frontend

if not exist node_modules (
    echo   [Frontend] Installing npm packages...
    call npm install --silent >nul 2>&1
    if %errorlevel% neq 0 (
        echo   ❌ Frontend installation failed
        pause
        exit /b 1
    )
)
echo   ✅ Frontend ready
echo.

REM Menu
:MENU
cls
echo.
echo ╔══════════════════════════════════════════════════════════════════╗
echo ║                     PILIH OPSI                                   ║
echo ╚══════════════════════════════════════════════════════════════════╝
echo.
echo  1. ▶️  Jalankan kedua server (Backend + Frontend)
echo  2. 🔧 Reset Admin User (admin@toko.com / password123)
echo  3. 🔄 Backend only (npm run dev)
echo  4. 💻 Frontend only (npm start)
echo  5. ℹ️  Informasi & Credentials
echo  6. ❌ Keluar
echo.
set /p menu="Pilih opsi (1-6): "

if "%menu%"=="1" goto START_BOTH
if "%menu%"=="2" goto RESET_ADMIN
if "%menu%"=="3" goto BACKEND_ONLY
if "%menu%"=="4" goto FRONTEND_ONLY
if "%menu%"=="5" goto INFO
if "%menu%"=="6" goto EXIT_SCRIPT
goto MENU

:START_BOTH
cls
echo.
echo 🚀 Meluncurkan kedua server...
echo.
echo ⏳ Tunggu 5 detik sebelum browser membuka...
echo.

cd /d c:\xampp\htdocs\toko-bangunan\backend
start "TOKO-BANGUNAN: Backend (Port 5000)" cmd /k npm run dev

timeout /t 3 /nobreak

cd /d c:\xampp\htdocs\toko-bangunan\frontend
start "TOKO-BANGUNAN: Frontend (Port 3000)" cmd /k npm start

timeout /t 5 /nobreak

echo 🌐 Membuka browser...
start http://localhost:3000

echo.
echo ✅ Server siap!
echo.
echo 💡 Login dengan:
echo   📧 Email: admin@toko.com
echo   🔑 Password: password123
echo.
echo 🛑 Untuk berhenti: tutup kedua terminal atau Ctrl+C
echo.
pause
exit /b 0

:RESET_ADMIN
cls
echo.
echo 🔐 Reset Admin User...
echo.
cd /d c:\xampp\htdocs\toko-bangunan\backend
call npm run reset

echo.
pause
goto MENU

:BACKEND_ONLY
cls
echo.
echo 🔧 Menjalankan Backend Server...
echo.
cd /d c:\xampp\htdocs\toko-bangunan\backend
call npm run dev

:FRONTEND_ONLY
cls
echo.
echo 💻 Menjalankan Frontend Server...
echo.
cd /d c:\xampp\htdocs\toko-bangunan\frontend
call npm start

:INFO
cls
echo.
echo ╔══════════════════════════════════════════════════════════════════╗
echo ║                    📋 INFORMASI SISTEM                           ║
echo ╚══════════════════════════════════════════════════════════════════╝
echo.
echo 🏢 PROJECT: Toko Bangunan Management System
echo 📍 LOCATION: c:\xampp\htdocs\toko-bangunan
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 🔑 LOGIN CREDENTIALS
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo   📧 Email    : admin@toko.com
echo   🔑 Password : password123
echo   👑 Role     : Admin
echo   ✨ Status   : Active
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 🚀 SERVER PORTS
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo   Backend  : http://localhost:5000
echo   Frontend : http://localhost:3000
echo   API Test : http://localhost:5000/api/test
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 📦 TECH STACK
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo   Backend  : Node.js + Express + Sequelize + MySQL
echo   Frontend : React 18 + React Scripts
echo   Database : MySQL (via XAMPP)
echo   Auth     : JWT + bcrypt
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 🔗 DATABASE
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo   Host     : localhost
echo   Port     : 3306
echo   Database : toko_bangunan
echo   User     : root
echo   Password : (empty)
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 📚 DOKUMENTASI
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo   Backend Log      : Terminal Backend
echo   Frontend Log     : Terminal Frontend
echo   Browser Console  : F12 di browser
echo   Database Manager : http://localhost/phpmyadmin
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
pause
goto MENU

:EXIT_SCRIPT
cls
echo.
echo 👋 Terima kasih telah menggunakan Toko Bangunan!
echo.
pause
exit /b 0
