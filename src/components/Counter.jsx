export default function Counter({ count, onIncrement, onDecrement, onReset, min = 1, max = 10 }) {
    return (
        <div className="widget-card counter-widget">
            <div className="widget-header">
                <h3>Кількість треків у списку</h3>
            </div>
            <p className="widget-description">Управління числом треків у таблиці:</p>

            <div className="counter-controls">
                <button onClick={onDecrement} disabled={count <= min} className="btn btn-step">
                    −
                </button>
                <span className="counter-display">{count}</span>
                <button onClick={onIncrement} disabled={count >= max} className="btn btn-step">
                    +
                </button>
            </div>

            <button onClick={onReset} className="btn btn-reset">
                Показати всі ({max})
            </button>
        </div>
    );
}