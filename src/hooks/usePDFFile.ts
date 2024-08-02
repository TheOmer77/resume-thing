import { useQuery } from '@tanstack/react-query';

export const usePDFFile = () => {
  const query = useQuery({
    queryKey: ['pdf'],
    queryFn: async () => {
      const res = await fetch('/api/pdf');
      if (!res.ok) throw new Error('Failed to fetch PDF.');
      return await res.blob();
    },
  });
  return query.data;
};
