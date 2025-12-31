import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
} from 'react-share';
import { FacebookIcon, TwitterIcon, WhatsappIcon, LinkedinIcon } from 'react-share';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Copy } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

type ShareModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shareUrl: string;
  title?: string;
};

export const ShareModal: React.FC<ShareModalProps> = ({
  open,
  onOpenChange,
  shareUrl,
  title = 'Share Recipe',
}) => {
  const [copied, setCopied] = useState(false);
  const { language } = useLanguage();
  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Content className="fixed top-1/2 left-1/2 w-[90%] sm:w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <DialogPrimitive.Title className="text-lg font-semibold">{title}</DialogPrimitive.Title>
            <DialogPrimitive.Close asChild>
              <button className="text-gray-500 hover:text-gray-700">✕</button>
            </DialogPrimitive.Close>
          </div>
          <div className="flex gap-2 sm:gap-4 justify-center py-4">
            <FacebookShareButton url={shareUrl}>
              <FacebookIcon size={35} className="sm:size-[48px]" round />
            </FacebookShareButton>
            <TwitterShareButton url={shareUrl}>
              <TwitterIcon size={35} className="sm:size-[48px]" round />
            </TwitterShareButton>
            <WhatsappShareButton url={shareUrl}>
              <WhatsappIcon size={35} className="sm:size-[48px]" round />
            </WhatsappShareButton>
            <LinkedinShareButton url={shareUrl}>
              <LinkedinIcon size={35} className="sm:size-[48px]" round />
            </LinkedinShareButton>
            <Button
              variant="outline"
              onClick={handleCopy}
              className="flex flex-col items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full"
            >
              <Copy className="w-5 h-5" />
            </Button>
          </div>

          {copied && (
            <p className="text-center text-green-600 text-sm">
              {language === 'ar' ? 'تم نسخ الرابط!' : 'Link copied!'}
            </p>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default ShareModal;
