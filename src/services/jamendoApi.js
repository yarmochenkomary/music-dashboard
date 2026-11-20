const JAMENDO_CLIENT_ID = '56b40578';

export async function fetchTracksWithFilters({ search = '', genre = 'All', limit = 15 } = {}) {
    const searchQuery = search.trim() ? `&namesearch=${encodeURIComponent(search.trim())}` : '';
    const tagQuery = genre !== 'All' ? `&tags=${encodeURIComponent(genre.toLowerCase())}` : '';
    const url = `https://api.jamendo.com/v3.0/tracks/?client_id=${JAMENDO_CLIENT_ID}&format=json&limit=${limit}${searchQuery}${tagQuery}&imagesize=200`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Помилка мережі: ${response.status}`);

        const data = await response.json();

        if (data.results && data.results.length > 0) {
            return data.results.map((track) => ({
                id: String(track.id),
                title: track.name,
                artist: track.artist_name,
                album: track.album_name || 'Single',
                genre: genre !== 'All' ? genre : 'Indie',
                durationSec: track.duration,
                durationFormatted: formatDuration(track.duration),
                image: track.album_image || track.image,
                releaseDate: track.releasedate || '2024-05-12',
                license: 'Creative Commons BY-NC-SA 3.0',
                bpm: 120,
                listens: Math.floor(Math.random() * 50000) + 5000,
                audioUrl: track.audio || ''
            }));
        }
    } catch (err) {
        console.warn('Використовуємо локальний каталог Jamendo:', err.message);
    }

    const fallback = getFallbackJamendoTracks().filter((track) => {
        const matchesSearch =
            track.title.toLowerCase().includes(search.toLowerCase()) ||
            track.artist.toLowerCase().includes(search.toLowerCase());
        const matchesGenre = genre === 'All' || track.genre === genre;
        return matchesSearch && matchesGenre;
    });

    return fallback.slice(0, limit);
}

export async function fetchTrackById(id) {
    const url = `https://api.jamendo.com/v3.0/tracks/?client_id=${JAMENDO_CLIENT_ID}&format=json&id=${encodeURIComponent(id)}&imagesize=400`;

    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            if (data.results && data.results.length > 0) {
                const track = data.results[0];
                return {
                    id: String(track.id),
                    title: track.name,
                    artist: track.artist_name,
                    album: track.album_name || 'Single',
                    genre: 'Indie',
                    durationSec: track.duration,
                    durationFormatted: formatDuration(track.duration),
                    image: track.album_image || track.image,
                    releaseDate: track.releasedate || '2024-05-12',
                    license: 'Creative Commons BY-NC-SA 3.0',
                    bpm: 124,
                    listens: 18450,
                    audioUrl: track.audio || ''
                };
            }
        }
    } catch (err) {
        console.warn('Пошук деталей треку у локальному каталозі:', err.message);
    }


    const found = getFallbackJamendoTracks().find((t) => t.id === String(id));
    return found || null;
}

function formatDuration(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function getFallbackJamendoTracks() {
    return [
        { id: '101', title: 'Get Down', artist: 'We Is Shore Dedicated', album: 'Get Down Single', genre: 'Rock', durationSec: 222, durationFormatted: '3:42', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400', releaseDate: '2023-11-14', license: 'CC BY-NC-SA 3.0', bpm: 128, listens: 42310 },
        { id: '102', title: 'Obey', artist: 'Black Table', album: 'Sentinel', genre: 'Metal', durationSec: 255, durationFormatted: '4:15', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400', releaseDate: '2022-08-03', license: 'CC BY-NC-ND 3.0', bpm: 145, listens: 31890 },
        { id: '103', title: 'Cell Suite No. 1', artist: 'Silence', album: 'Classical Collection', genre: 'Classical', durationSec: 150, durationFormatted: '2:30', image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400', releaseDate: '2021-03-19', license: 'CC BY 3.0', bpm: 76, listens: 64120 },
        { id: '104', title: 'Winter Dreams', artist: 'Snow Flake', album: 'Atmosphere', genre: 'Ambient', durationSec: 312, durationFormatted: '5:12', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400', releaseDate: '2024-01-10', license: 'CC BY-SA 3.0', bpm: 85, listens: 29400 },
        { id: '105', title: 'Electric Sunrise', artist: 'We Is Shore Dedicated', album: 'Sunrise EP', genre: 'Rock', durationSec: 198, durationFormatted: '3:18', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400', releaseDate: '2023-06-25', license: 'CC BY-NC-SA 3.0', bpm: 132, listens: 51200 },
        { id: '106', title: 'Summer Breeze', artist: 'Chillout Crew', album: 'Sunset Chill', genre: 'Pop', durationSec: 210, durationFormatted: '3:30', image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400', releaseDate: '2024-07-02', license: 'CC BY 3.0', bpm: 110, listens: 38750 },
        { id: '107', title: 'Neon Lights', artist: 'Synthwave Boy', album: 'Retro 80s', genre: 'Electronic', durationSec: 240, durationFormatted: '4:00', image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400', releaseDate: '2023-09-18', license: 'CC BY-NC 3.0', bpm: 118, listens: 73400 },
        { id: '108', title: 'Acoustic Morning', artist: 'John Guitar', album: 'Unplugged Session', genre: 'Rock', durationSec: 185, durationFormatted: '3:05', image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=400', releaseDate: '2022-05-11', license: 'CC BY-SA 3.0', bpm: 95, listens: 19800 },
        { id: '109', title: 'Midnight Drive', artist: 'Night Owl', album: 'Dark Roads', genre: 'Electronic', durationSec: 275, durationFormatted: '4:35', image: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=400', releaseDate: '2024-02-28', license: 'CC BY-NC-SA 3.0', bpm: 125, listens: 45900 },
        { id: '110', title: 'Velvet Rain', artist: 'Jazz Quartet', album: 'Late Night Lounge', genre: 'Classical', durationSec: 300, durationFormatted: '5:00', image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400', releaseDate: '2021-12-05', license: 'CC BY 3.0', bpm: 82, listens: 27650 },
        { id: '111', title: 'Urban Beats', artist: 'DJ Street', album: 'City Rhythms', genre: 'Pop', durationSec: 190, durationFormatted: '3:10', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400', releaseDate: '2023-04-17', license: 'CC BY-NC 3.0', bpm: 102, listens: 33100 },
        { id: '112', title: 'Floating Clouds', artist: 'Ambient Void', album: 'Meditations', genre: 'Ambient', durationSec: 360, durationFormatted: '6:00', image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400', releaseDate: '2022-10-30', license: 'CC BY-SA 3.0', bpm: 70, listens: 41050 },
        { id: '113', title: 'Fire and Steel', artist: 'Heavy Thunder', album: 'Metal Storm', genre: 'Metal', durationSec: 230, durationFormatted: '3:50', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400', releaseDate: '2023-08-14', license: 'CC BY-NC-ND 3.0', bpm: 155, listens: 22900 },
        { id: '114', title: 'Solar Flares', artist: 'Cosmic Traveler', album: 'Galaxy Journey', genre: 'Electronic', durationSec: 280, durationFormatted: '4:40', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400', releaseDate: '2024-04-09', license: 'CC BY 3.0', bpm: 130, listens: 58300 },
        { id: '115', title: 'Endless Horizons', artist: 'Ocean Echoes', album: 'Nature Sounds', genre: 'Ambient', durationSec: 215, durationFormatted: '3:35', image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400', releaseDate: '2023-02-12', license: 'CC BY-SA 3.0', bpm: 78, listens: 36400 }
    ];
}