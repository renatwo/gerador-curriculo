import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api'
});

export const CVService = {
  save: (data) => api.post('/curriculos', data),
  update: (id, data) => api.put(`/curriculos/${id}`, data),
  list: () => api.get('/curriculos'),
  getById: (id) => api.get(`/curriculos/${id}`),
  delete: (id) => api.delete(`/curriculos/${id}`),
  downloadPdf: (id) => api.post(`/curriculos/${id}/pdf`, {}, { responseType: 'blob' })
};

export default api;
