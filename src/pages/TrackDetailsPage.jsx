import { useParams, Link } from 'react-router';
import { useFetch } from '../hooks/useFetch';
import { fetchTrackById } from '../services/jamendoApi';

export default function TrackDetailsPage() {
    const { id } = useParams();
    const { data: track, loading, error } = useFetch(fetchTrackById, id);

    if (loading) {
        return (
            <div className="widget-card status-card">
                <div className="spinner"></div>
                <p>Завантаження інформації про трек #{id}...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="widget-card status-card error-card">
                <h3>⚠️ Помилка</h3>
                <p>{error}</p>
                <Link to="/" className="btn btn-back">← Назад до дашборду</Link>
            </div>
        );
    }


    if (!track) {
        return (
            <div className="widget-card status-card not-found-card">
                <h2>404 — Трек не знайдено</h2>
                <p>Запис з ідентифікатором <strong>#{id}</strong> відсутній у каталозі Jamendo.</p>
                <Link to="/" className="btn btn-back">← Повернутися на головну</Link>
            </div>
        );
    }

    return (
        <div className="widget-card details-card">
            <div className="details-top-bar">
                <Link to="/" className="btn btn-back">← Назад до списку треків</Link>
                <span className="track-badge">ID: {track.id}</span>
            </div>

            <div className="details-content">
                <img src={track.image} alt={track.title} className="details-cover" />

                <div className="details-info">
                    <span className="genre-pill">{track.genre}</span>
                    <h2>{track.title}</h2>
                    <p className="details-artist">Виконавець: <strong>{track.artist}</strong></p>

                    <div className="details-meta-grid">
                        <div className="meta-item">
                            <span className="meta-label">Альбом</span>
                            <span className="meta-value">{track.album}</span>
                        </div>
                        <div className="meta-item">
                            <span className="meta-label">Тривалість</span>
                            <span className="meta-value">{track.durationFormatted} ({track.durationSec} сек)</span>
                        </div>
                        <div className="meta-item">
                            <span className="meta-label">Дата релізу</span>
                            <span className="meta-value">{track.releaseDate}</span>
                        </div>
                        <div className="meta-item">
                            <span className="meta-label">Темп (BPM)</span>
                            <span className="meta-value">{track.bpm} BPM</span>
                        </div>
                        <div className="meta-item">
                            <span className="meta-label">Прослуховувань</span>
                            <span className="meta-value">{track.listens.toLocaleString()}</span>
                        </div>
                        <div className="meta-item">
                            <span className="meta-label">Ліцензія</span>
                            <span className="meta-value">{track.license}</span>
                        </div>
                    </div>

                    {track.audioUrl && (
                        <div className="audio-preview">
                            <p>Попереднє прослуховування:</p>
                            <audio controls src={track.audioUrl} style={{ width: '100%', marginTop: '8px' }} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}