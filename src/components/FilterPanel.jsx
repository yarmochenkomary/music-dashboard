import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilters, setFilters, resetFilters, INITIAL_FILTERS } from '../store/dashboardSlice';
import { Card, FormField, Input, Select, Button } from '../design-system';

export default function FilterPanel() {
    const dispatch = useDispatch();
    const filters = useSelector(selectFilters);

    const { control, watch, reset } = useForm({ defaultValues: filters });

    useEffect(() => {
        const subscription = watch((values) => {
            dispatch(
                setFilters({
                    search: values.search || '',
                    genre: values.genre || 'All',
                    limit: Number(values.limit) || 15
                })
            );
        });
        return () => subscription.unsubscribe();
    }, [watch, dispatch]);

    const handleResetClick = () => {
        reset(INITIAL_FILTERS);
        dispatch(resetFilters());
    };

    return (
        <Card padding="md" className="mb-lg">
            <h3 style={{ marginBottom: 'var(--space-md)' }}>🔍 Панель пошуку та фільтрів</h3>
            <form className="filter-form" onSubmit={(e) => e.preventDefault()}>
                <FormField label="Пошук за назвою або артистом:" htmlFor="search-input">
                    <Controller
                        name="search"
                        control={control}
                        render={({ field }) => (
                            <Input {...field} id="search-input" placeholder="Наприклад: Get Down, Silence..." />
                        )}
                    />
                </FormField>

                <FormField label="Жанр:" htmlFor="genre-select">
                    <Controller
                        name="genre"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                id="genre-select"
                                options={[
                                    { value: 'All', label: 'Усі жанри' },
                                    { value: 'Rock', label: 'Rock' },
                                    { value: 'Pop', label: 'Pop' },
                                    { value: 'Electronic', label: 'Electronic' },
                                    { value: 'Classical', label: 'Classical' },
                                    { value: 'Metal', label: 'Metal' },
                                    { value: 'Ambient', label: 'Ambient' }
                                ]}
                            />
                        )}
                    />
                </FormField>

                <FormField label="Ліміт вибірки:" htmlFor="limit-select">
                    <Controller
                        name="limit"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                id="limit-select"
                                onChange={(e) => field.onChange(Number(e.target.value))}
                                options={[
                                    { value: 5, label: 'До 5 треків' },
                                    { value: 10, label: 'До 10 треків' },
                                    { value: 15, label: 'До 15 треків' }
                                ]}
                            />
                        )}
                    />
                </FormField>

                <Button variant="secondary" onClick={handleResetClick}>
                    ↺ Скинути фільтри
                </Button>
            </form>
        </Card>
    );
}