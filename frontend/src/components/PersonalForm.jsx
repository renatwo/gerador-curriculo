import React from 'react';
import { useCV } from '../context/CVContext';

const PersonalForm = () => {
  const { cvData, updateCV } = useCV();

  const handleChange = (e) => {
    updateCV(e.target.name, e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('A foto deve ter no máximo 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        updateCV('foto_url', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="form-section">
      <h3>Dados Pessoais</h3>
      <div className="form-grid">
        <div className="input-group photo-group">
          <label>Foto de Perfil</label>
          <div className="photo-upload">
            {cvData.foto_url ? (
              <div className="photo-preview-wrapper">
                <img src={cvData.foto_url} alt="Perfil" className="photo-preview" />
                <button className="btn-remove-photo" onClick={() => updateCV('foto_url', '')}>Remover</button>
              </div>
            ) : (
              <div className="upload-placeholder">
                <input 
                  type="file" 
                  id="photo-input"
                  accept="image/*"
                  onChange={handleFileChange} 
                  style={{ display: 'none' }}
                />
                <label htmlFor="photo-input" className="upload-btn">
                  <span>Selecionar Foto</span>
                </label>
              </div>
            )}
          </div>
        </div>
        <div className="input-group">
          <label>Nome Completo *</label>
          <input 
            type="text" 
            name="nome" 
            value={cvData.nome} 
            onChange={handleChange} 
            placeholder="Ex: João Silva" 
            required
          />
        </div>
        <div className="input-grid-2">
          <div className="input-group">
            <label>Email *</label>
            <input 
              type="email" 
              name="email" 
              value={cvData.email} 
              onChange={handleChange} 
              placeholder="joao@email.com" 
              required
            />
          </div>
          <div className="input-group">
            <label>Telefone *</label>
            <input 
              type="tel" 
              name="telefone" 
              value={cvData.telefone} 
              onChange={handleChange} 
              placeholder="(11) 99999-9999" 
              required
            />
          </div>
        </div>
        <div className="input-group">
          <label>Cidade / Estado *</label>
          <input 
            type="text" 
            name="cidade_estado" 
            value={cvData.cidade_estado} 
            onChange={handleChange} 
            placeholder="São Paulo - SP" 
            required
          />
        </div>
        <div className="input-group">
          <label>LinkedIn ou Portfólio</label>
          <input 
            type="url" 
            name="linkedin" 
            value={cvData.linkedin} 
            onChange={handleChange} 
            placeholder="https://linkedin.com/in/joaosilva" 
          />
        </div>
      </div>

      
    </div>
  );
};

export default PersonalForm;
