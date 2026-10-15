import { useState } from 'react';

export default function TrackList({ tracks, loading, error, showInSeconds }) {
    const [sortField, setSortField] = useState('title'); // 'title' або 'durationSec'
    const [sortDirection, setSortDirection] = useState('asc'); // 'asc' або 'desc'

    // 1. СТАН LOADING (Поки вантажиться з мережі)
    if (loading) {
        return (
            <div className="widget-card status-card">
                <div className="spinner"></div>
                <p>Завантаження реальних даних з Jamendo API...</p>
            </div>
        );
    }

    // 2. СТАН ERROR (Якщо запит не вдався)
    if (error) {
        return (
            <div className="widget-card status-card error-card">
                <span className="error-icon">⚠️</span>
                <h3>Помилка завантаження даних</h3>
                <p>{error}</p>
            </div>
        );
    }

    // 3. СТАН EMPTY (Якщо даних немає)
    if (!tracks || tracks.length === 0) {
        return (
            <div className="widget-card status-card">
                <p>📭 Список треків порожній.</p>
            </div>
        );
    }

    // 4. DERIVED STATE: Сортування без мутації вихідного масиву
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
            setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    return (
        <div className="widget-card tracklist-widget">
            <div className="filter-header">
                <h3>Каталог Jamendo (Live REST API)</h3>
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

            {/* 5 полів у таблиці: Обкладинка, Назва, Виконавець, Альбом, Тривалість */}
            <div className="track-table-wrapper">
                <table className="track-table">
                    <thead>
                    <tr>
                        <th>Обкладинка</th>
                        <th>Назва</th>
                        <th>Виконавець</th>
                        <th>Альбом</th>
                        <th>Тривалість</th>
                    </tr>
                    </thead>
                    <tbody>
                    {sortedTracks.map(track => (
                        <tr key={track.id}>
                            <td>
                                <img src={track.image} alt={track.title} className="track-cover" />
                            </td>
                            <td className="track-title">{track.title}</td>
                            <td>{track.artist}</td>
                            <td className="album-name">{track.album}</td>
                            <td>
                                <strong>
                                    {showInSeconds ? `${track.durationSec} сек` : track.durationFormatted}
                                </strong>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}