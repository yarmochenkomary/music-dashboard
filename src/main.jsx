import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { ThemeProvider } from './context/ThemeContext';
import { FilterProvider } from './context/FilterContext';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <ThemeProvider>
                <FilterProvider>
                    <App />
                </FilterProvider>
            </ThemeProvider>
        </BrowserRouter>
    </StrictMode>
);