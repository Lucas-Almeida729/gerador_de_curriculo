import type { PropsWithChildren } from 'react'

/*
  Secao
  - Componente wrapper simples para reutilizar estilo de seção/card.
  - Recebe `titulo` e children; mantém markup consistente entre formulários.
*/
export default function Secao({ titulo, children }: { titulo: string; children?: React.ReactNode }) {
  return (
    <section className="secao">
      <h2>{titulo}</h2>
      <div>{children}</div>
    </section>
  )
}
