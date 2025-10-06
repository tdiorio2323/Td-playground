import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import Index from './pages/Index.tsx';
import Auth from './pages/Auth.tsx';
import Home from './pages/Home.tsx';

createRoot(document.getElementById("root")!).render(<App />);
