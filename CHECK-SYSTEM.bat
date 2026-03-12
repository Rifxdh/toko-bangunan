@echo off
REM ============================================================================
REM  SYSTEM READINESS CHECK
REM ============================================================================
chcp 65001 >nul
color 0B
cls

echo.
echo ╔════════════════════════════════════════════════════════════════════╗
echo ║                                                                    ║
echo ║            ✅ SYSTEM READINESS CHECK                             ║
echo ║                                                                    ║
echo ╚════════════════════════════════════════════════════════════════════╝
echo.

setlocal enabledelayedexpansion

set /a passed=0
set /a total=0

REM Check 1: Node.js
set /a total+=1
echo [CHECK 1/5] Node.js Installation
node --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Node.js: 
    node --version
    set /a passed+=1
) else (
    echo ❌ Node.js NOT installed
    echo   Fix: Download from https://nodejs.org/
)
echo.

REM Check 2: npm
set /a total+=1
echo [CHECK 2/5] npm Installation
npm --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ npm: 
    npm --version
    set /a passed+=1
) else (
    echo ❌ npm NOT installed
    echo   Fix: npm comes with Node.js
)
echo.

REM Check 3: Project Folders
set /a total+=1
echo [CHECK 3/5] Project Folders
if exist "c:\xampp\htdocs\toko-bangunan\backend" (
    if exist "c:\xampp\htdocs\toko-bangunan\frontend" (
        echo ✅ Backend folder exists
        echo ✅ Frontend folder exists
        set /a passed+=1
    ) else (
        echo ❌ Frontend folder NOT found
    )
) else (
    echo ❌ Backend folder NOT found
)
echo.

REM Check 4: Dependencies Installed
set /a total+=1
echo [CHECK 4/5] Dependencies Status
if exist "c:\xampp\htdocs\toko-bangunan\backend\node_modules" (
    echo ✅ Backend node_modules installed
    set /a backend_ok=1
) else (
    echo ⚠️  Backend node_modules NOT installed
    echo   Run: cd backend ^&^& npm install
    set /a backend_ok=0
)
if exist "c:\xampp\htdocs\toko-bangunan\frontend\node_modules" (
    echo ✅ Frontend node_modules installed
    set /a frontend_ok=1
) else (
    echo ⚠️  Frontend node_modules NOT installed
    echo   Run: cd frontend ^&^& npm install
    set /a frontend_ok=0
)
if !backend_ok! equ 1 if !frontend_ok! equ 1 set /a passed+=1
echo.

REM Check 5: Configuration Files
set /a total+=1
echo [CHECK 5/5] Configuration Files
if exist "c:\xampp\htdocs\toko-bangunan\backend\.env" (
    echo ✅ Backend .env exists
    set /a backend_env=1
) else (
    echo ❌ Backend .env NOT found
    set /a backend_env=0
)
if exist "c:\xampp\htdocs\toko-bangunan\frontend\.env" (
    echo ✅ Frontend .env exists
    set /a frontend_env=1
) else (
    echo ⚠️  Frontend .env NOT found (optional, may use .env.development)
    set /a frontend_env=1
)
if !backend_env! equ 1 if !frontend_env! equ 1 set /a passed+=1
echo.

REM Summary
echo ╔════════════════════════════════════════════════════════════════════╗
echo ║                         SUMMARY                                    ║
echo ╚════════════════════════════════════════════════════════════════════╝
echo.
echo Checks Passed: !passed! / !total!
echo.

if !passed! equ !total! (
    echo ✅ ALL CHECKS PASSED!
    echo.
    echo You're ready to run the application:
    echo.
    echo   Option 1: Double-click QUICK-START.bat
    echo   Option 2: Manual start
    echo      Terminal 1: cd backend ^&^& npm run dev
    echo      Terminal 2: cd frontend ^&^& npm start
    echo.
) else (
    echo ⚠️  Some checks failed. Please:
    echo.
    echo 1. Install missing dependencies
    echo 2. Run: QUICK-START.bat (it will install automatically)
    echo 3. If issues persist, run: TROUBLESHOOT.bat
    echo.
)

echo ℹ️  For detailed help, see: GETTING-STARTED.md
echo.
pause
