import { isQueryError, isRequestAborted, QueryFn } from '@utils/query.utils';
import { useEffect, useState } from 'react';

const useQuery = <TDataType = unknown>(queryFn: QueryFn<TDataType>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<TDataType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      const result = await queryFn(controller.signal);

      if (!isQueryError(result)) {
        setData(result);
        setIsLoading(false);
        return;
      }

      if (isRequestAborted(result)) return;

      setError(result.message ?? 'Request failed');
      setIsLoading(false);
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [queryFn]);

  return {
    data,
    error,
    isLoading,
  };
};

export { useQuery };
