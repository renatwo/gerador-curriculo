const { Curriculo, Formacao, Experiencia, Habilidade } = require('../models/Curriculo');
const puppeteer = require('puppeteer');

class CurriculoController {
  // Criar Currículo
  async store(req, res) {
    try {
      const { formacoes, experiencias, habilidades, ...dados } = req.body;
      
      const curriculo = await Curriculo.create(dados);

      if (formacoes) {
        await Promise.all(formacoes.map(f => curriculo.createFormacao(f)));
      }
      if (experiencias) {
        await Promise.all(experiencias.map(e => curriculo.createExperiencia(e)));
      }
      if (habilidades) {
        await Promise.all(habilidades.map(h => curriculo.createHabilidade(h)));
      }

      return res.status(201).json(curriculo);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  // Listar todos
  async index(req, res) {
    try {
      const curriculos = await Curriculo.findAll({
        include: [
          { association: 'formacoes' },
          { association: 'experiencias' },
          { association: 'habilidades' }
        ]
      });
      return res.json(curriculos);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Buscar por ID
  async show(req, res) {
    try {
      const curriculo = await Curriculo.findByPk(req.params.id, {
        include: ['formacoes', 'experiencias', 'habilidades']
      });
      if (!curriculo) return res.status(404).json({ error: 'Currículo não encontrado' });
      return res.json(curriculo);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Atualizar
  async update(req, res) {
    try {
      const { id } = req.params;
      const { formacoes, experiencias, habilidades, ...dados } = req.body;

      const curriculo = await Curriculo.findByPk(id);
      if (!curriculo) return res.status(404).json({ error: 'Currículo não encontrado' });

      await curriculo.update(dados);

      // Atualizar associações (removendo e recriando para simplificar)
      await Formacao.destroy({ where: { CurriculoId: id } });
      await Experiencia.destroy({ where: { CurriculoId: id } });
      await Habilidade.destroy({ where: { CurriculoId: id } });

      if (formacoes) await Promise.all(formacoes.map(f => curriculo.createFormacao(f)));
      if (experiencias) await Promise.all(experiencias.map(e => curriculo.createExperiencia(e)));
      if (habilidades) await Promise.all(habilidades.map(h => curriculo.createHabilidade(h)));

      return res.json(curriculo);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  // Deletar
  async delete(req, res) {
    try {
      const { id } = req.params;
      const curriculo = await Curriculo.findByPk(id);
      
      if (!curriculo) return res.status(404).json({ error: 'Currículo não encontrado' });

      // Remover dependências manualmente para garantir a limpeza no SQLite
      await Formacao.destroy({ where: { CurriculoId: id } });
      await Experiencia.destroy({ where: { CurriculoId: id } });
      await Habilidade.destroy({ where: { CurriculoId: id } });

      await curriculo.destroy();
      return res.json({ message: 'Currículo excluído com sucesso' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Gerar PDF
  async generatePdf(req, res) {
    try {
      const curriculo = await Curriculo.findByPk(req.params.id, {
        include: ['formacoes', 'experiencias', 'habilidades']
      });
      if (!curriculo) return res.status(404).json({ error: 'Currículo não encontrado' });

      console.log('--- GERANDO PDF ---');
      console.log('ID:', curriculo.id);
      console.log('Tem foto?', !!curriculo.foto_url);
      if (curriculo.foto_url) {
        console.log('Tamanho da foto (chars):', curriculo.foto_url.length);
        console.log('Início do base64:', curriculo.foto_url.substring(0, 50));
      }

      // HTML básico para o PDF (Template Simples)
      const htmlContent = `
        <html>
          <head>
            <style>
              body { font-family: 'Helvetica', sans-serif; padding: 40px; color: #333; line-height: 1.6; }
              h1 { color: #003da5; margin-bottom: 5px; }
              .header { display: flex; align-items: center; gap: 20px; border-bottom: 2px solid #003da5; padding-bottom: 20px; margin-bottom: 20px; }
              .header-photo { width: 80px; height: 80px; border-radius: 40px; object-fit: cover; }
              .header-info { flex: 1; }
              .section-title { font-size: 18px; font-weight: bold; color: #003da5; margin-top: 20px; border-bottom: 1px solid #ddd; }
              .item { margin-bottom: 10px; }
              .item-title { font-weight: bold; }
              .skill-tag { display: inline-block; background: #f0f0f0; padding: 5px 10px; margin: 5px; border-radius: 4px; }
            </style>
          </head>
          <body>
            <div class="header">
              ${curriculo.foto_url ? `<img src="${curriculo.foto_url}" class="header-photo" />` : ''}
              <div class="header-info">
                <h1>${curriculo.nome}</h1>
                <p>${curriculo.email} | ${curriculo.telefone}</p>
                <p>${curriculo.cidade_estado} | ${curriculo.linkedin || ''}</p>
              </div>
            </div>
            
            <div class="section-title">Objetivo Profissional</div>
            <p>${curriculo.objetivo}</p>

            <div class="section-title">Formação Acadêmica</div>
            ${curriculo.formacoes.map(f => `
              <div class="item">
                <div class="item-title">${f.curso} - ${f.instituicao}</div>
                <div>${f.ano_inicio} - ${f.ano_termino}</div>
              </div>
            `).join('')}

            <div class="section-title">Experiência Profissional</div>
            ${curriculo.experiencias.map(e => `
              <div class="item">
                <div class="item-title">${e.cargo} na ${e.empresa}</div>
                <div>${e.periodo_inicio} - ${e.periodo_fim}</div>
                <p>${e.descricao}</p>
              </div>
            `).join('')}

            <div class="section-title">Habilidades</div>
            <div>
              ${curriculo.habilidades.map(h => `<span class="skill-tag">${h.nome}</span>`).join('')}
            </div>
          </body>
        </html>
      `;

      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
      const pdfBuffer = await page.pdf({ 
        format: 'A4', 
        margin: { top: '20px', bottom: '20px' },
        printBackground: true 
      });
      await browser.close();

      res.contentType('application/pdf');
      return res.send(pdfBuffer);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new CurriculoController();
