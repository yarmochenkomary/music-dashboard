
import './DataTable.css';

export function DataTable({ columns, rows, onRowClick }) {
    return (
        <div className="ds-table-wrap">
            <table className="ds-table">
                <thead>
                <tr>
                    {columns.map((col) => (
                        <th key={col.key}>{col.header}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {rows.map((row) => (
                    <tr
                        key={row.id}
                        className={onRowClick ? 'ds-table-row--clickable' : ''}
                        onClick={onRowClick ? () => onRowClick(row) : undefined}
                    >
                        {columns.map((col) => (
                            <td key={col.key}>{col.render ? col.render(row) : row[col.key]}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}