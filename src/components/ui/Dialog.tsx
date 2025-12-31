import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { forwardRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

// Root + trigger + portal
export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogPortal = DialogPrimitive.Portal;
export const DialogClose = DialogPrimitive.Close;

// Overlay
export const DialogOverlay = forwardRef<HTMLDivElement, DialogPrimitive.DialogOverlayProps>(
  ({ className, ...props }, ref) => (
    <DialogPrimitive.Overlay
      ref={ref}
      className={cn(
        'fixed inset-0 z-50 bg-black/40 backdrop-blur-sm',
        'data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out',
        className,
      )}
      {...props}
    />
  ),
);
DialogOverlay.displayName = 'DialogOverlay';

// Content
export const DialogContent = forwardRef<HTMLDivElement, DialogPrimitive.DialogContentProps>(
  ({ className, children, ...props }, ref) => {
    const { isRTL } = useLanguage();
    return (
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
          ref={ref}
          className={cn(
            'fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
            'w-full max-w-md rounded-xl bg-white shadow-lg p-6 outline-none',
            'data-[state=open]:animate-scale-in data-[state=closed]:animate-scale-out',
            'data-[state=open]:animation-delay-[50ms]', // subtle delay
            className,
          )}
          {...props}
        >
          {children}
          <DialogPrimitive.Close
            className={` absolute top-4 ${isRTL ? 'left-4' : 'right-4'} rounded-md opacity-70 hover:opacity-100 focus:outline-none`}
            aria-label="Close"
          >
            <X className="h-6 w-6 text-gray-600" />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPortal>
    );
  },
);
DialogContent.displayName = 'DialogContent';

// Header / Footer / Title
// Header / Footer / Title
export const DialogHeader = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => <div className={cn('mb-4 border-b pb-3', className)}>{children}</div>;

export const DialogTitle = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <DialogPrimitive.Title className={cn('text-xl font-semibold text-gray-900', className)}>
    {children}
  </DialogPrimitive.Title>
);

export const DialogFooter = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => <div className={cn('mt-6 flex justify-start gap-3', className)}>{children}</div>;
