import React, { useState } from 'react';
import { useCV } from '../context/CVContext';
import PersonalForm from '../components/PersonalForm';
import ObjectiveForm from '../components/ObjectiveForm';
import EducationForm from '../components/EducationForm';
import ExperienceForm from '../components/ExperienceForm';
import SkillsForm from '../components/SkillsForm';
import Preview from '../components/Preview';
import CVList from '../components/CVList';
import { Layout, FileText, User, GraduationCap, Briefcase, Code, Download, Save, Trash2, RotateCcw } from 'lucide-react';
import { CVService } from '../services/api';

const Dashboard = () => {
  const { cvData, setCvData, updateCV, resetForm, loading, setLoading, setMessage } = useCV();
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    { id: 1, title: 'Dados Pessoais', icon: <User size={20} /> },
    { id: 2, title: 'Objetivo', icon: <FileText size={20} /> },
    { id: 3, title: 'Formação', icon: <GraduationCap size={20} /> },
    { id: 4, title: 'Experiência', icon: <Briefcase size={20} /> },
    { id: 5, title: 'Habilidades', icon: <Code size={20} /> }
  ];

  const handleSave = async () => {
    setLoading(true);
    try {
      if (cvData.id) {
        await CVService.update(cvData.id, cvData);
      } else {
        const res = await CVService.save(cvData);
        setCvData(res.data);
      }
      alert('✅ Currículo salvo com sucesso!');
    } catch (err) {
      const msg = err.response?.data?.error || err.message;
      alert(`❌ Erro ao salvar currículo: ${msg}\nVerifique se preencheu os campos corretamente (ex: Email válido).`);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    setLoading(true);
    try {
      let id = cvData.id;
      
      if (id) {
        await CVService.update(id, cvData);
      } else {
        const res = await CVService.save(cvData);
        id = res.data.id;
        setCvData(res.data);
      }
      
      const pdfRes = await CVService.downloadPdf(id);
      const url = window.URL.createObjectURL(new Blob([pdfRes.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `curriculo_${cvData.nome.replace(' ', '_')}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      const msg = err.response?.data?.error || err.message;
      alert(`❌ Erro ao gerar PDF: ${msg}\nVerifique se preencheu os campos obrigatórios corretamente (Nome, Email válido, etc).`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <header className="main-header fade-in">
        <div className="container">
          <div className="header-content">
            <Layout size={32} className="logo-icon" />
            <div>
              <h1>Gerador de Currículo em PDF</h1>
              <p>Crie seu currículo profissional em poucos minutos</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container main-content">
        <div className="grid-layout">
          {/* Coluna do Formulário */}
          <div className="form-column fade-in">
            <div className="stepper-card">
              <div className="stepper-nav">
                {steps.map(step => (
                  <button 
                    key={step.id}
                    className={`step-btn ${activeStep === step.id ? 'active' : ''}`}
                    onClick={() => setActiveStep(step.id)}
                  >
                    {step.icon}
                    <span>{step.title}</span>
                  </button>
                ))}
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${(activeStep / steps.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="form-card">
              {activeStep === 1 && <PersonalForm />}
              {activeStep === 2 && <ObjectiveForm />}
              {activeStep === 3 && <EducationForm />}
              {activeStep === 4 && <ExperienceForm />}
              {activeStep === 5 && <SkillsForm />}

              <div className="form-actions">
                <button className="btn btn-neutral" onClick={resetForm}>
                  <RotateCcw size={18} /> Limpar
                </button>
                <div className="main-actions">
                  <button className="btn btn-secondary" onClick={handleSave} disabled={loading}>
                    <Save size={18} /> Salvar
                  </button>
                  <button className="btn btn-primary" onClick={handleDownload} disabled={loading}>
                    <Download size={18} /> {loading ? 'Gerando...' : 'Gerar PDF'}
                  </button>
                </div>
              </div>
            </div>

            {/* Listagem de Currículos Salvos */}
            <CVList onEdit={(data) => setCvData(data)} />
          </div>

          {/* Coluna do Preview */}
          <div className="preview-column fade-in">
            <div className="preview-sticky">
              <div className="preview-header">
                <h3>Visualização em Tempo Real</h3>
                <div className="template-selector">
                   <button 
                    className={`tpl-btn ${cvData.template_id === 1 ? 'active' : ''}`}
                    onClick={() => updateCV('template_id', 1)}
                   >Clássico</button>
                   <button 
                    className={`tpl-btn ${cvData.template_id === 2 ? 'active' : ''}`}
                    onClick={() => updateCV('template_id', 2)}
                   >Moderno</button>
                </div>
              </div>
              <Preview />
            </div>
          </div>
        </div>
      </main>

      
    </div>
  );
};

export default Dashboard;
