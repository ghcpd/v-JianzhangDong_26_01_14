@echo off
echo ========================================
echo Task Management Dashboard - Startup
echo ========================================
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo [1/3] Installing dependencies...
    echo This may take a few minutes on first run.
    call npm install
    if errorlevel 1 (
        echo.
        echo ERROR: Failed to install dependencies.
        echo Please make sure Node.js and npm are installed.
        echo.
        pause
        exit /b 1
    )
    echo.
    echo Dependencies installed successfully!
    echo.
) else (
    echo [1/3] Dependencies already installed. Skipping...
    echo.
)

echo [2/3] Starting development server...
echo The application will open automatically in your default browser.
echo.
echo NOTE: Keep this window open while using the application.
echo Press Ctrl+C to stop the server when done.
echo.

REM Start the webpack dev server
echo [3/3] Launching application...
call npm start

REM If npm start fails
if errorlevel 1 (
    echo.
    echo ERROR: Failed to start the application.
    echo.
    pause
)
