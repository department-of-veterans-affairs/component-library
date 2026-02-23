const fs = require('fs');
const path = require('path');

const reactBindingsDir = path.join(__dirname, '..', 'react-bindings');

// Find all files matching components.*
const files = fs.readdirSync(reactBindingsDir).filter(file => file.startsWith('components.'));

files.forEach(file => {
  // Handle multi-part extensions specially
  let ext;
  if (file.endsWith('.d.ts')) {
    ext = '.d.ts';
  } else if (file.endsWith('.js.map')) {
    ext = '.js.map';
  } else {
    ext = path.extname(file);
  }
  
  const sourcePath = path.join(reactBindingsDir, file);
  const destPath = path.join(reactBindingsDir, `index${ext}`);
  
  fs.copyFileSync(sourcePath, destPath);
  console.log(`Copied ${file} → index${ext}`);
});

console.log(`✓ Copied ${files.length} file(s)`);
