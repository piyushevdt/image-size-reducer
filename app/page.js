'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Box, 
  Container, 
  Typography, 
  Alert,
  Snackbar 
} from '@mui/material';
import ImageUploader from '@/components/ImageUploader';
import CompressionControls from '@/components/CompressionControls';
import ImagePreview from '@/components/ImagePreview';
import ResultsDisplay from '@/components/ResultsDisplay';
import FeaturesSection from '@/components/FeaturesSection';
import Footer from '@/components/Footer';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useImageCompression } from '@/hooks/useImageCompression';

export default function Home() {
  const {
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
  } = useImageCompression();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleCompress = async () => {
    try {
      await compressImages();
      setSnackbar({
        open: true,
        message: 'Images compressed successfully!',
        severity: 'success',
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message || 'Failed to compress images',
        severity: 'error',
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        // pb: 8,
      }}
    >
      <Container maxWidth="xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box textAlign="center" mb={6} pt={4}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: 'white',
                mb: 2,
                textShadow: '0 2px 10px rgba(0,0,0,0.1)',
              }}
            >
              Compress Images Instantly
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: 'rgba(255,255,255,0.9)',
                maxWidth: 600,
                margin: '0 auto',
              }}
            >
              Reduce image file size while maintaining quality. Free, secure, and works in your browser.
            </Typography>
          </Box>
        </motion.div>

        <Box sx={{ mb: 4 }}>
          <ImageUploader
            images={images}
            onUpload={handleImageUpload}
            onRemove={removeImage}
            onClear={clearAll}
          />
        </Box>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          </motion.div>
        )}

        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {images.length > 0 && (
              <>
                <Box sx={{ mb: 4 }}>
                  <CompressionControls
                    settings={compressionSettings}
                    onSettingsChange={updateSettings}
                    onCompress={handleCompress}
                    disabled={loading}
                  />
                </Box>

                <Box sx={{ mb: 4 }}>
                  <ImagePreview
                    images={images}
                    compressedResults={compressedImages}
                    onRemove={removeImage}
                  />
                </Box>
              </>
            )}

            {compressedImages.length > 0 && (
              <Box sx={{ mb: 4 }}>
                <ResultsDisplay
                  results={compressedImages}
                  onDownloadAll={downloadAll}
                />
              </Box>
            )}
          </>
        )}

        <FeaturesSection />
        <Footer />
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}