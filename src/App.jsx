import { useState } from 'react';
import KpiCard from './components/KpiCard';
import Counter from './components/Counter';
import Toggle from './components/Toggle';
import TrackList from './components/TrackList';
import { MOCK_TRACKS } from './data/mockTracks';
import './App.css';

export default function App() {
  const [showInSeconds, setShowInSeconds] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5); // Початково показуємо 5 треків

  // Обмежений масив треків для таблиці
  const visibleTracks = MOCK_TRACKS.slice(0, visibleCount);

  return (
      <div className="app-container">
        <header className="dashboard-header">
          <h1>🎧 Music Stream Analytics</h1>
          <p className="subtitle">Лабораторна робота №1 — Аналітичний дашборд</p>
        </header>

        {/* KPI Cards */}
        <section className="kpi-grid">
          <KpiCard title="Топ-трек" value="Blinding Lights" change="4.1B стрімів" isPositive={true} icon="🔥" />
          <KpiCard title="Топ-виконавиця" value="Sabrina Carpenter" change="+24% слухачів" isPositive={true} icon="👑" />
          <KpiCard title="Середня тривалість" value="3:05 хв" change="-0.12 хв" isPositive={false} icon="⏱️" />
        </section>

        {/* Основна сітка */}
        <section className="dashboard-grid">
          <div className="main-content">
            <TrackList tracks={visibleTracks} showInSeconds={showInSeconds} />
          </div>
          <aside className="sidebar-content">
            <Counter
                count={visibleCount}
                onIncrement={() => setVisibleCount(prev => Math.min(prev + 1, MOCK_TRACKS.length))}
                onDecrement={() => setVisibleCount(prev => Math.max(prev - 1, 1))}
                onReset={() => setVisibleCount(MOCK_TRACKS.length)}
                min={1}
                max={MOCK_TRACKS.length}
            />
            <Toggle isSeconds={showInSeconds} onToggle={() => setShowInSeconds(prev => !prev)} />
          </aside>
        </section>
      </div>
  );
}