import { useState, useRef, type ChangeEvent } from 'react'
import Secao from './Secao'
import type { DadosCurriculo } from '../types/curriculo'
import { melhorarTextoComIA } from '../services/gemini' // 1. Importa a função da IA

export default function FormExperiencias({
  experiencias,
  onChange,
}: {
  experiencias: DadosCurriculo['experiencias']
  onChange: (e: DadosCurriculo['experiencias']) => void
}) {
  const inicial = { empresa: '', cargo: '', periodo: '', descricao: '', atual: false }
  const [form, setForm] = useState(inicial)
  const inputRef = useRef<HTMLInputElement | null>(null)
  // 2. Estado para controlar o carregamento da IA
  const [isLoading, setIsLoading] = useState(false)

  const onInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value }))
  }

  // 3. Função que chama a IA para melhorar a descrição
  const melhorarDescricao = async () => {
    if (!form.descricao || isLoading) return
    setIsLoading(true)
    try {
      const textoMelhorado = await melhorarTextoComIA('descricao', form.descricao)
      setForm(prev => ({ ...prev, descricao: textoMelhorado }))
    } finally {
      setIsLoading(false)
    }
  }

  const adicionar = () => {
    if (!form.empresa.trim() || !form.cargo.trim()) return
    onChange([...experiencias, { ...form, id: `${Date.now()}` }])
    setForm(inicial)
    inputRef.current?.focus()
  }

  const remover = (eid: string) => onChange(experiencias.filter(e => e.id !== eid))
  const limparTudo = () => {
    setForm(inicial)
    onChange([])
    inputRef.current?.focus()
  }

  return (
    <Secao titulo="Experiências">
      {/* Campos Empresa, Cargo, Período (sem alterações) */}
      <div className="float-group">
        <input id="empresa" name="empresa" value={form.empresa} onChange={onInput} placeholder=" " ref={inputRef} />
        <label htmlFor="empresa">Empresa</label>
      </div>
      <div className="float-group">
        <input id="cargo" name="cargo" value={form.cargo} onChange={onInput} placeholder=" " />
        <label htmlFor="cargo">Cargo</label>
      </div>
      <div className="float-group">
        <input id="periodo" name="periodo" value={form.periodo} onChange={onInput} placeholder=" " />
        <label htmlFor="periodo">Período (ex: Jan 2020 – Atual)</label>
      </div>

      {/* 4. Campo de Descrição com o novo botão "Melhorar" */}
      <div className="float-group relative">
        <textarea id="descricao" name="descricao" value={form.descricao} onChange={onInput} placeholder=" " />
        <label htmlFor="descricao">Descrição das atividades</label>
        <div className="textarea-footer">
          <button
            type="button"
            onClick={melhorarDescricao}
            disabled={isLoading || !form.descricao}
            className="btn-melhorar"
          >
            {isLoading ? 'Melhorando...' : '✨ Melhorar com IA'}
          </button>
          <div className="textarea-counter">{form.descricao.length}/600</div>
        </div>
      </div>

      <label className="inline-flex items-center mt-2">
        <input type="checkbox" name="atual" checked={form.atual} onChange={onInput} className="mr-2" />
        Trabalho atual
      </label>

      <div style={{ marginTop: 12, marginBottom: 8, display: 'flex', gap: 8 }}>
        <button onClick={adicionar} disabled={!form.empresa.trim() || !form.cargo.trim()} className="btn" type="button">
          Adicionar
        </button>
        <button onClick={limparTudo} className="btn ghost" type="button">
          Limpar
        </button>
      </div>

      <ul className="space-y-2">
        {experiencias.map(e => (
          <li key={e.id} className="flex justify-between items-center card">
            <div>
              <div style={{ fontWeight: 700 }}>{e.cargo} — {e.empresa}</div>
              <div className="muted" style={{ marginTop: 4 }}>{e.periodo}{e.atual ? ' (Atual)' : ''}</div>
            </div>
            <button onClick={() => remover(e.id)} className="btn ghost" type="button">Remover</button>
          </li>
        ))}
        {experiencias.length === 0 && <li className="muted">Nenhuma experiência adicionada.</li>}
      </ul>
    </Secao>
  )
}