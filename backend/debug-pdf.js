const { Curriculo } = require('./src/models/Curriculo');
const puppeteer = require('puppeteer');
const fs = require('fs');

async function debugPdf() {
  const cv = await Curriculo.findOne({ where: { nome: 'SHAKIRA' } });
  if (!cv) {
    console.log('CV da SHAKIRA não encontrado');
    return;
  }
  
  if (!cv.foto_url) {
    console.log('CV da SHAKIRA não tem foto salva no banco de dados!');
    return;
  }

  const htmlContent = `
    <html>
      <head>
        <style>
          body { font-family: 'Helvetica', sans-serif; padding: 40px; color: #333; line-height: 1.6; }
          h1 { color: #003da5; margin-bottom: 5px; }
          .header { display: flex; align-items: center; gap: 20px; border-bottom: 2px solid #003da5; padding-bottom: 20px; margin-bottom: 20px; }
          .header-photo { width: 80px; height: 80px; border-radius: 40px; object-fit: cover; }
          .header-info { flex: 1; }
        </style>
      </head>
      <body>
        <div class="header">
          ${cv.foto_url ? \`<img src="\${cv.foto_url}" class="header-photo" />\` : ''}
          <div class="header-info">
            <h1>${cv.nome}</h1>
          </div>
        </div>
      </body>
    </html>
  `;
  
  fs.writeFileSync('debug.html', htmlContent);
  console.log('HTML salvo em debug.html');
  
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
  const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
  await browser.close();
  
  fs.writeFileSync('debug.pdf', pdfBuffer);
  console.log('PDF salvo em debug.pdf');
}

debugPdf();
