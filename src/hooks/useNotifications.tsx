import { useToast } from '@chakra-ui/react';
import ToastAlert from '@/components/ui/toast/ToastAlert';

type NotificationData = { message: string } | string;

export const useNotifications = () => {
  const toast = useToast();

  const showNotification = (
    data: NotificationData,
    type: 'error' | 'success',
  ) => {
    const message = typeof data === 'string' ? data : data.message;

    toast({
      position: 'bottom-left',
      render: () => (
        <ToastAlert
          message={message}
          {...(type === 'error' ? { error: true } : { success: true })}
        />
      ),
    });
  };

  const showErrorMessage = (data: NotificationData) =>
    showNotification(data, 'error');

  const showSuccessMessage = (data: NotificationData) =>
    showNotification(data, 'success');

  return { showErrorMessage, showSuccessMessage };
};
