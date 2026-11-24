
import './Badge.css';

export function Badge({ children, variant = 'primary' }) {
    return <span className={`ds-badge ds-badge--${variant}`}>{children}</span>;
}