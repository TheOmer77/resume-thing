import { useQuery } from '@tanstack/react-query';

import { client } from '@/lib/hono';

export const usePDFFile = () => {
  const query = useQuery({
    queryKey: ['pdf'],
    queryFn: async () => {
      const res = await client.api.pdf.$get();
      if (!res.ok) throw new Error('Failed to fetch PDF.');
      return await res.blob();
    },
  });
  return query.data;
};
