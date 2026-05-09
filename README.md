# Gerador de Currículo em PDF - Projeto Profissional

Sistema completo para criação, gerenciamento e exportação de currículos profissionais. Desenvolvido com uma stack moderna e focado em alta fidelidade visual.

## 🚀 Tecnologias

- **Frontend:** React.js, Vite, Axios, Lucide Icons, CSS Moderno.
- **Backend:** Node.js, Express, Puppeteer (PDF Engine).
- **Banco de Dados:** SQLite com Sequelize ORM.
- **Animações:** Transições CSS e efeitos de entrada.

## ✨ Funcionalidades

- **Dashboard:** Visão geral de currículos salvos.
- **Formulário Multi-etapas:** Preenchimento organizado por categorias.
- **Preview em Tempo Real:** Veja as alterações instantaneamente.
- **Templates:** Escolha entre o modelo Clássico (Formal) e Moderno (Sidebar).
- **CRUD Completo:** Salve, edite, visualize e exclua seus currículos.
- **Exportação Pro:** Download em PDF gerado no servidor para máxima fidelidade.

## 🛠️ Como Instalar e Rodar

### Pré-requisitos: Node.js instalado.

#### 1. Configurar o Backend
```bash
cd backend
npm install
npm start (ou node src/server.js)
```
O backend rodará na porta **3001**.

#### 2. Configurar o Frontend
```bash
cd frontend
npm install
npm run dev
```
O frontend abrirá geralmente em **localhost:5173**.

## 📖 Como Usar

1. Na tela principal, clique nos ícones das etapas para preencher seus dados.
2. Observe o painel lateral para ver o currículo sendo montado em tempo real.
3. Escolha o template desejado (Clássico ou Moderno).
4. Clique em **Salvar** para persistir seus dados no banco.
5. Clique em **Gerar PDF** para baixar seu currículo pronto para envio!

---
Projeto desenvolvido como atividade acadêmica e portfólio profissional.
