import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/Dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import {
  useGenerateShareLinkMutation,
  // useShareListMutation,
} from '@/redux/Features/Shopping List/ShoppingListApi';
import { Copy, Share2, Link as LinkIcon } from 'lucide-react';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
} from 'react-share';
import { FacebookIcon, TwitterIcon, WhatsappIcon, LinkedinIcon } from 'react-share';
import { useLanguage } from '@/contexts/LanguageContext';

interface ShareListModalProps {
  listId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ShareListModal = ({ listId, isOpen, onClose }: ShareListModalProps) => {
  // const [email, setEmail] = useState('');
  const [step, setStep] = useState<'generate' | 'share'>('generate');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();

  const [generateShareLink, { isLoading: isLinkLoading }] = useGenerateShareLinkMutation();
  // const [shareList, { isLoading: isShareLoading }] = useShareListMutation();

  const handleGenerateLink = async () => {
    try {
      const res = await generateShareLink({
        listId,
        role: 'viewer',
        expiresAt: null,
      }).unwrap();

      setGeneratedLink(res.data.link);
      setStep('share');
      toast.success(t.shopping_list.share_link_generated);
    } catch (error: any) {
      toast.error(error?.data?.message || t.shopping_list.share_link_failed);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    toast.success(t.shopping_list.link_copied);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    setStep('generate');
    setGeneratedLink('');
    // setEmail('');
    setCopied(false);
    onClose();
  };

  // Share Link Step - Social Sharing
  if (step === 'share' && generatedLink) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-md p-4 overflow-hidden bg-white rounded-2xl shadow-lg">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle className="text-lg font-semibold">
                {t.shopping_list.share_list}
              </DialogTitle>
            </div>
          </DialogHeader>

          <div className="px-6 py-4">
            {/* Generated Link Display */}
            <div className="mb-6">
              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                {t.shopping_list.your_share_link}
              </Label>
              <div className="flex gap-2">
                <Input
                  value={generatedLink}
                  readOnly
                  className="flex-1 text-sm bg-gray-50 border-gray-200"
                />
                <Button
                  variant="outline"
                  onClick={handleCopy}
                  className="shrink-0 border-gray-300 hover:bg-gray-50"
                >
                  <Copy className={`w-4 h-4 ${copied ? 'text-green-600' : ''}`} />
                </Button>
              </div>
              {copied && (
                <p className="text-green-600 text-sm mt-2 text-center">
                  {t.shopping_list.link_copied}
                </p>
              )}
            </div>

            {/* Social Sharing Buttons */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700">
                {t.shopping_list.share_via}
              </Label>
              <div className="flex gap-3 sm:gap-4 justify-center py-2">
                <FacebookShareButton url={generatedLink}>
                  <FacebookIcon size={40} round />
                </FacebookShareButton>
                <TwitterShareButton url={generatedLink}>
                  <TwitterIcon size={40} round />
                </TwitterShareButton>
                <WhatsappShareButton url={generatedLink}>
                  <WhatsappIcon size={40} round />
                </WhatsappShareButton>
                <LinkedinShareButton url={generatedLink}>
                  <LinkedinIcon size={40} round />
                </LinkedinShareButton>
              </div>
            </div>
          </div>

          <DialogFooter>
            <div className="flex space-x-3 w-full">
              <Button
                variant="outline"
                onClick={() => setStep('generate')}
                className="flex-1 border-gray-300 hover:bg-gray-50"
              >
                {t.common.back}
              </Button>
              <Button
                onClick={handleClose}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                {t.common.done}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  // Generate Link Step - Initial Form
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md p-4 overflow-hidden bg-white rounded-2xl shadow-lg">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-green-50 border border-green-200">
                <Share2 className="w-5 h-5 text-green-600" />
              </div>
              <DialogTitle className="text-lg font-semibold">
                {t.shopping_list.share_list}
              </DialogTitle>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 px-6 py-4">
          {/* Share Type Info */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">
              {t.shopping_list.share_via_link}
            </Label>
            <div className="flex flex-col items-center p-4 border-2 border-green-500 bg-green-50 rounded-lg">
              <LinkIcon className="w-8 h-8 text-green-600 mb-2" />
              <span className="text-sm font-medium text-green-800">
                {t.shopping_list.generate_shareable_link}
              </span>
              <span className="text-xs text-green-600 text-center mt-1">
                {t.shopping_list.create_link_msg}
              </span>
            </div>
          </div>

          {/* Email Input for User Sharing - Commented Out */}
          {/* ... */}
        </div>

        <DialogFooter>
          <div className="flex space-x-3 w-full">
            <Button
              variant="outline"
              onClick={handleClose}
              className="flex-1 border-gray-300 hover:bg-gray-50"
            >
              {t.common.cancel}
            </Button>
            <Button
              onClick={handleGenerateLink}
              disabled={isLinkLoading}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white shadow-sm"
            >
              {isLinkLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{t.common.generating}</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <LinkIcon className="w-4 h-4" />
                  <span>{t.shopping_list.generate_link}</span>
                </div>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
