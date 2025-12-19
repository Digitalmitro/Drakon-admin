#!/bin/bash

# Script to replace hardcoded API URLs with environment variable

cd /Users/avik/Desktop/dracon/drakon-admin/src

# Find all JS/JSX files with hardcoded URLs
files=$(grep -rl "https://api\.drakon-sports\.com\|http://localhost:3500" views/ components/ 2>/dev/null | grep -E "\.(js|jsx)$")

for file in $files; do
  # Check if file already imports API_BASE_URL
  if ! grep -q "API_BASE_URL" "$file"; then
    echo "Processing: $file"
    
    # Determine the correct import path based on file location
    depth=$(echo "$file" | tr -cd '/' | wc -c)
    import_path=""
    
    if [ $depth -eq 1 ]; then
      import_path="../config/api"
    elif [ $depth -eq 2 ]; then
      import_path="../../config/api"
    elif [ $depth -eq 3 ]; then
      import_path="../../../config/api"
    elif [ $depth -eq 4 ]; then
      import_path="../../../../config/api"
    else
      import_path="../../config/api"
    fi
    
    # Add import after the last import statement
    sed -i '' '/^import/a\
import API_BASE_URL from '"'$import_path'"';
' "$file"
    
  fi
  
  # Replace hardcoded URLs
  sed -i '' 's|https://api\.drakon-sports\.com|${API_BASE_URL}|g' "$file"
  sed -i '' 's|http://localhost:3500|${API_BASE_URL}|g' "$file"
  
done

echo "Done! Updated $(echo "$files" | wc -l) files"
