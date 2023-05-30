import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import Providers from './providers/Providers'
import App from './App'
import './main.css'

function MainApp() {
  return (
    <StrictMode>
      <Providers><App /></Providers>
    </StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('todo')).render(
  <MainApp />
);