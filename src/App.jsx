import { useState, useEffect } from 'react';
import KpiCard from './components/KpiCard';
import Counter from './components/Counter';
import Toggle from './components/Toggle';
import TrackList from './components/TrackList';
import { fetchPopularTracks } from './services/jamendoApi';
import './App.css';

export default function App() {
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showInSeconds, setShowInSeconds] = useState(false);
    const [visibleCount, setVisibleCount] = useState(15);

    // Вимога 1: Дані завантажуються суто через useEffect при монтуванні
    useEffect(() => {
        let isMounted = true;
        setLoading(true);

        fetchPopularTracks(15)
            .then(data => {
                if (isMounted) {
                    setTracks(data);
                    setVisibleCount(data.length);
                    setError(null);
                }
            })
            .catch(err => {
                if (isMounted) {
                    setError(err.message || 'Помилка отримання даних з API');
                }
            })
            .finally(() => {
                if (isMounted) {
                    setLoading(false);
                }
            });

        return () => {
            isMounted = false; // Cleanup при розмонтуванні
        };
    }, []);

    // Вимога 5: Перерахунок KPI на основі реальних даних з API
    const totalTracks = tracks.length;

    const avgDurationSec = totalTracks > 0
        ? Math.round(tracks.reduce((acc, t) => acc + t.durationSec, 0) / totalTracks)
        : 0;
    const avgMins = Math.floor(avgDurationSec / 60);
    const avgSecs = avgDurationSec % 60;
    const avgDurationFormatted = `${avgMins}:${avgSecs < 10 ? '0' : ''}${avgSecs} хв`;

    const topArtist = totalTracks > 0 ? tracks[0].artist : '—';

    const visibleTracks = tracks.slice(0, visibleCount);

    return (
        <div className="app-container">
            <header className="dashboard-header">
                <h1>🎧 Jamendo Analytics Dashboard</h1>
                <p className="subtitle">Лабораторна робота №2 — Інтеграція з REST API (useEffect)</p>
            </header>

            {/* Перераховані KPI з API */}
            <section className="kpi-grid">
                <KpiCard
                    title="Завантажено з API"
                    value={`${totalTracks} треків`}
                    change="Jamendo v3.0 API"
                    isPositive={true}
                    icon="🌐"
                />
                <KpiCard
                    title="Топ-виконавець (#1)"
                    value={topArtist}
                    change="Popularity Leader"
                    isPositive={true}
                    icon="👑"
                />
                <KpiCard
                    title="Середня тривалість"
                    value={loading ? '...' : avgDurationFormatted}
                    change={`${avgDurationSec} сек`}
                    isPositive={true}
                    icon="⏱️"
                />
            </section>

            {/* Основний блок */}
            <section className="dashboard-grid">
                <div className="main-content">
                    <TrackList
                        tracks={visibleTracks}
                        loading={loading}
                        error={error}
                        showInSeconds={showInSeconds}
                    />
                </div>
                <aside className="sidebar-content">
                    <Counter
                        count={visibleCount}
                        onIncrement={() => setVisibleCount(prev => Math.min(prev + 1, tracks.length || 15))}
                        onDecrement={() => setVisibleCount(prev => Math.max(prev - 1, 1))}
                        onReset={() => setVisibleCount(tracks.length || 15)}
                        min={1}
                        max={tracks.length || 15}
                    />
                    <Toggle isSeconds={showInSeconds} onToggle={() => setShowInSeconds(prev => !prev)} />
                </aside>
            </section>
        </div>
    );
}