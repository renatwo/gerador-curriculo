import React from 'react';

const TemplateModern = ({ data }) => {
  return (
    <div className="template-modern">
      <div className="sidebar">
        <div className="profile-img">
          {data.foto_url ? <img src={data.foto_url} alt="Profile" /> : <div className="img-placeholder">FOTO</div>}
        </div>
        
        <div className="side-section">
          <h4>Contato</h4>
          <p>{data.email}</p>
          <p>{data.telefone}</p>
          <p>{data.cidade_estado}</p>
        </div>

        {data.habilidades.length > 0 && (
          <div className="side-section">
            <h4>Habilidades</h4>
            <ul>
              {data.habilidades.map((h, i) => <li key={i}>{h.nome}</li>)}
            </ul>
          </div>
        )}
      </div>

      <div className="main-content">
        <header>
          <h1>{data.nome || 'Seu Nome'}</h1>
          <p className="linkedin">{data.linkedin}</p>
        </header>

        <section>
          <h3>Objetivo</h3>
          <p>{data.objetivo || 'Seu objetivo profissional...'}</p>
        </section>

        {data.formacoes.length > 0 && (
          <section>
            <h3>Formação</h3>
            {data.formacoes.map((f, i) => (
              <div key={i} className="item">
                <strong>{f.curso}</strong>
                <p>{f.instituicao} | {f.ano_inicio} - {f.ano_termino}</p>
              </div>
            ))}
          </section>
        )}

        {data.experiencias.length > 0 && (
          <section>
            <h3>Experiência</h3>
            {data.experiencias.map((e, i) => (
              <div key={i} className="item">
                <strong>{e.cargo}</strong>
                <p>{e.empresa} | {e.periodo_inicio} - {e.periodo_fim}</p>
                <p className="desc">{e.descricao}</p>
              </div>
            ))}
          </section>
        )}
      </div>

      
    </div>
  );
};

export default TemplateModern;
