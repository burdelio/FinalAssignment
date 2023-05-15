import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import Providers from './providers/Providers'
import App from './App'
import './main.css'

ReactDOM.createRoot(document.getElementById('todo')).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>
)
