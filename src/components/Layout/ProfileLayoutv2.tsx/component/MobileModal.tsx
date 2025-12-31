
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/Dialog';
import { useLanguage } from '@/contexts/LanguageContext';

interface MobileProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
}

const MobileModal: React.FC<MobileProps> = ({
  open,
  onOpenChange,
  title,
  children,
}) => {
  const { language } = useLanguage();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95%] h-fit overflow-y-auto max:h-[90%] py-5">
    
        <div className="mt-6 space-y-6 ">{children}</div>

      </DialogContent>
    </Dialog>
  );
};

export default MobileModal;
