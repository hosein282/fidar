Get-CimInstance Win32_Process -Filter "Name='node.exe'" | ForEach-Object {
  "PID=$($_.ProcessId) | $($_.CommandLine)"
}