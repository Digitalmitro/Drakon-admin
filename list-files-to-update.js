// Script to list all files that need API_BASE_URL updates
const fs = require('fs');
const path = require('path');

const srcDir = '/Users/avik/Desktop/dracon/drakon-admin/src';
const filesToUpdate = [];

function searchFiles(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.')) {
      searchFiles(filePath);
    } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Check if file has hardcoded URLs but no API_BASE_URL
      const hasHardcodedURL = content.includes('https://api.drakon-sports.com') || 
                              content.includes('http://localhost:3500');
      const hasAPIBaseURL = content.includes('API_BASE_URL');
      
      if (hasHardcodedURL && !hasAPIBaseURL) {
        filesToUpdate.push(filePath);
      }
    }
  });
}

searchFiles(srcDir);

console.log('Files needing update:');
filesToUpdate.forEach((file, index) => {
  console.log(`${index + 1}. ${file.replace(srcDir + '/', '')}`);
});
console.log(`\nTotal: ${filesToUpdate.length} files`);
