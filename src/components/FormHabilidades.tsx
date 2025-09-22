import { useState, useRef } from 'react'
import type { DadosCurriculo, Habilidade } from '../types/curriculo'

/*
  FormHabilidades
  - Controle de input para adicionar uma habilidade.
  - Mostra chips com as habilidades adicionadas.
  - Botões: Adicionar e Limpar (limpa input e toda lista).
*/
export default function FormHabilidades({
  habilidades,
  onChange,
}: {
  habilidades: DadosCurriculo['habilidades']
  onChange: (h: DadosCurriculo['habilidades']) => void
}) {
  const [text, setText] = useState('')
  const [nivel, setNivel] = useState<Habilidade['nivel']>('Intermediário')
  const inputRef = useRef<HTMLInputElement | null>(null)

  // Adiciona a habilidade atual (string) à lista
 const add = () => {
    if (!text.trim()) return
    const novaHabilidade: Habilidade = {
      id: `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      nome: text.trim(),
      nivel,
    }
    onChange([...habilidades, novaHabilidade])
    setText('')
    inputRef.current?.focus()
  }

  // Limpa o input e a lista completa
  const limpar = () => {
    setText('')
    onChange([]) // limpa também a lista de habilidades exibida
    inputRef.current?.focus()
  }

  return (
    <section className="secao">
      <h2>Habilidades</h2>

      {/* Input com floating label */}
      <div className="float-group input-with-icon">
        <input
          ref={inputRef}
          type="text"
          placeholder=" "
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') add() }}
          id="nova-habilidade"
        />
        <label htmlFor="nova-habilidade">Adicionar habilidade</label>
      </div>

{/* Select para nível da habilidade */}
      <div className="float-group">
        <select value={nivel} onChange={e => setNivel(e.target.value as Habilidade['nivel'])}>
          <option value="Básico">Básico</option>
          <option value="Intermediário">Intermediário</option>
          <option value="Avançado">Avançado</option>
        </select>
        <label>Nível</label>
      </div>

      {/* Chips com nome e nível */}
      <div style={{ marginTop: 8 }} className="chips">
        {habilidades.map(h => (
          <span key={h.id} className="chip">
            {h.nome} — <span className="muted">{h.nivel}</span>
          </span>
        ))}
      </div>

      {/* Chips: exibe a lista atual de habilidades */}
      <div style={{ marginTop: 8 }} className="chips">
        {habilidades.map((h, i) => (
          <span key={typeof h === 'string' ? `${h}-${i}` : h.id ?? `${i}`} className="chip">
            {typeof h === 'string' ? h : h.nome}
          </span>
        ))}
      </div>

      {/* Ações: adicionar e limpar */}
      <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
        <button className="btn" type="button" onClick={add}>Adicionar</button>
        <button className="btn ghost" type="button" onClick={limpar}>Limpar</button>
      </div>
    </section>
  )
}


