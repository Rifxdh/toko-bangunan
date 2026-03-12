@echo off
chcp 65001 >nul
color 0A
setlocal enabledelayedexpansion

echo.
echo ╔════════════════════════════════════════════════════════════════════╗
echo ║                                                                    ║
echo ║              🏢 TOKO BANGUNAN - SETUP & RUN SCRIPT                ║
echo ║                                                                    ║
echo ╚════════════════════════════════════════════════════════════════════╝
echo.

REM Check if Node.js is installed
echo [1/4] 🔍 Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
echo ✅ Node.js found: 
node --version
echo.

REM Install Backend Dependencies
echo [2/4] 📦 Installing Backend Dependencies...
cd /d c:\xampp\htdocs\toko-bangunan\backend
if exist node_modules (
    echo ✅ Backend dependencies already installed
) else (
    echo ⏳ Installing npm packages for backend...
    call npm install
    if %errorlevel% neq 0 (
        echo ❌ Failed to install backend dependencies
        pause
        exit /b 1
    )
    echo ✅ Backend dependencies installed successfully
)
echo.

REM Install Frontend Dependencies
echo [3/4] 📦 Installing Frontend Dependencies...
cd /d c:\xampp\htdocs\toko-bangunan\frontend
if exist node_modules (
    echo ✅ Frontend dependencies already installed
) else (
    echo ⏳ Installing npm packages for frontend...
    call npm install
    if %errorlevel% neq 0 (
        echo ❌ Failed to install frontend dependencies
        pause
        exit /b 1
    )
    echo ✅ Frontend dependencies installed successfully
)
echo.

REM Database Setup Info
echo [4/4] 🗄️  Database Setup Information:
echo.
echo Make sure XAMPP MySQL is running:
echo   1. Open XAMPP Control Panel
echo   2. Click "Start" next to MySQL
echo.
echo Database will auto-create on first run.
echo Admin credentials:
echo   📧 Email: admin@toko.com
echo   🔑 Password: password123
echo.

REM Display startup instructions
echo.
echo ╔════════════════════════════════════════════════════════════════════╗
echo ║                    🚀 READY TO START SERVERS                       ║
echo ╚════════════════════════════════════════════════════════════════════╝
echo.
echo Open TWO separate terminals and run:
echo.
echo Terminal 1 (BACKEND):
echo   cd c:\xampp\htdocs\toko-bangunan\backend
echo   npm run dev
echo.
echo Terminal 2 (FRONTEND):
echo   cd c:\xampp\htdocs\toko-bangunan\frontend
echo   npm start
echo.
echo Then open: http://localhost:3000
echo.
echo Press any key to continue...
pause >nul

REM Option to start servers automatically
cls
echo.
echo Would you like to start the servers now?
echo 1. Yes (automatic)
echo 2. No (manual)
echo.
set /p choice="Enter your choice (1 or 2): "

if "%choice%"=="1" (
    echo.
    echo 🚀 Starting servers...
    echo.
    
    REM Start Backend in background
    echo [1/2] Starting Backend Server on port 5000...
    cd /d c:\xampp\htdocs\toko-bangunan\backend
    start "Toko Bangunan - Backend" cmd /k npm run dev
    timeout /t 3 /nobreak
    
    REM Start Frontend in background
    echo [2/2] Starting Frontend Server on port 3000...
    cd /d c:\xampp\htdocs\toko-bangunan\frontend
    start "Toko Bangunan - Frontend" cmd /k npm start
    
    echo.
    echo ✅ Both servers started in new windows!
    echo ⏳ Waiting for servers to initialize...
    timeout /t 5 /nobreak
    
    echo.
    echo 🌐 Opening browser at http://localhost:3000...
    timeout /t 2 /nobreak
    start http://localhost:3000
    
    echo.
    echo 💡 Tip: Keep both terminal windows open while developing
    echo 🛑 To stop: Close the terminal windows or press Ctrl+C
    
) else (
    echo.
    echo 📝 Manual startup instructions have been displayed above.
)

echo.
pause
