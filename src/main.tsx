import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import LightPortfolio from './components/LightPortfolio.tsx';
import './index.css';
import './recruiter.css';

const isLightEdition = window.location.pathname.replace(/\/$/, '') === '/light';

createRoot(document.getElementById('root')!).render(
  isLightEdition ? <LightPortfolio /> : <App />,
);
