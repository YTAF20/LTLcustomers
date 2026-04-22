import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '../halal_restaurant_ratings.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
