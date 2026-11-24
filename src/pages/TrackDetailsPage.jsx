import { useParams, useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useFetch } from '../hooks/useFetch';
import { fetchTrackById } from '../services/jamendoApi';
import { selectFavorites, toggleFavorite } from '../store/dashboardSlice';
import { Card, Button, Badge, Spinner } from '../design-system';

export default function TrackDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const favorites = useSelector(selectFavorites);
    const { data: track, loading, error } = useFetch(fetchTrackById, id);

    if (loading) {
        return (
            <Card>
                <Spinner text={`Завантаження треку #${id}...`} />
            </Card>
        );
    }

    if (error || !track) {
        return (
            <Card>
                <h2>{error ? 'Помилка завантаження' : '404 — Трек не знайдено'}</h2>
                <p style={{ margin: 'var(--space-md) 0' }}>
                    {error || `Запис з ID #${id} відсутній у каталозі.`}
                </p>
                <Button onClick={() => navigate('/')}>← Назад до дашборду</Button>
            </Card>
        );
    }

    const isFav = favorites.includes(String(track.id));

    return (
        <Card padding="lg">
            <div className="details-top-bar">
                <Button variant="primary" onClick={() => navigate('/')}>
                    ← Назад до списку
                </Button>
                <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'center' }}>
                    <Button
                        variant={isFav ? 'danger' : 'secondary'}
                        onClick={() => dispatch(toggleFavorite(track.id))}
                    >
                        {isFav ? '❤️ В обраному' : '🤍 Додати в обране'}
                    </Button>
                    <Badge variant="neutral">ID: {track.id}</Badge>
                </div>
            </div>

            <div className="details-content">
                <img src={track.image} alt={track.title} className="details-cover" />
                <div className="details-info">
                    <Badge variant="primary">{track.genre}</Badge>
                    <h2 style={{ marginTop: 'var(--space-sm)' }}>{track.title}</h2>
                    <p className="details-artist">
                        Виконавець: <strong>{track.artist}</strong>
                    </p>

                    <div className="details-meta-grid">
                        <div className="meta-item">
                            <span className="meta-label">Альбом</span>
                            <span className="meta-value">{track.album}</span>
                        </div>
                        <div className="meta-item">
                            <span className="meta-label">Тривалість</span>
                            <span className="meta-value">
                {track.durationFormatted} ({track.durationSec} сек)
              </span>
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
                </div>
            </div>
        </Card>
    );
}