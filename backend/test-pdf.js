const fs = require('fs');

async function testPdf() {
  try {
    console.log('Creating CV...');
    const cvData = {
      nome: 'Teste PDF',
      email: 'teste@pdf.com',
      telefone: '123456789',
      cidade_estado: 'SP',
      objetivo: 'Testar PDF'
    };
    
    const res = await fetch('http://localhost:3001/api/curriculos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cvData)
    });
    const data = await res.json();
    const id = data.id;
    console.log('CV created with ID:', id);
    
    console.log('Requesting PDF for ID:', id);
    const pdfRes = await fetch(`http://localhost:3001/api/curriculos/${id}/pdf`, {
      method: 'POST'
    });
    
    if (!pdfRes.ok) {
      const errData = await pdfRes.json();
      throw new Error(JSON.stringify(errData));
    }
    
    const arrayBuffer = await pdfRes.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    fs.writeFileSync(`test_${id}.pdf`, buffer);
    console.log('PDF saved successfully!');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testPdf();
