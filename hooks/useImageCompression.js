import { useState, useCallback } from 'react';
import imageCompressor from '@/utils/imageCompressor';
import { validateImageFile } from '@/utils/helpers';

export const useImageCompression = () => {
  const [images, setImages] = useState([]);
  const [compressedImages, setCompressedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [compressionSettings, setCompressionSettings] = useState({
    quality: 80,
    maxWidth: 1920,
    maxHeight: 1080,
  });

  const handleImageUpload = useCallback((files) => {
    const validFiles = Array.from(files).filter(file => {
      const validation = validateImageFile(file);
      if (!validation.valid) {
        setError(validation.message);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) {
      return;
    }

    setImages(prev => [...prev, ...validFiles]);
    setError('');
  }, []);

  const compressImages = useCallback(async () => {
    if (images.length === 0) return;

    setLoading(true);
    setError('');

    try {
      // Update compressor settings
      imageCompressor.setQuality(compressionSettings.quality / 100);
      imageCompressor.setMaxDimensions(
        compressionSettings.maxWidth,
        compressionSettings.maxHeight
      );

      const results = await imageCompressor.compressMultipleImages(images);
      setCompressedImages(results);
    } catch (err) {
      setError(err.message || 'Failed to compress images');
    } finally {
      setLoading(false);
    }
  }, [images, compressionSettings]);

  const removeImage = useCallback((index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  }, []);

  const clearAll = useCallback(() => {
    setImages([]);
    setCompressedImages([]);
    setError('');
  }, []);

  const updateSettings = useCallback((newSettings) => {
    setCompressionSettings(prev => ({
      ...prev,
      ...newSettings,
    }));
  }, []);

  const downloadAll = useCallback(() => {
    compressedImages.forEach(result => {
      const url = URL.createObjectURL(result.file);
      const link = document.createElement('a');
      link.href = url;
      link.download = result.file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });
  }, [compressedImages]);

  return {
    images,
    compressedImages,
    loading,
    error,
    compressionSettings,
    handleImageUpload,
    compressImages,
    removeImage,
    clearAll,
    updateSettings,
    downloadAll,
  };
};