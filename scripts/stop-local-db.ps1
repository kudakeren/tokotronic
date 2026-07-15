$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$pgBin = "C:\Program Files\PostgreSQL\15\bin"
$dataDir = Join-Path $root ".local-postgres\data"

if (Test-Path $dataDir) {
  & "$pgBin\pg_ctl.exe" -D $dataDir stop
}
