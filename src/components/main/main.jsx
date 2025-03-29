import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../../css/index.css';
import App from './App.jsx';
import { ShopProvider } from './contexts/ShopContext'; 
import { StatsProvider } from './contexts/StatsContext';
import { UIProvider } from './contexts/UIContext';

createRoot(document.getElementById('root')).render(
    <StrictMode>   
        <StatsProvider> 
        <ShopProvider> 
        <UIProvider>     
            <App />
        </UIProvider>
        </ShopProvider>
        </StatsProvider>
    </StrictMode>
);