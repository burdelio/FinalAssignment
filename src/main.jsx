import { StrictMode, useState } from 'react'
import ReactDOM from 'react-dom/client'
import Providers from './providers/Providers'
import App from './App'
import './main.css'

import LoginForm from './forms/loginPage'

function MainApp() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <StrictMode>
      {isLoggedIn === false && <LoginForm setIsLoggedIn={setIsLoggedIn} />}
      {isLoggedIn === true && <Providers><App /></Providers>}
    </StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('todo')).render(
  <MainApp />
)

export default MainApp;