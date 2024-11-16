import { useCallback } from 'react';
import { toast } from 'sonner';

type UseToastManager = {
  successToast: (value?: string) => void;
  errorToast: (value?: string) => void;
  clearToast: () => void;
}

export default function useToastManager(): UseToastManager {
  const successToast = useCallback((value?: string) => {
    toast.success(value || 'Exactly!');
  }, []);

  const errorToast = useCallback((value?: string) => {
    toast.error(value || 'Error!');
  }, []);

  const clearToast = useCallback(() => {
    toast.caller();
  }, []);

  return {
    successToast,
    errorToast,
    clearToast,
  };
}