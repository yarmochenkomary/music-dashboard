import { Routes, Route, Link } from 'react-router';
import { useTheme } from './context/ThemeContext';
import DashboardPage from './pages/DashboardPage';
import TrackDetailsPage from './pages/TrackDetailsPage';
import './App.css';

export default function App() {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="app-container">
            <header className="dashboard-header header-with-actions">
                <div>
                    <Link to="/" className="brand-link">
                        <h1>🎧 Jamendo Analytics Dashboard</h1>
                    </Link>
                    <p className="subtitle">Лабораторна робота №4 — React Router, Дрілдаун та Context API</p>
                </div>

                <button className="btn-theme-toggle" onClick={toggleTheme}>
                    {theme === 'light' ? '🌙 Темна тема' : '☀️ Світла тема'}
                </button>
            </header>

            <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/track/:id" element={<TrackDetailsPage />} />
                <Route
                    path="*"
                    element={
                        <div className="widget-card status-card">
                            <h2>Сторінку не знайдено</h2>
                            <Link to="/" className="btn btn-back">← На головну</Link>
                        </div>
                    }
                />
            </Routes>
        </div>
    );
}