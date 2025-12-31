import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/Dialog';
import { useLanguage } from '@/contexts/LanguageContext';

interface HealthProfileProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
}

const HealthProfileModal: React.FC<HealthProfileProps> = ({
  open,
  onOpenChange,
  title,
  children,
}) => {
  const { language } = useLanguage();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="px-3 md:px-6 max-w-[96%] sm:max-w-3xl h-[90%] overflow-y-auto max:h-[90%] py-5">
        <DialogTitle className="mt-4 lg:mt-0 py-3 border-b-0 text-base font-medium text-[#191D23]">
          {title}
        </DialogTitle>

        <div className="mt-4 space-y-6">{children}</div>

        <div className="mt-6 flex justify-center">
          <Button
            type="submit"
            form="edit-profile-form"
            className="my-5 bg-primaryColor hover:bg-[#1c9a40] text-white px-4 sm:px-8 rounded-[12px] py-3 h-12 w-full sm:w-[50%]"
          >
            {language === 'ar' ? 'حفظ التعديلات' : 'Save Changes'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HealthProfileModal;
