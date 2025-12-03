@echo off
REM ============================
REM Start Script for Production (Universal)
REM ============================

echo ===========================================
echo Starting the application in PRODUCTION mode
echo ===========================================

REM Ruta absoluta del proyecto (ajústala si cambias de carpeta)
SET PROJECT_DIR=%~dp0
REM Quita la barra final si existe
SET PROJECT_DIR=%PROJECT_DIR:~0,-1%

REM Crear carpeta data si no existe
IF NOT EXIST "%PROJECT_DIR%\data" (
    mkdir "%PROJECT_DIR%\data"
    echo Carpeta data creada.
)

REM Copiar dev.db a data\db.sqlite si no existe
IF NOT EXIST "%PROJECT_DIR%\data\db.sqlite" (
    copy "%PROJECT_DIR%\prisma\dev.db" "%PROJECT_DIR%\data\db.sqlite"
    echo Base de datos copiada a data\db.sqlite
)

REM Detectar IP local automáticamente
FOR /F "tokens=2 delims=:" %%A IN ('ipconfig ^| findstr /R "IPv4" ^| findstr /V "127.0.0.1"') DO SET LOCAL_IP=%%A
SETLOCAL ENABLEDELAYEDEXPANSION
SET LOCAL_IP=!LOCAL_IP: =!

echo IP detectada: !LOCAL_IP!

REM Crear .env con ruta absoluta y JWT_SECRET
(
echo NODE_ENV=production
echo PORT=3000
echo DATABASE_URL=file:%PROJECT_DIR%/data/db.sqlite
echo JWT_SECRET=tu_clave_secreta_prod
echo NEXT_PUBLIC_URL=http://!LOCAL_IP!:3000
) > "%PROJECT_DIR%\.env"

echo Variables de entorno configuradas correctamente.

REM Ir al directorio del proyecto
cd /d "%PROJECT_DIR%"

REM Iniciar la aplicación
echo Ejecutando npm start...
npm run start

pause
