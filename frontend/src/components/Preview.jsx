import React from 'react';
import { useCV } from '../context/CVContext';
import TemplateClassic from './TemplateClassic';
import TemplateModern from './TemplateModern';

const Preview = () => {
  const { cvData } = useCV();

  return (
    <div className="preview-container">
      <div className="a4-sheet">
        {cvData.template_id === 1 ? (
          <TemplateClassic data={cvData} />
        ) : (
          <TemplateModern data={cvData} />
        )}
      </div>

      
    </div>
  );
};

export default Preview;
