import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { InferResponseType } from 'hono';

import { useToastMutation } from '@/hooks/useToastMutation';
import { client } from '@/lib/hono';

export const useResumeById = (id: string, { enabled = true } = {}) => {
  const queryClient = useQueryClient();

  const duplicateMutation = useToastMutation<
    InferResponseType<(typeof client.api.resumes.duplicate)[':id']['$post']>,
    Error
  >({
    mutationFn: async () => {
      const res = await client.api.resumes.duplicate[':id'].$post({
        param: { id },
      });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
      queryClient.invalidateQueries({ queryKey: ['resume', { id }] });
    },
    toastOptions: {
      loading: 'Duplicating resume...',
      success: 'Resume duplicated.',
      error: "We couldn't duplicate this resume.",
    },
  });

  const deleteMutation = useToastMutation<
    InferResponseType<(typeof client.api.resumes)[':id']['$delete']>,
    Error
  >({
    mutationFn: async () => {
      const res = await client.api.resumes[':id'].$delete({ param: { id } });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
      queryClient.invalidateQueries({ queryKey: ['resume', { id }] });
    },
    toastOptions: {
      loading: 'Deleting resume...',
      success: 'Resume deleted.',
      error: "We couldn't delete this resume.",
    },
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
    duplicateResume: duplicateMutation.mutate,
    duplicateResumePending: duplicateMutation.isPending,
    deleteResume: deleteMutation.mutate,
    deleteResumePending: deleteMutation.isPending,
  };
};
