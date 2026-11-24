import { useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme, selectFavorites, toggleTheme } from './store/dashboardSlice';
import { Button, Badge, Card } from './design-system';
import DashboardPage from './pages/DashboardPage';
import TrackDetailsPage from './pages/TrackDetailsPage';
import './App.css';

export default function App() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
                    <p className="subtitle">Лабораторна робота №6 — Дизайн-система, Atomic Design та Storybook</p>
                </div>

                <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'center' }}>
                    <Badge variant="primary">❤️ Обране: {favorites.length}</Badge>
                    <Button variant="secondary" onClick={() => dispatch(toggleTheme())}>
                        {theme === 'light' ? '🌙 Темна тема' : '☀️ Світла тема'}
                    </Button>
                </div>
            </header>

            <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/track/:id" element={<TrackDetailsPage />} />
                <Route
                    path="*"
                    element={
                        <Card>
                            <h2>Сторінку не знайдено</h2>
                            <Button onClick={() => navigate('/')}>← На головну</Button>
                        </Card>
                    }
                />
            </Routes>
        </div>
    );
}