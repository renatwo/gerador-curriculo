import React, { createContext, useState, useContext } from 'react';

const CVContext = createContext();

export const CVProvider = ({ children }) => {
  const initialState = {
    nome: '',
    email: '',
    telefone: '',
    cidade_estado: '',
    linkedin: '',
    foto_url: '',
    objetivo: '',
    formacoes: [],
    experiencias: [],
    habilidades: [],
    template_id: 1
  };

  const [cvData, setCvData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const updateCV = (field, value) => {
    setCvData(prev => ({ ...prev, [field]: value }));
  };

  const addItem = (section, item) => {
    setCvData(prev => ({ ...prev, [section]: [...prev[section], item] }));
  };

  const removeItem = (section, index) => {
    setCvData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const resetForm = () => {
    setCvData(initialState);
  };

  return (
    <CVContext.Provider value={{ 
      cvData, setCvData, updateCV, addItem, removeItem, resetForm,
      loading, setLoading, message, setMessage 
    }}>
      {children}
    </CVContext.Provider>
  );
};

export const useCV = () => useContext(CVContext);
