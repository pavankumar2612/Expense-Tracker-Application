$path = "C:\Users\pavan kumar reddy\OneDrive\Desktop\Expensetrackerrr\ExpenceTrackerBackend"
Get-ChildItem -Path $path -Recurse -Include "*.java" | Where-Object { $_.DirectoryName -match "dto|model" } | ForEach-Object {
    "FILE: $($_.Name)"
    Get-Content $_.FullName
    "--------------------------------------------------"
} | Out-File -FilePath "backend_models_dtos.txt" -Encoding UTF8
