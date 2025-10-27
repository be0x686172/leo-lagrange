import { createRoot } from 'react-dom/client'
import './global.scss';
import LoginPage from './pages/login'

createRoot(document.getElementById('root')).render(
    <LoginPage />
)
