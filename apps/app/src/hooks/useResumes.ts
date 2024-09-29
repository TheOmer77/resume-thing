import { useQuery } from '@tanstack/react-query';

import { client } from '@/lib/hono';

export const useResumes = () => {
  const getQuery = useQuery({
    queryKey: ['resumes'],
    queryFn: async () => {
      const res = await client.api.resumes.$get();
      if (!res.ok)
        throw new Error('Something went wrong while getting your resumes.');

      const data = await res.json();
      // API returns dates as strings, so they need to be converted back
      return data.map(({ createdAt, updatedAt, ...rest }) => ({
        createdAt: new Date(createdAt),
        updatedAt: new Date(updatedAt),
        ...rest,
      }));
    },
  });

  return { resumes: getQuery.data };
};
