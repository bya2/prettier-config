param (
  [string]$ConfigFile
)

$PSClearScript = Join-Path $PSScriptRoot "\Clear-Dist.ps1"

if (-not (Test-Path -Path $PSClearScript -PathType Leaf) -or -not (Test-Path -Path $ConfigFile -PathType Leaf)) {
  exit 1
}

& $PSClearScript

Start-Process "rollup" -ArgumentList "-c", $ConfigFile -Wait