import { useSelector, useDispatch } from 'react-redux';
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from 'recharts';
import { selectChartType, selectTheme, setChartType } from '../store/dashboardSlice';

export default function AnalyticsChart({ tracks, loading }) {
    const dispatch = useDispatch();
    const chartType = useSelector(selectChartType);
    const theme = useSelector(selectTheme);

    const axisColor = theme === 'dark' ? '#94a3b8' : '#475569';
    const gridColor = theme === 'dark' ? '#334155' : '#e2e8f0';
    const tooltipBg = theme === 'dark' ? '#1e293b' : '#ffffff';


    const chartData = (tracks || []).map((track) => ({
        name: track.title.length > 14 ? `${track.title.slice(0, 14)}…` : track.title,
        fullTitle: track.title,
        durationSec: track.durationSec,
        bpm: track.bpm || 120
    }));

    return (
        <div className="widget-card chart-widget">
            <div className="filter-header">
                <div>
                    <h3>📈 Аналітика вибірки: Тривалість (сек) та Темп (BPM)</h3>
                    <p className="chart-subtitle">Графік автоматично оновлюється відповідно до активних фільтрів</p>
                </div>

                <div className="sort-controls">
                    <button
                        type="button"
                        className={`btn-sort ${chartType === 'bar' ? 'active' : ''}`}
                        onClick={() => dispatch(setChartType('bar'))}
                    >
                        📊 Стовпчиковий
                    </button>
                    <button
                        type="button"
                        className={`btn-sort ${chartType === 'line' ? 'active' : ''}`}
                        onClick={() => dispatch(setChartType('line'))}
                    >
                        📉 Лінійний
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="status-card">
                    <p>Побудова графіка...</p>
                </div>
            ) : chartData.length === 0 ? (
                <div className="status-card">
                    <p>Немає даних для побудови графіка за поточним фільтром.</p>
                </div>
            ) : (
                <div style={{ width: '100%', height: 290 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        {chartType === 'bar' ? (
                            <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                                <XAxis dataKey="name" stroke={axisColor} fontSize={12} />
                                <YAxis stroke={axisColor} fontSize={12} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: tooltipBg, borderColor: gridColor, borderRadius: '8px' }}
                                />
                                <Legend />
                                <Bar dataKey="durationSec" name="Тривалість (сек)" fill="#2563eb" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="bpm" name="Темп (BPM)" fill="#10b981" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        ) : (
                            <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                                <XAxis dataKey="name" stroke={axisColor} fontSize={12} />
                                <YAxis stroke={axisColor} fontSize={12} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: tooltipBg, borderColor: gridColor, borderRadius: '8px' }}
                                />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="durationSec"
                                    name="Тривалість (сек)"
                                    stroke="#2563eb"
                                    strokeWidth={3}
                                    dot={{ r: 4 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="bpm"
                                    name="Темп (BPM)"
                                    stroke="#10b981"
                                    strokeWidth={3}
                                    dot={{ r: 4 }}
                                />
                            </LineChart>
                        )}
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}