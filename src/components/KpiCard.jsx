export default function KpiCard({ title, value, change, isPositive = true, icon }) {
    return (
        <div className="kpi-card">
            <div className="kpi-header">
                <span className="kpi-title">{title}</span>
                {icon && <span className="kpi-icon">{icon}</span>}
            </div>
            <div className="kpi-body">
                <span className="kpi-value">{value}</span>
                {change && (
                    <span className={`kpi-change ${isPositive ? 'positive' : 'negative'}`}>
            {change}
          </span>
                )}
            </div>
        </div>
    );
}