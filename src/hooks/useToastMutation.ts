import { useState } from 'react';
import {
  useMutation,
  type UseMutationOptions,
  type QueryClient,
} from '@tanstack/react-query';
import type { ExternalToast } from 'sonner';

import { toast } from '@/lib/toast';

const LOADING_TOAST_OPTIONS = {
    dismissible: false,
    duration: Infinity,
  } as const satisfies ExternalToast,
  RESULT_TOAST_OPTIONS = {
    dismissible: true,
    duration: 4000,
  } as const satisfies ExternalToast;

/**
 * An extension of `useMutation` that also displays a toast when pending, on
 * success and on error.
 */
export const useToastMutation = <
  TData = unknown,
  TError = Error,
  TVariables = void,
  TContext = unknown,
>(
  options: UseMutationOptions<TData, TError, TVariables, TContext> & {
    toastOptions: { loading: string; success: string; error: string };
  },
  queryClient?: QueryClient
) => {
  const { onMutate, onSuccess, onError, toastOptions } = options;
  const [toastId, setToastId] = useState<string | number>();

  const mutation = useMutation(
    {
      ...options,
      onMutate: variables => {
        setToastId(toast.loading(toastOptions.loading, LOADING_TOAST_OPTIONS));
        return onMutate?.(variables);
      },
      onSuccess: (data, variables, context) => {
        toast.success(toastOptions.success, {
          ...RESULT_TOAST_OPTIONS,
          id: toastId,
        });
        return onSuccess?.(data, variables, context);
      },
      onError: (error, variables, context) => {
        toast.error(toastOptions.error, {
          ...RESULT_TOAST_OPTIONS,
          id: toastId,
        });
        return onError?.(error, variables, context);
      },
    },
    queryClient
  );

  return mutation;
};
