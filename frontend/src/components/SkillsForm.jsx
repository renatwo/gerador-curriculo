import React, { useState } from 'react';
import { useCV } from '../context/CVContext';
import { Plus, X } from 'lucide-react';

const SkillsForm = () => {
  const { cvData, addItem, removeItem } = useCV();
  const [skillName, setSkillName] = useState('');

  const handleAdd = () => {
    if (skillName.trim()) {
      addItem('habilidades', { nome: skillName.trim() });
      setSkillName('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleAdd();
  };

  return (
    <div className="form-section">
      <h3>Habilidades</h3>
      
      <div className="input-with-btn">
        <input 
          placeholder="Ex: React, Node.js, Inglês Avançado..." 
          value={skillName}
          onChange={e => setSkillName(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="btn-icon-add" onClick={handleAdd}>
          <Plus size={20} />
        </button>
      </div>

      <div className="skills-tags">
        {cvData.habilidades.map((skill, index) => (
          <div key={index} className="skill-tag">
            {skill.nome}
            <button onClick={() => removeItem('habilidades', index)}>
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default SkillsForm;
