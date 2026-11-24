import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { selectFavorites, toggleFavorite } from '../store/dashboardSlice';
import { Card, Button, Badge, Spinner, DataTable } from '../design-system';

export default function TrackList({ tracks, loading, error, showInSeconds }) {
    const [sortField, setSortField] = useState('title');
    const [sortDirection, setSortDirection] = useState('asc');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const favorites = useSelector(selectFavorites);

    if (loading) {
        return (
            <Card>
                <Spinner text="Завантаження даних з Jamendo API..." />
            </Card>
        );
    }

    if (error) {
        return (
            <Card>
                <h3>⚠️ Помилка завантаження даних</h3>
                <p>{error}</p>
            </Card>
        );
    }

    if (!tracks || tracks.length === 0) {
        return (
            <Card>
                <p>📭 За вашим запитом треків не знайдено.</p>
            </Card>
        );
    }

    const sortedTracks = [...tracks].sort((a, b) => {
        let aVal = a[sortField];
        let bVal = b[sortField];
        if (typeof aVal === 'string') {
            aVal = aVal.toLowerCase();
            bVal = bVal.toLowerCase();
        }
        if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const columns = [
        {
            key: 'fav',
            header: 'Обране',
            render: (track) => {
                const isFav = favorites.includes(String(track.id));
                return (
                    <div onClick={(e) => e.stopPropagation()}>
                        <Button
                            size="sm"
                            variant={isFav ? 'danger' : 'ghost'}
                            onClick={() => dispatch(toggleFavorite(track.id))}
                        >
                            {isFav ? '❤️' : '🤍'}
                        </Button>
                    </div>
                );
            }
        },
        {
            key: 'image',
            header: 'Обкладинка',
            render: (track) => <img src={track.image} alt={track.title} className="track-cover" />
        },
        {
            key: 'title',
            header: 'Назва',
            render: (track) => (
                <Link to={`/track/${track.id}`} className="track-link" onClick={(e) => e.stopPropagation()}>
                    {track.title}
                </Link>
            )
        },
        { key: 'artist', header: 'Виконавець' },
        {
            key: 'genre',
            header: 'Жанр',
            render: (track) => <Badge variant="primary">{track.genre}</Badge>
        },
        {
            key: 'duration',
            header: 'Тривалість',
            render: (track) => (
                <strong>{showInSeconds ? `${track.durationSec} сек` : track.durationFormatted}</strong>
            )
        }
    ];

    return (
        <Card padding="md">
            <div className="filter-header">
                <h3>Каталог Jamendo</h3>
                <div className="sort-controls">
                    <Button
                        size="sm"
                        variant={sortField === 'title' ? 'primary' : 'ghost'}
                        onClick={() => handleSort('title')}
                    >
                        Назва {sortField === 'title' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </Button>
                    <Button
                        size="sm"
                        variant={sortField === 'durationSec' ? 'primary' : 'ghost'}
                        onClick={() => handleSort('durationSec')}
                    >
                        Тривалість {sortField === 'durationSec' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </Button>
                </div>
            </div>

            <DataTable
                columns={columns}
                rows={sortedTracks}
                onRowClick={(track) => navigate(`/track/${track.id}`)}
            />
        </Card>
    );
}