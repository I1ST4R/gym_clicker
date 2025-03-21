import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../../css/index.css';
import App from './App.jsx';
import { ShopProvider } from './ShopContext'; 
import { StatsProvider } from './StatsContext';
import { UIProvider } from './UIContext';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <UIProvider>     
        <StatsProvider>     
        <ShopProvider>     
            <App />
        </ShopProvider>
        </StatsProvider>
        </UIProvider>
    </StrictMode>
);