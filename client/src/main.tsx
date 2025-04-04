import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import "@styles/font/font.css"; // 엄... 태블릿이랑 폰트가 안맞음
import "@styles/app/index.scss";
import App from '@components/App/App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
