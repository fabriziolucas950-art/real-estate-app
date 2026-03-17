import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('No se encontró el elemento root en el DOM.');
} else {
  try {
    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  } catch (error) {
    console.error('Error al renderizar la aplicación:', error);
    rootElement.innerHTML = `<div style="padding: 2rem; color: #ff4d4d; background: #1a1a1a; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; font-family: sans-serif;">
      <h1>Error de Carga</h1>
      <p>Hubo un problema al iniciar la aplicación. Por favor, revisá la consola del navegador para más detalles.</p>
      <pre style="background: #000; padding: 1rem; border-radius: 8px; max-width: 80%; overflow: auto;">\${error.message}</pre>
    </div>`;
  }
}
