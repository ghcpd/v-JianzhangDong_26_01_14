@echo off
REM ============================================================
REM Task Management Dashboard - Test Runner Script
REM ============================================================
REM This script runs the automated test suite and saves results
REM to the logs/test_run.log file.
REM ============================================================

TITLE Task Management Dashboard - Test Runner

echo.
echo ============================================================
echo   Task Management Dashboard - Automated Test Runner
echo ============================================================
echo.

REM Check if Node.js is installed
echo [1/3] Checking Node.js installation...
node --version >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Node.js is not installed or not in PATH.
    echo Please install Node.js from https://nodejs.org/
    echo.
    pause
    exit /b 1
)
echo       [OK] Node.js is installed
echo.

REM Check if dependencies are installed
echo [2/3] Checking project dependencies...
IF NOT EXIST "node_modules" (
    echo       Dependencies not found. Installing...
    npm install
    IF %ERRORLEVEL% NEQ 0 (
        echo.
        echo ERROR: Failed to install dependencies.
        echo.
        pause
        exit /b 1
    )
)
echo       [OK] Dependencies are installed
echo.

REM Create logs directory if it doesn't exist
IF NOT EXIST "logs" (
    echo       Creating logs directory...
    mkdir logs
)

REM Run the tests
echo [3/3] Running automated tests...
echo.
echo ============================================================
echo   Test output will be saved to: logs\test_run.log
echo ============================================================
echo.

REM Run tests and capture output to log file
echo ================================================================ > logs\test_run.log
echo   TASK MANAGEMENT DASHBOARD - AUTOMATED TEST RUN LOG >> logs\test_run.log
echo   Date: %DATE% %TIME% >> logs\test_run.log
echo ================================================================ >> logs\test_run.log
echo. >> logs\test_run.log

npm test -- --testPathPattern=test/auto_test.js --verbose --no-coverage 2>&1 | tee logs\test_run.log

REM Check if tee command exists, if not use alternative
IF %ERRORLEVEL% NEQ 0 (
    npm test -- --testPathPattern=test/auto_test.js --verbose --no-coverage > logs\test_run.log 2>&1
)

echo.
echo ============================================================
echo   Tests completed! Results saved to logs\test_run.log
echo ============================================================
echo.

REM Display summary from log
echo Test Summary:
type logs\test_run.log | findstr /C:"Tests:" /C:"PASS" /C:"FAIL" /C:"Test Suites:"

echo.
pause
