
import { Card } from './Card';
import { Badge } from '../atoms/Badge';

export function StatCard({ title, value, badgeText, badgeVariant = 'success', icon }) {
    return (
        <Card padding="md">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-sm)' }}>
        <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', fontWeight: 500 }}>
          {title}
        </span>
                {icon && <span style={{ fontSize: 'var(--font-size-lg)' }}>{icon}</span>}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--space-sm)' }}>
                <strong style={{ fontSize: 'var(--font-size-xl)', color: 'var(--color-text)' }}>{value}</strong>
                {badgeText && <Badge variant={badgeVariant}>{badgeText}</Badge>}
            </div>
        </Card>
    );
}