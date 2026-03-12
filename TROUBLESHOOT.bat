@echo off
REM ============================================================================
REM  TOKO BANGUNAN - TROUBLESHOOTING & DIAGNOSTICS SCRIPT
REM ============================================================================
chcp 65001 >nul
color 0E
cls

echo.
echo ╔════════════════════════════════════════════════════════════════════╗
echo ║                                                                    ║
echo ║          🔧 TOKO BANGUNAN - TROUBLESHOOTING & DIAGNOSTICS        ║
echo ║                                                                    ║
echo ╚════════════════════════════════════════════════════════════════════╝
echo.

:DIAG_MENU
cls
echo.
echo 📋 DIAGNOSTICS MENU
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo  1. ✅ Cek semua kebutuhan sistem
echo  2. 🌐 Test koneksi database
echo  3. 🧹 Clean install (hapus node_modules, install ulang)
echo  4. 🔐 Reset admin password
echo  5. 🚀 Kill all node processes
echo  6. 📊 Lihat daftar user di database
echo  7. 🔙 Kembali ke menu utama
echo.
set /p choice="Pilih opsi (1-7): "

if "%choice%"=="1" goto CHECK_SYSTEM
if "%choice%"=="2" goto TEST_DB
if "%choice%"=="3" goto CLEAN_INSTALL
if "%choice%"=="4" goto RESET_ADMIN
if "%choice%"=="5" goto KILL_NODE
if "%choice%"=="6" goto LIST_USERS
if "%choice%"=="7" exit /b 0
goto DIAG_MENU

:CHECK_SYSTEM
cls
echo.
echo ✅ CHECKING SYSTEM REQUIREMENTS...
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo [1/4] Checking Node.js
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
node --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Node.js installed: 
    node --version
) else (
    echo ❌ Node.js NOT found
)
echo.

echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo [2/4] Checking npm
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
npm --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ npm installed: 
    npm --version
) else (
    echo ❌ npm NOT found
)
echo.

echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo [3/4] Checking project directories
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
if exist "c:\xampp\htdocs\toko-bangunan\backend" (
    echo ✅ Backend folder exists
) else (
    echo ❌ Backend folder NOT found
)
if exist "c:\xampp\htdocs\toko-bangunan\frontend" (
    echo ✅ Frontend folder exists
) else (
    echo ❌ Frontend folder NOT found
)
echo.

echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo [4/4] Checking dependencies
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
if exist "c:\xampp\htdocs\toko-bangunan\backend\node_modules" (
    echo ✅ Backend node_modules installed
) else (
    echo ⚠️  Backend node_modules NOT found (run: npm install)
)
if exist "c:\xampp\htdocs\toko-bangunan\frontend\node_modules" (
    echo ✅ Frontend node_modules installed
) else (
    echo ⚠️  Frontend node_modules NOT found (run: npm install)
)
echo.

echo ✨ System check complete!
echo.
pause
goto DIAG_MENU

:TEST_DB
cls
echo.
echo 🗄️  DATABASE CONNECTION TEST
echo.
echo ⚠️  PERHATIAN: Pastikan MySQL XAMPP sudah berjalan!
echo.
echo Checking MySQL on localhost:3306...
echo.
timeout /t 2 /nobreak

cd /d c:\xampp\htdocs\toko-bangunan\backend
node -e "const db = require('./models'); db.sequelize.authenticate().then(() => { console.log('✅ Database connection OK'); process.exit(0); }).catch(err => { console.log('❌ Connection failed: ' + err.message); process.exit(1); });"

if %errorlevel% equ 0 (
    echo.
    echo ✅ MySQL is running and database can be accessed
) else (
    echo.
    echo ❌ Database connection failed
    echo.
    echo 💡 Solusi:
    echo    1. Buka XAMPP Control Panel
    echo    2. Klik "Start" pada MySQL
    echo    3. Pastikan username "root" dan password kosong
    echo    4. Cek file .env di backend folder
)
echo.
pause
goto DIAG_MENU

:CLEAN_INSTALL
cls
echo.
echo 🧹 CLEAN INSTALL (Ini akan menghapus dan install ulang)
echo.
echo ⚠️  WARNING: Ini akan menghapus node_modules dan install ulang.
echo Ini akan memakan waktu 2-5 menit.
echo.
pause

echo.
echo [1/3] Menghapus backend node_modules...
cd /d c:\xampp\htdocs\toko-bangunan\backend
if exist node_modules rmdir /s /q node_modules >nul 2>&1
if exist package-lock.json del package-lock.json >nul 2>&1
echo ✅ Done

echo.
echo [2/3] Menghapus frontend node_modules...
cd /d c:\xampp\htdocs\toko-bangunan\frontend
if exist node_modules rmdir /s /q node_modules >nul 2>&1
if exist package-lock.json del package-lock.json >nul 2>&1
echo ✅ Done

echo.
echo [3/3] Installing dependencies (ini akan memakan waktu)...
echo.
echo   Installing backend packages...
cd /d c:\xampp\htdocs\toko-bangunan\backend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Backend install failed
    pause
    goto CLEAN_INSTALL
)
echo.

echo   Installing frontend packages...
cd /d c:\xampp\htdocs\toko-bangunan\frontend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Frontend install failed
    pause
    goto CLEAN_INSTALL
)
echo.

echo ✅ Clean install complete!
echo.
pause
goto DIAG_MENU

:RESET_ADMIN
cls
echo.
echo 🔐 RESET ADMIN USER
echo.
cd /d c:\xampp\htdocs\toko-bangunan\backend
call npm run reset
echo.
pause
goto DIAG_MENU

:KILL_NODE
cls
echo.
echo 🔪 KILLING ALL NODE PROCESSES
echo.
tasklist | find /i "node.exe" >nul 2>&1
if %errorlevel% equ 0 (
    echo Found running Node processes, stopping...
    taskkill /im node.exe /f >nul 2>&1
    echo ✅ All node processes killed
) else (
    echo ℹ️  No node processes running
)
echo.
pause
goto DIAG_MENU

:LIST_USERS
cls
echo.
echo 📊 USER DATABASE
echo.
echo Connecting to database...
echo.
cd /d c:\xampp\htdocs\toko-bangunan\backend
node -e "const db = require('./models'); db.sequelize.authenticate().then(async () => { const users = await db.User.findAll({raw: true}); if (users.length === 0) { console.log('ℹ️  No users in database. Run: npm run reset'); } else { console.log('Users in database:'); console.log(''); users.forEach((u, i) => { console.log((i+1) + '. Email: ' + u.email + ' | Role: ' + u.role + ' | Active: ' + u.isActive); }); } process.exit(0); }).catch(err => { console.log('❌ Error: ' + err.message); process.exit(1); });"

echo.
pause
goto DIAG_MENU

goto DIAG_MENU
