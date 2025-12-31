import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { locationSchema, LocationType } from '@/schemas/auth/Loaction.validtion';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: LocationType) => void;
}

const LocationModal = ({ isOpen, onClose, onSubmit }: LocationModalProps) => {
  const { t } = useLanguage();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LocationType>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      location: {
        zip: '',
        country: '',
      },
    },
  });
  const handleFormSubmit = handleSubmit((data) => {
    onSubmit?.(data);
  });
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t.shopping_list.choose_location}</DialogTitle>
        </DialogHeader>
        {/* Modal content goes here */}
        {/* first country then zip code */}
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <Label htmlFor="country">{t.shopping_list.country}</Label>
            <Input
              id="country"
              {...register('location.country')}
              placeholder={t.shopping_list.enter_country}
            />
            {errors?.location?.country && (
              <p className="text-red-500 text-sm mt-1">{errors.location.country.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="zip">{t.shopping_list.zip_code}</Label>
            <Input id="zip" {...register('location.zip')} placeholder={t.shopping_list.enter_zip} />
            {errors.location?.zip && (
              <p className="text-red-500 text-sm mt-1">{errors.location.zip.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button variant="secondary" onClick={onClose}>
              {t.common.cancel}
            </Button>
            <Button type="submit">{t.shopping_list.continue}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LocationModal;
