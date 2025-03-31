import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "@styles/app/index.scss";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <h1>Hello Domi!</h1>
  </StrictMode>,
)
