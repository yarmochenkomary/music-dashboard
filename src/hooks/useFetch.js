import { useState, useEffect } from 'react';

export function useFetch(fetchFn, params) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const paramsKey = JSON.stringify(params);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);

        fetchFn(params)
            .then((result) => {
                if (isMounted) {
                    setData(result);
                    setError(null);
                }
            })
            .catch((err) => {
                if (isMounted) {
                    setError(err.message || 'Помилка завантаження даних');
                    setData(null);
                }
            })
            .finally(() => {
                if (isMounted) {
                    setLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchFn, paramsKey]);

    return { data, loading, error };
}