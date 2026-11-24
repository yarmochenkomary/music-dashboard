
import './Spinner.css';

export function Spinner({ text = 'Завантаження...' }) {
    return (
        <div className="ds-spinner-wrap">
            <div className="ds-spinner" />
            {text && <span>{text}</span>}
        </div>
    );
}