import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';
interface ChooseStoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (storeUrl: string) => void;
}

const ChooseStoreModal = ({ isOpen, onClose, onSubmit }: ChooseStoreModalProps) => {
  const [selectedStore, setSelectedStore] = useState<string | null>(null);
  const { t } = useLanguage();
  const handleSubmit = () => {
    if (selectedStore && onSubmit) {
      onSubmit(selectedStore);
      onClose();
    }
  };

  const stores = [
    { name: 'Carrefour', logo: '/Carrefour.png' },
    { name: 'Danube', logo: '/Danube.png' },
    { name: 'Tamimi_Markets', logo: '/TamimiMarkets.png' },
    { name: 'BinDawood_Holding', logo: '/BinDawood_logo.jpg' },
    { name: 'Othaim', logo: '/Othaim.jpg' },
    { name: 'amazon', logo: '/amazon.png' },
    { name: 'panda_market', logo: '/pandamarket.png' },
    { name: 'Noon', logo: '/noon.jpg' },
    { name: 'LuLu', logo: '/LuLu.jpg' },
    { name: 'Nana', logo: '/nana.png' },
  ].map((store) => ({
    ...store,
    url: `/checkout?store=${encodeURIComponent(store.name)}`,
  }));

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[80vh] !w-[95%] sm:!max-w-2xl overflow-y-auto  [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <DialogHeader>
          <DialogTitle>{t.shopping_list.choose_store}</DialogTitle>
        </DialogHeader>
        {/* Modal content goes here */}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {stores.map((store) => (
            <div
              key={store.name}
              onClick={() => setSelectedStore(store.url)}
              style={{
                backgroundImage: `url(${store.logo}`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
              className={`relative cursor-pointer rounded-xl p-6 h-32 flex items-end justify-center text-white font-semibold text-lg shadow-md overflow-hidden transition-all duration-300 ${
                selectedStore === store.url ? 'ring-4 ring-primaryColor' : 'border border-gray-200'
              } hover:scale-105`}
            ></div>
          ))}
        </div>

        <DialogFooter>
          <Button variant="secondary" onClick={onClose}>
            {t.common.cancel}
          </Button>
          <Button onClick={handleSubmit} disabled={!selectedStore} className="bg-primaryColor">
            {t.shopping_list.choose}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChooseStoreModal;
