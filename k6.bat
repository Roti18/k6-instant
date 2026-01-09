@echo off
set TEST_FILE=%1
set TARGET_URL=%2
set PATHS=%3
set TARGET_API_KEY=%4

if "%TEST_FILE%"=="clean" (
    echo Cleaning reports folder...
    if exist "reports" (
        del /q reports\*
        echo [DONE] Reports cleaned.
    ) else (
        echo [INFO] Reports folder not found.
    )
    exit /b 0
)

if "%TEST_FILE%"=="" (
    echo Usage: k6 [test_name] [url] [paths] [api_key]
    echo Example: k6 smoke http://localhost:3000 tracks,albums secret123
    exit /b 1
)

if "%PATHS%"=="" set PATHS=/

if not exist "reports" mkdir reports
if exist "reports\logs.json" del /q reports\logs.json

if exist "tests\%TEST_FILE%.test.js" (
    set FINAL_PATH=tests\%TEST_FILE%.test.js
) else if exist "%TEST_FILE%" (
    set FINAL_PATH=%TEST_FILE%
) else (
    echo Error: Test "%TEST_FILE%" not found.
    exit /b 1
)

set K6_CMD=k6.exe run %FINAL_PATH%

if not "%TARGET_URL%"=="" (
    set K6_CMD=%K6_CMD% -e BASE_URL=%TARGET_URL%
)

set K6_CMD=%K6_CMD% -e PATHS=%PATHS%

if not "%TARGET_API_KEY%"=="" (
    set K6_CMD=%K6_CMD% -e API_KEY=%TARGET_API_KEY%
)

set K6_CMD=%K6_CMD% --summary-export=reports\summary.json --log-output=file=reports\logs.json --log-format=json

echo Running: %K6_CMD%
%K6_CMD%

if exist "reports\logs.json" (
    powershell -Command "$c = Get-Content reports\logs.json; if($c) { '[' + ($c -join ',') + ']' | Set-Content reports\logs.json } else { '[]' | Set-Content reports\logs.json }"
)

echo.
if exist "reports\summary.html" (
    echo [SUCCESS] Visual report ready: reports\summary.html
)
echo [DONE] Paths tested: %PATHS%
