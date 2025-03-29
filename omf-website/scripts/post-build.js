/**
 * Post-build script to organize files after Next.js build
 * This script moves SVG files from the root output directory to the svg subdirectory
 */

const fs = require('fs');
const path = require('path');

// Configuration
const svgFiles = ['window.svg', 'vercel.svg', 'next.svg', 'globe.svg', 'file.svg'];
const outDir = path.join(__dirname, '../out');
const svgDir = path.join(outDir, 'svg');

// Ensure svg directory exists
if (!fs.existsSync(svgDir)) {
  fs.mkdirSync(svgDir, { recursive: true });
  console.log('Created svg directory');
}

// Move SVG files
svgFiles.forEach(file => {
  const sourcePath = path.join(outDir, file);
  const destPath = path.join(svgDir, file);
  
  if (fs.existsSync(sourcePath)) {
    try {
      fs.renameSync(sourcePath, destPath);
      console.log(`✅ Moved ${file} to svg directory`);
    } catch (error) {
      console.error(`❌ Error moving ${file}: ${error.message}`);
      
      // Try copy and delete as fallback
      try {
        fs.copyFileSync(sourcePath, destPath);
        fs.unlinkSync(sourcePath);
        console.log(`✅ Copied and deleted ${file} to svg directory`);
      } catch (copyError) {
        console.error(`❌ Failed fallback for ${file}: ${copyError.message}`);
      }
    }
  } else {
    console.log(`⚠️ ${file} not found in output directory`);
  }
});

console.log('Post-build file organization completed'); 