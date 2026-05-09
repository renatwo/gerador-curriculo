const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const componentsDir = path.join(srcDir, 'components');
const pagesDir = path.join(srcDir, 'pages');

const filesToProcess = [];

function findJsxFiles(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      findJsxFiles(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      filesToProcess.push(fullPath);
    }
  }
}

findJsxFiles(componentsDir);
findJsxFiles(pagesDir);

let combinedCSS = '';

for (const filePath of filesToProcess) {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Extrair o CSS da tag <style jsx>{` ... `}</style>
  const styleRegex = /<style jsx>\{`([\s\S]*?)`\}<\/style>/g;
  let match;
  
  while ((match = styleRegex.exec(content)) !== null) {
    combinedCSS += `\n/* From ${path.basename(filePath)} */\n` + match[1];
  }
  
  // Remover a tag <style jsx>
  content = content.replace(/<style jsx>\{`[\s\S]*?`\}<\/style>/g, '');
  
  // Corrigir erro específico do Dashboard.jsx
  if (filePath.endsWith('Dashboard.jsx')) {
    content = content.replace('</div>\n          </div>\n\n          {/* Coluna do Preview */}', '</div>\n\n          {/* Coluna do Preview */}');
  }

  fs.writeFileSync(filePath, content, 'utf-8');
}

// Salvar CSS combinado
const cssPath = path.join(srcDir, 'styles', 'components.css');
fs.writeFileSync(cssPath, combinedCSS, 'utf-8');

console.log('Done! Extracted CSS and fixed files.');
