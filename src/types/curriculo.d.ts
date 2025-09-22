export interface Habilidade {
  id: string
  nome: string
  nivel: 'Básico' | 'Intermediário' | 'Avançado'
}

export interface Experiencia {
  id: string
  empresa: string
  cargo: string
  periodo: string
  descricao: string
  atual: boolean
}

export interface DadosPessoais {
  nome: string
  email: string
  telefone: string
  resumo: string
  linkedin: string
  fotoUrl?: string
}

export interface DadosCurriculo {
  pessoais: DadosPessoais
  habilidades: Habilidade[]
  experiencias: Experiencia[]
}
