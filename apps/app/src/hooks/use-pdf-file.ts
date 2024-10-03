import { useQuery } from '@tanstack/react-query';

import { client } from '@/lib/hono';

export const usePDFFile = (resumeId: string) => {
  const query = useQuery({
    queryKey: ['pdf', { resumeId }],
    queryFn: async () => {
      const res = await client.api.pdf[':id'].$get({ param: { id: resumeId } });
      if (!res.ok) throw new Error('Failed to fetch PDF.');
      return await res.blob();
    },
  });
  return query.data;
};
