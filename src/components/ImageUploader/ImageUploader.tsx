/* eslint-disable react/prop-types */
import { useEffect, useState, useCallback } from 'react';
import { UploadCloud, X } from 'lucide-react';
import Cropper, { Area } from 'react-easy-crop';
import { useUploadImageMutation } from '../../redux/Features/Recipe/RecipeApi';

interface ImageUploaderProps {
  initialImage?: { url: string; key: string } | null | undefined;
  onImageUpload: (image: { url: string; key: string } | null) => void;
  onDelete: (image: { url: string; key: string } | null | undefined) => void;
  height?: string;
  width?: string;
  customStyle?: string;
  uploadText?: string;
  subText?: string;
 onError?: React.ReactEventHandler<HTMLImageElement>;
}

export function ImageUploader({
  initialImage,
  onImageUpload,
  onDelete,
  height = 'h-48',
  width,
  customStyle,
  uploadText = 'Click to upload',
  subText = 'PNG, JPG, WEBP',
  onError
}: ImageUploaderProps) {
  const [image, setImage] = useState<{ url: string; key: string } | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [showCropModal, setShowCropModal] = useState(false);
  const [uploadImage] = useUploadImageMutation();

  useEffect(() => {
    if (initialImage) {
      setImage(initialImage);
    } else {
      setImage(null);
    }
  }, [initialImage]);

  const onCropComplete = useCallback((_: Area, pixels: Area) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
      image.setAttribute('crossOrigin', 'anonymous');
      image.src = url;
    });

  const getCroppedImg = async (
    imageSrc: string,
    pixelCrop: Area,
    maxWidth = 1200,
    quality = 0.8,
  ): Promise<{ blob: Blob; url: string }> => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('No 2d context');
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const cropWidth = pixelCrop.width * scaleX;
    const cropHeight = pixelCrop.height * scaleY;

    let finalWidth = cropWidth;
    let finalHeight = cropHeight;

    if (finalWidth > maxWidth) {
      const ratio = maxWidth / finalWidth;
      finalWidth = maxWidth;
      finalHeight = finalHeight * ratio;
    }

    canvas.width = finalWidth;
    canvas.height = finalHeight;

    ctx.drawImage(
      image,
      pixelCrop.x * scaleX,
      pixelCrop.y * scaleY,
      cropWidth,
      cropHeight,
      0,
      0,
      finalWidth,
      finalHeight,
    );

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            throw new Error('Canvas is empty');
          }
          const url = URL.createObjectURL(blob);
          resolve({ blob, url });
        },
        'image/jpeg',
        quality,
      );
    });
  };

  const compressImage = async (blob: Blob, targetSize = 1024 * 1024) => {
    let quality = 0.8;
    let compressedBlob = blob;
    let attempts = 0;
    const maxAttempts = 5;

    while (compressedBlob.size > targetSize && attempts < maxAttempts && quality > 0.1) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = await createImage(URL.createObjectURL(compressedBlob));

      if (!ctx) {
        throw new Error('No 2d context');
      }

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      compressedBlob = await new Promise((resolve) => {
        canvas.toBlob(
          (b) => {
            if (!b) {
              throw new Error('Canvas is empty');
            }
            resolve(b);
          },
          'image/jpeg',
          quality,
        );
      });

      quality -= 0.1;
      attempts++;
    }

    const url = URL.createObjectURL(compressedBlob);
    return { blob: compressedBlob, url };
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // use optional chaining
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setImageSrc((reader.result as string) || '');
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCroppedAreaPixels(null);
      setShowCropModal(true);
    });
    reader.readAsDataURL(file);
  };

  const handleProcessAndUpload = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    setIsUploading(true);
    try {
      const { blob: croppedBlob } = await getCroppedImg(imageSrc, croppedAreaPixels);
      const { blob: finalBlob } = await compressImage(croppedBlob);

      const formData = new FormData();
      formData.append('image', finalBlob, 'image.jpg');

      const { data } = await uploadImage(formData).unwrap();
      if (data) {
        console.log('Upload response data:', data);
        setImage(data);
        onImageUpload(data);
        setShowCropModal(false);
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancelCrop = () => {
    setImageSrc('');
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    setShowCropModal(false);
  };

  const handleRemoveImage = () => {
    setImage(null);
    onImageUpload(null);
    onDelete(image);
  };

  return (
    <div className="space-y-3">
      {image && image.url ? (
        <div className="relative group">
          <img
            src={image.url}
            alt="Preview"
            className={`rounded-lg object-cover w-full border-2 border-dashed border-gray-300 ${customStyle} ${width} shadow-sm ${height}`}
            onError = {onError}
         />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 bg-white/90 hover:bg-white rounded-full p-1.5 transition-opacity opacity-0 group-hover:opacity-100 shadow-md border border-gray-200"
            aria-label="Remove image"
          >
            <X className="w-4 h-4 text-gray-700" />
          </button>
        </div>
      ) : (
        <label
          className={`
                    flex flex-col items-center justify-center
                    border-2 border-dashed cursor-pointer
                    ${
                      isUploading
                        ? 'bg-gray-100 border-blue-400'
                        : 'bg-gray-50 border-gray-300 hover:border-primaryColor hover:bg-primaryColor/5'
                    }
                    transition-colors duration-200 overflow-hidden relative ${height} ${width || 'w-full'} ${customStyle || 'rounded-lg'}
                `}
        >
          {isUploading ? (
            <div className="flex flex-col items-center justify-center h-full w-full">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primaryColor mb-3"></div>
              <p className="text-sm text-gray-600 font-medium">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center h-full w-full gap-2">
              <UploadCloud className="w-10 h-10 text-gray-400" />
              <p className="text-sm text-gray-500">
                <span className="font-semibold text-primaryColor">{uploadText}</span>
              </p>
              {subText && <p className="text-xs text-gray-400">{subText}</p>}
            </div>
          )}
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </label>
      )}

      {/* Crop Modal */}
      {showCropModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-800">Edit Image</h3>
              <button onClick={handleCancelCrop} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative flex-grow h-[60vh]">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                aspect={1}
                cropShape="rect"
                showGrid={true}
                classes={{ containerClassName: 'bg-gray-800' }}
              />
            </div>

            <div className="p-4 bg-gray-50 border-t">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Zoom: {zoom.toFixed(1)}x
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="3"
                    step="0.1"
                    value={zoom}
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={handleCancelCrop}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
                  disabled={isUploading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleProcessAndUpload}
                  className="px-4 py-2 text-sm font-medium text-white bg-primaryColor hover:bg-[#1c9a40] rounded-md flex items-center transition-colors"
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    'Apply'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
