import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

try {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error("Failed to mount React app:", error);
  rootElement.innerHTML = `<div style="color: white; padding: 20px;">
    <h1>Application Error</h1>
    <p>Failed to load the application. Please check the console for details.</p>
    <pre>${error instanceof Error ? error.message : String(error)}</pre>
  </div>`;
}
