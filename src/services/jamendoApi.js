const JAMENDO_CLIENT_ID = '56b40578';

export async function fetchTracksWithFilters({ search = '', genre = 'All', limit = 15 } = {}) {
    const searchQuery = search.trim() ? `&namesearch=${encodeURIComponent(search.trim())}` : '';
    const tagQuery = genre !== 'All' ? `&tags=${encodeURIComponent(genre.toLowerCase())}` : '';
    const url = `https://api.jamendo.com/v3.0/tracks/?client_id=${JAMENDO_CLIENT_ID}&format=json&limit=${limit}${searchQuery}${tagQuery}&imagesize=100`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Помилка мережі Jamendo: ${response.status}`);
        }

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
            }));
        }
    } catch (err) {
        console.warn('Перехід на резервну вибірку Jamendo:', err.message);
    }

    // Резервна база з жанрами, щоб фільтрація працювала безвідмовно
    const fallback = getFallbackJamendoTracks().filter((track) => {
        const matchesSearch =
            track.title.toLowerCase().includes(search.toLowerCase()) ||
            track.artist.toLowerCase().includes(search.toLowerCase());
        const matchesGenre = genre === 'All' || track.genre === genre;
        return matchesSearch && matchesGenre;
    });

    return fallback.slice(0, limit);
}

function formatDuration(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function getFallbackJamendoTracks() {
    return [
        { id: '101', title: 'Get Down', artist: 'We Is Shore Dedicated', album: 'Get Down Single', genre: 'Rock', durationSec: 222, durationFormatted: '3:42', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=100' },
        { id: '102', title: 'Obey', artist: 'Black Table', album: 'Sentinel', genre: 'Metal', durationSec: 255, durationFormatted: '4:15', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100' },
        { id: '103', title: 'Cell Suite No. 1', artist: 'Silence', album: 'Classical Collection', genre: 'Classical', durationSec: 150, durationFormatted: '2:30', image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=100' },
        { id: '104', title: 'Winter Dreams', artist: 'Snow Flake', album: 'Atmosphere', genre: 'Ambient', durationSec: 312, durationFormatted: '5:12', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=100' },
        { id: '105', title: 'Electric Sunrise', artist: 'We Is Shore Dedicated', album: 'Sunrise EP', genre: 'Rock', durationSec: 198, durationFormatted: '3:18', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100' },
        { id: '106', title: 'Summer Breeze', artist: 'Chillout Crew', album: 'Sunset Chill', genre: 'Pop', durationSec: 210, durationFormatted: '3:30', image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=100' },
        { id: '107', title: 'Neon Lights', artist: 'Synthwave Boy', album: 'Retro 80s', genre: 'Electronic', durationSec: 240, durationFormatted: '4:00', image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=100' },
        { id: '108', title: 'Acoustic Morning', artist: 'John Guitar', album: 'Unplugged Session', genre: 'Rock', durationSec: 185, durationFormatted: '3:05', image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=100' },
        { id: '109', title: 'Midnight Drive', artist: 'Night Owl', album: 'Dark Roads', genre: 'Electronic', durationSec: 275, durationFormatted: '4:35', image: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=100' },
        { id: '110', title: 'Velvet Rain', artist: 'Jazz Quartet', album: 'Late Night Lounge', genre: 'Classical', durationSec: 300, durationFormatted: '5:00', image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=100' },
        { id: '111', title: 'Urban Beats', artist: 'DJ Street', album: 'City Rhythms', genre: 'Pop', durationSec: 190, durationFormatted: '3:10', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=100' },
        { id: '112', title: 'Floating Clouds', artist: 'Ambient Void', album: 'Meditations', genre: 'Ambient', durationSec: 360, durationFormatted: '6:00', image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=100' },
        { id: '113', title: 'Fire and Steel', artist: 'Heavy Thunder', album: 'Metal Storm', genre: 'Metal', durationSec: 230, durationFormatted: '3:50', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=100' },
        { id: '114', title: 'Solar Flares', artist: 'Cosmic Traveler', album: 'Galaxy Journey', genre: 'Electronic', durationSec: 280, durationFormatted: '4:40', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100' },
        { id: '115', title: 'Endless Horizons', artist: 'Ocean Echoes', album: 'Nature Sounds', genre: 'Ambient', durationSec: 215, durationFormatted: '3:35', image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=100' }
    ];
}