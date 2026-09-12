@echo off
cd /d E:\NodeJS_Projects\fidar
start "" /b cmd /c "npx next dev --hostname 127.0.0.1 --port 4100 > dev.log 2>&1"
ping -n 16 127.0.0.1 >nul
curl -s -o fa-about.html -w "FA_HTTP:%{http_code} TIME:%{time_total}\n" http://127.0.0.1:4100/fa/about > curl-fa.txt
curl -s -o en-about.html -w "EN_HTTP:%{http_code} TIME:%{time_total}\n" http://127.0.0.1:4100/en/about > curl-en.txt
for /f "tokens=5" %%p in ('netstat -ano ^| findstr ":4100" ^| findstr "LISTENING"') do taskkill /PID %%p /F >nul 2>&1
type curl-fa.txt
type curl-en.txt
echo CURL_DONE