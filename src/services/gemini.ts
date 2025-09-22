import { GoogleGenerativeAI } from '@google/generative-ai'

// Cole a sua chave de API que você copiou do Google AI Studio aqui
const API_KEY = 'AIzaSyCsKHDkrZkO4uNBeaYpSH0J96o9lwUqpYM' // Não esqueça de substituir pela sua chave!

const genAI = new GoogleGenerativeAI(API_KEY)
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

/**
 * Melhora um texto de currículo usando a API do Gemini.
 * Assegura tom profissional, palavras-chave relevantes, verbos de ação,
 * quantificação, correção gramatical e ortográfica, fluência e concisão.
 *
 * @param tipo - O tipo de texto a ser melhorado ('resumo' ou 'descricao').
 * @param texto - O texto original a ser enviado para a IA.
 * @returns O texto aprimorado pela IA.
 */
export async function melhorarTextoComIA(
  tipo: 'resumo' | 'descricao',
  texto: string
): Promise<string> {
  if (!texto.trim()) {
    return ''
  }

  let prompt = ''

  if (tipo === 'resumo') {
    prompt = `
      Reescreva e otimize o seguinte resumo profissional para um currículo.
      Deve ter um tom profissional, incluir palavras-chave relevantes para o mercado de trabalho (se aplicável),
      corrigir gramática e ortografia, melhorar a fluência
      Destaque as principais conquistas e habilidades de forma impactante.
      Texto original: "${texto}"
    `
  } else if (tipo === 'descricao') {
    prompt = `
      Reescreva e otimize a seguinte descrição de atividades para uma experiência profissional em um currículo.
      Utilize verbos de ação fortes no início das frases, inclua quantificação de resultados sempre que possível,
      corrija gramática e ortografia, melhore a fluência
      Destaque as responsabilidades e conquistas de forma clara e orientada a resultados.
      Texto original: "${texto}"
    `
  }

  try {
    const result = await model.generateContent(prompt)
    const response = await result.response
    const improvedText = response.text()
    return improvedText
  } catch (error) {
    console.error('Erro ao chamar a API do Gemini:', error)
    // Em caso de erro, retorna o texto original para não quebrar a aplicação
    return texto
  }
}