import { useState } from 'react'
import FormDadosPessoais from './components/FormDadosPessoais'
import FormHabilidades from './components/FormHabilidades'
import FormExperiencias from './components/FormExperiencias'
import PreviewCurriculo from './components/PreviewCurriculo'
import type { DadosCurriculo } from './types/curriculo'
import './App.css'

/*
  App.tsx
  - Componente raiz da aplicação.
  - Mantém o estado central `dadosCurriculo` (dados pessoais, habilidades, experiências).
  - Fornece handlers para atualizar partes do estado e passa como props para os formulários.
  - Controla layout 50/50: painel de edição à esquerda e preview à direita.
*/
export default function App() {
  const [dadosCurriculo, setDadosCurriculo] = useState<DadosCurriculo>({
    pessoais: { nome: '', email: '', telefone: '', linkedin: '', resumo: '', fotoUrl: '' },
    habilidades: [],
    experiencias: [],
  })

  // Atualiza somente os campos pessoais (merge parcial)
  const atualizarPessoais = (parte: Partial<DadosCurriculo['pessoais']>) =>
    setDadosCurriculo(prev => ({ ...prev, pessoais: { ...prev.pessoais, ...parte } }))

  // Substitui a lista de habilidades
  const atualizarHabilidades = (lista: DadosCurriculo['habilidades']) =>
    setDadosCurriculo(prev => ({ ...prev, habilidades: lista }))

  // Substitui a lista de experiências
  const atualizarExperiencias = (lista: DadosCurriculo['experiencias']) =>
    setDadosCurriculo(prev => ({ ...prev, experiencias: lista }))

  return (
    // layout: grid 50/50 controlado pelo CSS (App.css)
    <div className="app-root h-screen grid grid-cols-2 overflow-hidden">
      {/* Painel esquerdo: formulários (scroll interno) */}
      <div className="overflow-y-auto p-6 form-panel">
        <FormDadosPessoais dados={dadosCurriculo.pessoais} onChange={atualizarPessoais} />
        <FormHabilidades habilidades={dadosCurriculo.habilidades} onChange={atualizarHabilidades} />
        <FormExperiencias experiencias={dadosCurriculo.experiencias} onChange={atualizarExperiencias} />
      </div>

      {/* Painel direito: preview do currículo (live) */}
      <div className="overflow-y-auto p-6 preview-panel">
        <PreviewCurriculo dados={dadosCurriculo} />
      </div>
    </div>
  )
}