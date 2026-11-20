import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import KpiCard from '../components/KpiCard';
import Counter from '../components/Counter';
import Toggle from '../components/Toggle';
import TrackList from '../components/TrackList';
import FilterPanel from '../components/FilterPanel';
import AnalyticsChart from '../components/AnalyticsChart';
import { useDebounce } from '../hooks/useDebounce';
import { useFetch } from '../hooks/useFetch';
import { selectFilters, selectFavorites } from '../store/dashboardSlice';
import { fetchTracksWithFilters } from '../services/jamendoApi';

export default function DashboardPage() {
    const filters = useSelector(selectFilters);
    const favorites = useSelector(selectFavorites);

    const [showInSeconds, setShowInSeconds] = useState(false);
    const [visibleCount, setVisibleCount] = useState(filters.limit);

    useEffect(() => {
        setVisibleCount(filters.limit);
    }, [filters.limit]);

    const debouncedSearch = useDebounce(filters.search, 400);

    const queryParams = {
        search: debouncedSearch,
        genre: filters.genre,
        limit: filters.limit
    };

    const { data: tracks, loading, error } = useFetch(fetchTracksWithFilters, queryParams);
    const trackList = tracks || [];

    const totalTracks = trackList.length;
    const avgDurationSec = totalTracks > 0
        ? Math.round(trackList.reduce((acc, t) => acc + t.durationSec, 0) / totalTracks)
        : 0;
    const avgMins = Math.floor(avgDurationSec / 60);
    const avgSecs = avgDurationSec % 60;
    const avgDurationFormatted = `${avgMins}:${avgSecs < 10 ? '0' : ''}${avgSecs} хв`;

    const visibleTracks = trackList.slice(0, Math.min(visibleCount, totalTracks || 15));

    return (
        <>
            <section className="kpi-grid">
                <KpiCard
                    title="Знайдено за фільтром"
                    value={`${totalTracks} треків`}
                    change={filters.genre === 'All' ? 'Усі жанри' : `Жанр: ${filters.genre}`}
                    isPositive={true}
                    icon="📊"
                />
                <KpiCard
                    title="В обраному (Redux)"
                    value={`${favorites.length} треків`}
                    change="Збережено у Store"
                    isPositive={true}
                    icon="❤️"
                />
                <KpiCard
                    title="Сер. тривалість вибірки"
                    value={loading ? '...' : avgDurationFormatted}
                    change={`${avgDurationSec} сек`}
                    isPositive={true}
                    icon="⏱️"
                />
            </section>

            <FilterPanel />

            {/* Інтерактивний графік, що реагує на фільтри */}
            <AnalyticsChart tracks={visibleTracks} loading={loading} />

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
                        count={visibleTracks.length}
                        onIncrement={() => setVisibleCount((prev) => Math.min(prev + 1, totalTracks))}
                        onDecrement={() => setVisibleCount((prev) => Math.max(prev - 1, 1))}
                        onReset={() => setVisibleCount(totalTracks)}
                        min={1}
                        max={totalTracks || 15}
                    />
                    <Toggle isSeconds={showInSeconds} onToggle={() => setShowInSeconds((prev) => !prev)} />
                </aside>
            </section>
        </>
    );
}