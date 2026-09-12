@echo off
cd /d E:\NodeJS_Projects\fidar
call npx next build > E:\NodeJS_Projects\fidar\build.log 2>&1
echo DONE_%ERRORLEVEL% >> E:\NodeJS_Projects\fidar\build.log