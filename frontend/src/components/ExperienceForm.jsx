import React, { useState } from 'react';
import { useCV } from '../context/CVContext';
import { Plus, Trash2 } from 'lucide-react';

const ExperienceForm = () => {
  const { cvData, addItem, removeItem } = useCV();
  const [form, setForm] = useState({ empresa: '', cargo: '', periodo_inicio: '', periodo_fim: '', descricao: '' });

  const handleAdd = () => {
    if (form.empresa && form.cargo) {
      addItem('experiencias', form);
      setForm({ empresa: '', cargo: '', periodo_inicio: '', periodo_fim: '', descricao: '' });
    }
  };

  return (
    <div className="form-section">
      <h3>Experiência Profissional</h3>
      
      <div className="add-item-box">
        <div className="input-grid-2">
          <input 
            placeholder="Empresa" 
            value={form.empresa}
            onChange={e => setForm({...form, empresa: e.target.value})}
          />
          <input 
            placeholder="Cargo" 
            value={form.cargo}
            onChange={e => setForm({...form, cargo: e.target.value})}
          />
        </div>
        <div className="input-grid-2">
          <input 
            placeholder="Início" 
            value={form.periodo_inicio}
            onChange={e => setForm({...form, periodo_inicio: e.target.value})}
          />
          <input 
            placeholder="Fim" 
            value={form.periodo_fim}
            onChange={e => setForm({...form, periodo_fim: e.target.value})}
          />
        </div>
        <textarea 
          placeholder="Descrição das atividades..." 
          value={form.descricao}
          onChange={e => setForm({...form, descricao: e.target.value})}
          rows="3"
        ></textarea>
        <button className="btn-add" onClick={handleAdd}>
          <Plus size={18} /> Adicionar Experiência
        </button>
      </div>

      <div className="items-list">
        {cvData.experiencias.map((item, index) => (
          <div key={index} className="item-card">
            <div>
              <strong>{item.cargo} na {item.empresa}</strong>
              <p>{item.periodo_inicio} - {item.periodo_fim}</p>
            </div>
            <button className="btn-remove" onClick={() => removeItem('experiencias', index)}>
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default ExperienceForm;
