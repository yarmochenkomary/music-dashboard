export default function Toggle({ isSeconds, onToggle }) {
    return (
        <div className="widget-card toggle-widget">
            <div className="widget-header">
                <h3>Одиниці виміру</h3>
            </div>
            <p className="widget-description">Формат тривалості у списку треків:</p>

            <div className="toggle-box">
        <span className="toggle-status">
          Поточний режим: <strong>{isSeconds ? 'Секунди (сек)' : 'Хвилини (хв:сек)'}</strong>
        </span>
                <button onClick={onToggle} className="btn btn-primary" style={{ marginTop: '12px' }}>
                    Переключити на {isSeconds ? 'хвилини' : 'секунди'}
                </button>
            </div>
        </div>
    );
}