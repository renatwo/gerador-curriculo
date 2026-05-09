import React from 'react';
import { useCV } from '../context/CVContext';

const ObjectiveForm = () => {
  const { cvData, updateCV } = useCV();

  return (
    <div className="form-section">
      <h3>Objetivo Profissional</h3>
      <div className="input-group">
        <label>Descreva seu objetivo *</label>
        <textarea 
          name="objetivo"
          value={cvData.objetivo}
          onChange={(e) => updateCV('objetivo', e.target.value)}
          placeholder="Ex: Busco uma oportunidade na área de desenvolvimento web para aplicar meus conhecimentos em React e Node.js..."
          rows="6"
          required
        ></textarea>
      </div>
      
    </div>
  );
};

export default ObjectiveForm;
