import { useState } from 'react';

export default function TrackList({ tracks, showInSeconds }) {
    const [selectedGenre, setSelectedGenre] = useState('Усі');

    const genres = ['Усі', ...new Set(tracks.map(t => t.genre))];

    const filteredTracks = selectedGenre === 'Усі'
        ? tracks
        : tracks.filter(t => t.genre === selectedGenre);

    return (
        <div className="widget-card tracklist-widget">
            <div className="filter-header">
                <h3>Каталог треків</h3>
                <div className="filter-control">
                    <label htmlFor="genre-select">Жанр: </label>
                    <select
                        id="genre-select"
                        value={selectedGenre}
                        onChange={(e) => setSelectedGenre(e.target.value)}
                        className="select-input"
                    >
                        {genres.map(genre => (
                            <option key={genre} value={genre}>{genre}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="track-table-wrapper">
                <table className="track-table">
                    <thead>
                    <tr>
                        <th>Назва</th>
                        <th>Виконавець</th>
                        <th>Жанр</th>
                        <th>Тривалість</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredTracks.map(track => (
                        <tr key={track.id}>
                            <td className="track-title">{track.title}</td>
                            <td>{track.artist}</td>
                            <td><span className="genre-badge">{track.genre}</span></td>
                            <td>
                                <strong>
                                    {showInSeconds ? `${track.durationSec} сек` : track.duration}
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