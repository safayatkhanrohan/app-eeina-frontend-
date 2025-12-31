import * as Dialog from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
    title?: string;
    description?: string;

}

export function DeleteAccountDialog({ open, onClose, onConfirm, title,
  description,
  }: ConfirmDialogProps) {
    const {t,language} = useLanguage()
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] data-[state=open]:animate-fade-in" />

        <Dialog.Content
          className="fixed z-[115] top-1/2 left-1/2 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl
           bg-white shadow-lg p-6 animate-scale-in"
        >
          <Dialog.Close asChild>
            <button
              className="absolute top-3 right-4 text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </Dialog.Close>

          <Dialog.Title className="pt-2 text-lg font-semibold text-gray-900">
           {title ||
              (language === 'ar'
                ? 'هل أنت متأكد؟'
                : 'Are you sure?')}
          </Dialog.Title>

          <p className="text-gray-600 mt-3">
           {description ||
              (language === 'ar'
                ? 'هل ترغب في تنفيذ هذا الإجراء؟'
                : 'Do you want to proceed with this action?')}
          </p>

          <div className="mt-6 flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              {t.common.cancel}
            </Button>
            <Button
              variant="destructive"
              className="bg-red-600 hover:bg-red-700"
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              {t.common.delete}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
