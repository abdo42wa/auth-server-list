import toast from 'react-hot-toast';
import {
    MutationCache,
    QueryCache,
    QueryClient,
    QueryClientProvider,
} from 'react-query';

const onError = () => {
    toast.error(`Something went wrong`);
};

export const client = new QueryClient({
    queryCache: new QueryCache({
        onError,
    }),
    mutationCache: new MutationCache({
        onError,
    }),
    defaultOptions: {
        queries: {
            notifyOnChangeProps: 'tracked',
            retryDelay: 200,
            staleTime: Infinity,
        },
        mutations: {
            retry: (failureCount) => failureCount < 2,
        },
    },
});

export const QueryProvider = QueryClientProvider;