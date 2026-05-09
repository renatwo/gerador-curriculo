import React from 'react';

const TemplateClassic = ({ data }) => {
  return (
    <div className="template-classic">
      <div className="header">
        {data.foto_url && <img src={data.foto_url} alt="Profile" className="header-photo" />}
        <div className="header-info">
          <h1>{data.nome || 'Seu Nome'}</h1>
          <p>{data.email} {data.email && '|'} {data.telefone}</p>
          <p>{data.cidade_estado} {data.linkedin && '|'} {data.linkedin}</p>
        </div>
      </div>

      <section>
        <h4 className="title">Objetivo Profissional</h4>
        <p>{data.objetivo || 'Seu objetivo aparecerá aqui...'}</p>
      </section>

      {data.formacoes.length > 0 && (
        <section>
          <h4 className="title">Formação Acadêmica</h4>
          {data.formacoes.map((f, i) => (
            <div key={i} className="item">
              <strong>{f.curso}</strong> - {f.instituicao}
              <p className="sub">{f.ano_inicio} - {f.ano_termino}</p>
            </div>
          ))}
        </section>
      )}

      {data.experiencias.length > 0 && (
        <section>
          <h4 className="title">Experiência Profissional</h4>
          {data.experiencias.map((e, i) => (
            <div key={i} className="item">
              <strong>{e.cargo}</strong> na {e.empresa}
              <p className="sub">{e.periodo_inicio} - {e.periodo_fim}</p>
              <p className="desc">{e.descricao}</p>
            </div>
          ))}
        </section>
      )}

      {data.habilidades.length > 0 && (
        <section>
          <h4 className="title">Habilidades</h4>
          <div className="skills-list">
            {data.habilidades.map((h, i) => (
              <span key={i}>{h.nome}{i < data.habilidades.length - 1 ? ', ' : ''}</span>
            ))}
          </div>
        </section>
      )}

      
    </div>
  );
};

export default TemplateClassic;
