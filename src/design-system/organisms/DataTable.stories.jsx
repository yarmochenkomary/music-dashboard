
import { DataTable } from './DataTable';
import { Badge } from '../atoms/Badge';

export default {
    title: 'Design System/Organisms/DataTable',
    component: DataTable
};

export const TracksPreview = {
    args: {
        columns: [
            { key: 'title', header: 'Назва' },
            { key: 'artist', header: 'Виконавець' },
            { key: 'genre', header: 'Жанр', render: (row) => <Badge>{row.genre}</Badge> }
        ],
        rows: [
            { id: '1', title: 'Get Down', artist: 'We Is Shore Dedicated', genre: 'Rock' },
            { id: '2', title: 'Neon Lights', artist: 'Synthwave Boy', genre: 'Electronic' }
        ]
    }
};