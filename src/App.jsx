import { useEffect } from 'react';
import { Routes, Route, Link } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme, selectFavorites, toggleTheme } from './store/dashboardSlice';
import DashboardPage from './pages/DashboardPage';
import TrackDetailsPage from './pages/TrackDetailsPage';
import './App.css';

export default function App() {
    const dispatch = useDispatch();
    const theme = useSelector(selectTheme);
    const favorites = useSelector(selectFavorites);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <div className="app-container">
            <header className="dashboard-header header-with-actions">
                <div>
                    <Link to="/" className="brand-link">
                        <h1>🎧 Jamendo Analytics Dashboard</h1>
                    </Link>
                    <p className="subtitle">Лабораторна робота №5 — Redux Toolkit та візуалізація даних (Recharts)</p>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <span className="track-badge">❤️ Обране: {favorites.length}</span>
                    <button className="btn-theme-toggle" onClick={() => dispatch(toggleTheme())}>
                        {theme === 'light' ? '🌙 Темна тема' : '☀️ Світла тема'}
                    </button>
                </div>
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