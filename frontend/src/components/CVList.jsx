import React, { useEffect, useState } from 'react';
import { CVService } from '../services/api';
import { Trash2, Edit3, Download, FileText } from 'lucide-react';

const CVList = ({ onEdit }) => {
  const [cvs, setCvs] = useState([]);

  const loadCVs = async () => {
    try {
      const res = await CVService.list();
      setCvs(res.data);
    } catch (err) {}
  };

  useEffect(() => {
    loadCVs();
  }, []);

  const handleDelete = async (id) => {
    console.log('Tentando deletar currículo com ID:', id);
    if (!id) {
      alert('Erro: ID do currículo não encontrado.');
      return;
    }
    if (window.confirm('Tem certeza que deseja excluir este currículo?')) {
      try {
        await CVService.delete(id);
        loadCVs();
      } catch (err) {
        console.error('Erro ao deletar:', err);
        alert('Erro ao excluir currículo no servidor.');
      }
    }
  };

  return (
    <div className="cv-list">
      <h3>Seus Currículos Salvos</h3>
      {cvs.length === 0 ? (
        <p className="empty-msg">Nenhum currículo salvo ainda.</p>
      ) : (
        <div className="cv-grid">
          {cvs.map(cv => (
            <div key={cv.id} className="cv-item-card fade-in">
              <div className="cv-info">
                <FileText className="icon" size={24} />
                <div>
                  <strong>{cv.nome}</strong>
                  <p>{new Date(cv.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="cv-actions">
                <button title="Editar" onClick={() => onEdit(cv)}><Edit3 size={18} /></button>
                <button title="Excluir" className="btn-del" onClick={() => handleDelete(cv.id)}><Trash2 size={18} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      
    </div>
  );
};

export default CVList;
