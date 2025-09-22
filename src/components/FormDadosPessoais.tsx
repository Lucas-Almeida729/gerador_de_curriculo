import { useState, type ChangeEvent } from 'react';
import Secao from './Secao';
import type { DadosCurriculo } from '../types/curriculo';
import { melhorarTextoComIA } from '../services/gemini';

export default function FormDadosPessoais({
  dados,
  onChange,
}: {
  dados: DadosCurriculo['pessoais'];
  onChange: (p: Partial<DadosCurriculo['pessoais']>) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const onUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const arquivo = e.target.files?.[0];
    if (!arquivo) return;
    const url = URL.createObjectURL(arquivo);
    onChange({ fotoUrl: url });
  };

  const melhorarResumo = async () => {
    if (!dados.resumo?.trim() || isLoading) return;
    setIsLoading(true);
    try {
      const textoMelhorado = await melhorarTextoComIA('resumo', dados.resumo);
      onChange({ resumo: textoMelhorado });
    } finally {
      setIsLoading(false);
    }
  };

  const invalido = {
    nome: !dados.nome.trim(),
    email: !/^\S+@\S+\.\S+$/.test(dados.email || ''),
    telefone: !dados.telefone.trim(),
    linkedin: !dados.linkedin.trim(),
  };

  return (
    <Secao titulo="Dados Pessoais">
      {/* Foto de perfil */}
      <div className="flex items-center gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Foto de perfil</label>
          <input type="file" accept="image/*" onChange={onUpload} className="text-sm" />
        </div>
        {dados.fotoUrl ? (
          // --- ALTERAÇÃO AQUI: Tamanho e estilo da imagem ---
          <img
            src={dados.fotoUrl}
            alt="Foto de perfil"
            className="w-[100px] h-[100px] rounded-full object-cover border border-gray-300"
          />
        ) : (
          <div className="w-[100px] h-[100px] rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs border border-gray-300">
            Sem foto
          </div>
        )}
      </div>

      {/* Nome, Telefone, LinkedIn, E-mail (sem alterações aqui) */}
      <div className="float-group">
        <input
          type="text"
          name="nome"
          placeholder=" "
          value={dados.nome}
          onChange={e => onChange({ nome: e.target.value })}
          id="nome"
          className={`w-full border px-3 py-2 rounded ${invalido.nome ? 'border-red-500' : 'border-gray-300'}`}
        />
        <label htmlFor="nome">Nome completo</label>
      </div>
      <div className="float-group">
        <input
          type="tel"
          name="telefone"
          placeholder=" "
          value={dados.telefone}
          onChange={e => onChange({ telefone: e.target.value })}
          id="telefone"
          className={`w-full border px-3 py-2 rounded ${invalido.telefone ? 'border-red-500' : 'border-gray-300'}`}
        />
        <label htmlFor="telefone">Telefone</label>
      </div>
      <div className="float-group">
        <input
          type="text"
          name="linkedin"
          placeholder=" "
          value={dados.linkedin}
          onChange={e => onChange({ linkedin: e.target.value })}
          id="linkedin"
          className={`w-full border px-3 py-2 rounded ${invalido.linkedin ? 'border-red-500' : 'border-gray-300'}`}
        />
        <label htmlFor="linkedin">LinkedIn</label>
      </div>
      <div className="float-group">
        <input
          type="email"
          name="email"
          placeholder=" "
          value={dados.email}
          onChange={e => onChange({ email: e.target.value })}
          id="email"
          className={`w-full border px-3 py-2 rounded ${invalido.email ? 'border-red-500' : 'border-gray-300'}`}
        />
        <label htmlFor="email">E‑mail</label>
      </div>

      {/* Campo de Resumo (sem alterações aqui) */}
      <div className="float-group relative">
        <textarea
          name="resumo"
          placeholder=" "
          value={dados.resumo || ''}
          onChange={e => onChange({ resumo: e.target.value })}
          id="resumo"
          className="w-full border border-gray-300 px-3 py-2 rounded h-28"
          maxLength={600}
        />
        <label htmlFor="resumo">Resumo profissional</label>
        <div className="textarea-footer">
          <button
            type="button"
            onClick={melhorarResumo}
            disabled={isLoading || !dados.resumo?.trim()}
            className="btn-melhorar"
          >
            {isLoading ? 'Melhorando...' : '✨ Melhorar com IA'}
          </button>
          <div className="textarea-counter">{dados.resumo?.length ?? 0}/600</div>
        </div>
      </div>
    </Secao>
  );
}