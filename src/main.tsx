import './index.css'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import AppProviders from './providers/AppProviders.tsx'

createRoot(document.getElementById('root')!).render(
    <AppProviders>
        <App />
    </AppProviders>
)
