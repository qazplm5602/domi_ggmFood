import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "@styles/app/index.scss";
import App from '@components/App/App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
