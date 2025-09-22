import type { DadosCurriculo } from '../types/curriculo'

/*
  PreviewCurriculo
  - Recebe `dados` e renderiza o currículo em formato legível.
  - Trata ambos formatos para habilidades (string ou objeto).
  - Organiza experiências exibindo título, período e descrição.
*/
interface Props { dados: DadosCurriculo }

export default function PreviewCurriculo({ dados }: Props) {
  const { pessoais, habilidades, experiencias } = dados

  return (
    <div className="preview-root">
      <header className="preview-header">
        {pessoais.fotoUrl ? (
          <img src={pessoais.fotoUrl} alt="Foto de perfil" className="preview-avatar" />
        ) : (
          <div className="preview-avatar">Foto</div>
        )}
        <div>
          <h1 className="preview-name">{pessoais.nome || 'Seu Nome'}</h1>
          <p className="preview-role">
            {pessoais.email || 'seu@email'}
            {pessoais.telefone ? ` • ${pessoais.telefone}` : ''}
            {pessoais.linkedin ? ` • ${pessoais.linkedin}` : ''}
          </p>
        </div>
      </header>

      <section className="preview-section">
        <h2>Perfil Profissional</h2>
        <p className={pessoais.resumo ? '' : 'muted'}>
          {pessoais.resumo || 'Seu resumo aparecerá aqui...'}
        </p>
      </section>

      <section className="preview-section">
        <h2>Habilidades</h2>
        {habilidades.length ? (
          <ul className="mt-2 list-disc ml-5">
            {habilidades.map((h, i) => {
              const nome = typeof h === 'string' ? h : h.nome ?? ''
              const nivel = typeof h === 'string' ? undefined : h.nivel
              const key = typeof h === 'string' ? `${nome}-${i}` : h.id ?? `${nome}-${i}`
              return (
                <li key={key}>
                  <span>{nome}</span>
                  {nivel ? <span className="muted"> — {nivel}</span> : null}
                </li>
              )
            })}
          </ul>
        ) : (
          <p className="muted">Nenhuma habilidade adicionada.</p>
        )}
      </section>

      <section className="preview-section">
        <h2>Experiência Profissional</h2>
        {experiencias.length ? (
          <div className="mt-2 space-y-4">
            {experiencias.map(e => (
              <div key={e.id} className="preview-item">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ margin: 0 }}>{e.cargo} — {e.empresa}</h3>
                  <span className="muted">{e.periodo}{e.atual ? ' (Atual)' : ''}</span>
                </div>
                <p className="muted" style={{ marginTop: 6 }}>{e.descricao}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="muted">Nenhuma experiência adicionada.</p>
        )}
      </section>
    </div>
  )
}