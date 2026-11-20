import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { selectFavorites, toggleFavorite } from '../store/dashboardSlice';

export default function TrackList({ tracks, loading, error, showInSeconds }) {
    const [sortField, setSortField] = useState('title');
    const [sortDirection, setSortDirection] = useState('asc');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const favorites = useSelector(selectFavorites);

    if (loading) {
        return (
            <div className="widget-card status-card">
                <div className="spinner"></div>
                <p>Завантаження даних з Jamendo API...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="widget-card status-card error-card">
                <span className="error-icon">⚠️</span>
                <h3>Помилка завантаження даних</h3>
                <p>{error}</p>
            </div>
        );
    }

    if (!tracks || tracks.length === 0) {
        return (
            <div className="widget-card status-card">
                <p>📭 За вашим запитом треків не знайдено.</p>
            </div>
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

    return (
        <div className="widget-card tracklist-widget">
            <div className="filter-header">
                <h3>Каталог Jamendo (клік — деталі, ❤️ — в обране)</h3>
                <div className="sort-controls">
                    <span className="sort-label">Сортувати:</span>
                    <button
                        className={`btn-sort ${sortField === 'title' ? 'active' : ''}`}
                        onClick={() => handleSort('title')}
                    >
                        Назва {sortField === 'title' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </button>
                    <button
                        className={`btn-sort ${sortField === 'durationSec' ? 'active' : ''}`}
                        onClick={() => handleSort('durationSec')}
                    >
                        Тривалість {sortField === 'durationSec' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </button>
                </div>
            </div>

            <div className="track-table-wrapper">
                <table className="track-table">
                    <thead>
                    <tr>
                        <th>Обране</th>
                        <th>Обкладинка</th>
                        <th>Назва</th>
                        <th>Виконавець</th>
                        <th>Альбом</th>
                        <th>Тривалість</th>
                    </tr>
                    </thead>
                    <tbody>
                    {sortedTracks.map((track) => {
                        const isFav = favorites.includes(String(track.id));
                        return (
                            <tr
                                key={track.id}
                                className="clickable-row"
                                onClick={() => navigate(`/track/${track.id}`)}
                            >
                                <td onClick={(e) => e.stopPropagation()}>
                                    <button
                                        type="button"
                                        className={`btn-fav ${isFav ? 'active' : ''}`}
                                        title={isFav ? 'Видалити з обраного' : 'Додати в обране'}
                                        onClick={() => dispatch(toggleFavorite(track.id))}
                                    >
                                        {isFav ? '❤️' : '🤍'}
                                    </button>
                                </td>
                                <td>
                                    <img src={track.image} alt={track.title} className="track-cover" />
                                </td>
                                <td className="track-title">
                                    <Link
                                        to={`/track/${track.id}`}
                                        className="track-link"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {track.title}
                                    </Link>
                                </td>
                                <td>{track.artist}</td>
                                <td className="album-name">{track.album}</td>
                                <td>
                                    <strong>
                                        {showInSeconds ? `${track.durationSec} сек` : track.durationFormatted}
                                    </strong>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}