$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$pgBin = "C:\Program Files\PostgreSQL\15\bin"
$dataDir = Join-Path $root ".local-postgres\data"
$logFile = Join-Path $root ".local-postgres\postgres.log"
$dbName = "tokotronicindo"

if (-not (Test-Path $dataDir)) {
  New-Item -ItemType Directory -Force -Path (Split-Path -Parent $dataDir) | Out-Null
  & "$pgBin\initdb.exe" -D $dataDir -U voucherppob --auth=trust --encoding=UTF8
}

& "$pgBin\pg_ctl.exe" -D $dataDir status *> $null
if ($LASTEXITCODE -ne 0) {
  & "$pgBin\pg_ctl.exe" -D $dataDir -l $logFile -o '"-p" "55433" "-h" "127.0.0.1"' start
}

$exists = & "$pgBin\psql.exe" -h 127.0.0.1 -p 55433 -U voucherppob -d postgres -tAc "select 1 from pg_database where datname='$dbName'"
if (($exists -as [string]).Trim() -ne "1") {
  & "$pgBin\createdb.exe" -h 127.0.0.1 -p 55433 -U voucherppob $dbName
}

Write-Host "$dbName PostgreSQL berjalan di 127.0.0.1:55433"
