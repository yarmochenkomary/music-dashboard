
import './Card.css';

export function Card({ children, padding = 'md', className = '' }) {
    return <div className={`ds-card ds-card--pad-${padding} ${className}`}>{children}</div>;
}