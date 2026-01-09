$path = "C:\Users\pavan kumar reddy\OneDrive\Desktop\Expensetrackerrr\ExpenceTrackerBackend"
Get-ChildItem -Path $path -Recurse -Filter "*Controller.java" | ForEach-Object {
    "FILE: $($_.Name)"
    Get-Content $_.FullName
    "--------------------------------------------------"
} | Out-File -FilePath "backend_controllers.txt" -Encoding UTF8
