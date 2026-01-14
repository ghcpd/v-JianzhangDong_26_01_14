@echo off
REM ============================================================
REM Task Management Dashboard - Startup Script
REM ============================================================
REM This script starts the Task Management Dashboard application
REM on Windows with a single click. It automatically:
REM   1. Checks for Node.js installation
REM   2. Installs project dependencies if needed
REM   3. Starts the development server
REM   4. Opens the application in the default browser
REM ============================================================

TITLE Task Management Dashboard

echo.
echo ============================================================
echo   Task Management Dashboard - Startup Script
echo ============================================================
echo.

REM Check if Node.js is installed
echo [1/4] Checking Node.js installation...
node --version >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Node.js is not installed or not in PATH.
    echo Please install Node.js from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

FOR /F "tokens=*" %%a IN ('node --version') DO SET NODE_VERSION=%%a
echo       Node.js version: %NODE_VERSION%
echo       [OK] Node.js is installed
echo.

REM Check if npm is available
echo [2/4] Checking npm installation...
npm --version >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: npm is not available.
    echo Please reinstall Node.js from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

FOR /F "tokens=*" %%a IN ('npm --version') DO SET NPM_VERSION=%%a
echo       npm version: %NPM_VERSION%
echo       [OK] npm is installed
echo.

REM Check if node_modules exists, if not install dependencies
echo [3/4] Checking project dependencies...
IF NOT EXIST "node_modules" (
    echo       Dependencies not found. Installing...
    echo.
    npm install
    IF %ERRORLEVEL% NEQ 0 (
        echo.
        echo ERROR: Failed to install dependencies.
        echo Please check your internet connection and try again.
        echo.
        pause
        exit /b 1
    )
    echo.
    echo       [OK] Dependencies installed successfully
) ELSE (
    echo       [OK] Dependencies already installed
)
echo.

REM Create logs directory if it doesn't exist
IF NOT EXIST "logs" (
    echo       Creating logs directory...
    mkdir logs
)

REM Start the development server
echo [4/4] Starting development server...
echo.
echo ============================================================
echo   The application will open in your default browser shortly.
echo   Server URL: http://localhost:3000
echo.
echo   Press Ctrl+C to stop the server.
echo ============================================================
echo.

REM Start the React development server
REM The BROWSER=true flag ensures the browser opens automatically
SET BROWSER=true
npm start
