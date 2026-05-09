import React from 'react';
import { CVProvider } from './context/CVContext';
import Dashboard from './pages/Dashboard';
import './styles/global.css';
import './styles/components.css';

function App() {
  return (
    <CVProvider>
      <Dashboard />
    </CVProvider>
  );
}

export default App;
