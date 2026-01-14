@echo off
cd /d %~dp0
setlocal

echo Starting Task Dashboard server on http://localhost:3000 ...
start "server" cmd /c "node server.js"
:: Give the server a brief moment to come online
ping 127.0.0.1 -n 3 >nul
start "browser" http://localhost:3000

echo Server started. Close this window to stop the server if it remains open.
endlocal
