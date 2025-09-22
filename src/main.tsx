import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

/*
  main.tsx
  - Ponto de entrada da aplicação.
  - Define título e favicon dinamicamente e renderiza o App dentro de #root.
*/
document.title = 'Gerador de Currículo Inteligente'

// adiciona ou atualiza favicon em tempo de execução (arquivo em public/)
function setFavicon(href: string) {
  let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null
  if (!link) {
    link = document.createElement('link')
    link.rel = 'icon'
    document.head.appendChild(link)
  }
  link.href = href
}

// ajuste o caminho conforme o arquivo que você colocou em public/
setFavicon('/favicon-32x32.png')

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
