import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useFilters } from '../context/FilterContext';

export default function FilterPanel() {
    const { filters, INITIAL_FILTERS, updateFilters, resetFilters } = useFilters();

    const { control, watch, reset } = useForm({
        defaultValues: filters
    });

    useEffect(() => {
        const subscription = watch((values) => {
            updateFilters({
                search: values.search || '',
                genre: values.genre || 'All',
                limit: Number(values.limit) || 15
            });
        });
        return () => subscription.unsubscribe();
    }, [watch, updateFilters]);

    const handleResetClick = () => {
        reset(INITIAL_FILTERS);
        resetFilters();
    };

    return (
        <div className="widget-card filter-panel">
            <h3>🔍 Панель пошуку та фільтрів</h3>
            <form className="filter-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                    <label htmlFor="search-input">Пошук за назвою або артистом:</label>
                    <Controller
                        name="search"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                id="search-input"
                                type="text"
                                className="input-control"
                                placeholder="Наприклад: Get Down, Silence..."
                            />
                        )}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="genre-select">Жанр:</label>
                    <Controller
                        name="genre"
                        control={control}
                        render={({ field }) => (
                            <select {...field} id="genre-select" className="input-control">
                                <option value="All">Усі жанри</option>
                                <option value="Rock">Rock</option>
                                <option value="Pop">Pop</option>
                                <option value="Electronic">Electronic</option>
                                <option value="Classical">Classical</option>
                                <option value="Metal">Metal</option>
                                <option value="Ambient">Ambient</option>
                            </select>
                        )}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="limit-select">Ліміт вибірки:</label>
                    <Controller
                        name="limit"
                        control={control}
                        render={({ field }) => (
                            <select
                                {...field}
                                id="limit-select"
                                className="input-control"
                                onChange={(e) => field.onChange(Number(e.target.value))}
                            >
                                <option value={5}>До 5 треків</option>
                                <option value={10}>До 10 треків</option>
                                <option value={15}>До 15 треків</option>
                            </select>
                        )}
                    />
                </div>

                <div className="form-group btn-group">
                    <button type="button" className="btn btn-reset" onClick={handleResetClick}>
                        ↺ Скинути фільтри
                    </button>
                </div>
            </form>
        </div>
    );
}