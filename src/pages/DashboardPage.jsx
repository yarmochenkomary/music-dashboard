import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import TrackList from '../components/TrackList';
import FilterPanel from '../components/FilterPanel';
import AnalyticsChart from '../components/AnalyticsChart';
import { StatCard, Card, Button } from '../design-system';
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
    const { data: tracks, loading, error } = useFetch(fetchTracksWithFilters, {
        search: debouncedSearch,
        genre: filters.genre,
        limit: filters.limit
    });

    const trackList = tracks || [];
    const totalTracks = trackList.length;
    const avgDurationSec =
        totalTracks > 0
            ? Math.round(trackList.reduce((acc, t) => acc + t.durationSec, 0) / totalTracks)
            : 0;
    const avgDurationFormatted = `${Math.floor(avgDurationSec / 60)}:${String(avgDurationSec % 60).padStart(2, '0')} хв`;

    const visibleTracks = trackList.slice(0, Math.min(visibleCount, totalTracks || 15));

    return (
        <>
            <section className="kpi-grid">
                <StatCard
                    title="Знайдено за фільтром"
                    value={`${totalTracks} треків`}
                    badgeText={filters.genre === 'All' ? 'Усі жанри' : filters.genre}
                    badgeVariant="primary"
                    icon="📊"
                />
                <StatCard
                    title="В обраному (Redux)"
                    value={`${favorites.length} треків`}
                    badgeText="Store"
                    badgeVariant="success"
                    icon="❤️"
                />
                <StatCard
                    title="Сер. тривалість вибірки"
                    value={loading ? '...' : avgDurationFormatted}
                    badgeText={`${avgDurationSec} сек`}
                    badgeVariant="neutral"
                    icon="⏱️"
                />
            </section>

            <FilterPanel />
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
                    <Card padding="md">
                        <h4 style={{ marginBottom: 'var(--space-sm)' }}>Кількість у списку: {visibleTracks.length}</h4>
                        <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => setVisibleCount((prev) => Math.max(prev - 1, 1))}
                            >
                                −
                            </Button>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => setVisibleCount((prev) => Math.min(prev + 1, totalTracks))}
                            >
                                +
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => setVisibleCount(totalTracks)}>
                                Усі ({totalTracks})
                            </Button>
                        </div>
                    </Card>

                    <Card padding="md">
                        <h4 style={{ marginBottom: 'var(--space-sm)' }}>Одиниці тривалості</h4>
                        <Button variant="primary" onClick={() => setShowInSeconds((prev) => !prev)}>
                            {showInSeconds ? 'Переключити на хв:сек' : 'Переключити на секунди'}
                        </Button>
                    </Card>
                </aside>
            </section>
        </>
    );
}