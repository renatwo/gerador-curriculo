import React, { useState } from 'react';
import { useCV } from '../context/CVContext';
import { Plus, Trash2 } from 'lucide-react';

const EducationForm = () => {
  const { cvData, addItem, removeItem } = useCV();
  const [form, setForm] = useState({ curso: '', instituicao: '', ano_inicio: '', ano_termino: '' });

  const handleAdd = () => {
    if (form.curso && form.instituicao) {
      addItem('formacoes', form);
      setForm({ curso: '', instituicao: '', ano_inicio: '', ano_termino: '' });
    }
  };

  return (
    <div className="form-section">
      <h3>Formação Acadêmica</h3>
      
      <div className="add-item-box">
        <div className="input-grid-2">
          <input 
            placeholder="Curso (Ex: Análise e Desenvolvimento de Sistemas)" 
            value={form.curso}
            onChange={e => setForm({...form, curso: e.target.value})}
          />
          <input 
            placeholder="Instituição (Ex: FIAP)" 
            value={form.instituicao}
            onChange={e => setForm({...form, instituicao: e.target.value})}
          />
        </div>
        <div className="input-grid-2">
          <input 
            placeholder="Ano Início" 
            value={form.ano_inicio}
            onChange={e => setForm({...form, ano_inicio: e.target.value})}
          />
          <input 
            placeholder="Ano Término" 
            value={form.ano_termino}
            onChange={e => setForm({...form, ano_termino: e.target.value})}
          />
        </div>
        <button className="btn-add" onClick={handleAdd}>
          <Plus size={18} /> Adicionar Formação
        </button>
      </div>

      <div className="items-list">
        {cvData.formacoes.map((item, index) => (
          <div key={index} className="item-card">
            <div>
              <strong>{item.curso}</strong>
              <p>{item.instituicao} ({item.ano_inicio} - {item.ano_termino})</p>
            </div>
            <button className="btn-remove" onClick={() => removeItem('formacoes', index)}>
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default EducationForm;
