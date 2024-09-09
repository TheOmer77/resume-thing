import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { InferResponseType } from 'hono';

import { client } from '@/lib/hono';
import { toast } from '@/lib/toast';

export const useResumeById = (id: string, { enabled = true } = {}) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation<
    InferResponseType<(typeof client.api.resumes)[':id']['$delete']>,
    Error
  >({
    mutationFn: async () => {
      const res = await client.api.resumes[':id'].$delete({ param: { id } });
      return await res.json();
    },
    onSuccess: () => {
      toast.success('Resume deleted.');
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
      queryClient.invalidateQueries({ queryKey: ['resume', { id }] });
    },
    onError: () => toast.error("We couldn't delete this resume."),
  });

  const getQuery = useQuery({
    enabled:
      enabled &&
      !!id &&
      // Don't try to fetch after deletion, it will result in 404
      !deleteMutation.isPending &&
      !deleteMutation.isSuccess,
    queryKey: ['resume', { id }],
    queryFn: async () => {
      const res = await client.api.resumes[':id'].$get({ param: { id } });
      if (!res.ok) throw new Error('Failed to fetch resume.');

      const data = await res.json();
      return data;
    },
  });

  return {
    resume: getQuery.data,
    resumeFetching: getQuery.isFetching,
    deleteResume: deleteMutation.mutate,
    deleteResumePending: deleteMutation.isPending,
  };
};
