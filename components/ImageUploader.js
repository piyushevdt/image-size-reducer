import { motion } from 'framer-motion';
import { 
  Box, 
  Button, 
  Typography, 
  Paper, 
  IconButton,
  Chip,
  Stack
} from '@mui/material';
import { 
  CloudUpload, 
  Delete, 
  Image as ImageIcon,
  CheckCircle
} from '@mui/icons-material';
import { useCallback } from 'react';

const ImageUploader = ({ images, onUpload, onRemove, onClear }) => {
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    onUpload(files);
  }, [onUpload]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  const handleFileSelect = useCallback((e) => {
    const files = Array.from(e.target.files);
    onUpload(files);
  }, [onUpload]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Paper
        elevation={3}
        sx={{
          p: {xs:2, md: 4},
          borderRadius: 3,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          textAlign: 'center',
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <Box
          sx={{
            border: '3px dashed rgba(255,255,255,0.3)',
            borderRadius: 2,
            p: {xs: 2, md: 6},
            mb: 3,
            transition: 'all 0.3s',
            '&:hover': {
              borderColor: 'rgba(255,255,255,0.5)',
              backgroundColor: 'rgba(255,255,255,0.05)',
            },
          }}
        >
          <CloudUpload sx={{ fontSize: 64, mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            Drag & Drop Images Here
          </Typography>
          <Typography variant="body2" sx={{ mb: 3, opacity: 0.9 }}>
            or click to select files (JPEG, PNG, WebP, GIF)
          </Typography>
          
          <Button
            component="label"
            variant="contained"
            startIcon={<ImageIcon />}
            sx={{
              backgroundColor: 'white',
              color: '#667eea',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.9)',
              },
            }}
          >
            Choose Images
            <input
              type="file"
              multiple
              accept="image/*"
              hidden
              onChange={handleFileSelect}
            />
          </Button>
        </Box>

        {images.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
          >
            <Paper
              elevation={1}
              sx={{
                p: 3,
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: 2,
              }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">
                  Selected Images ({images.length})
                </Typography>
                <Button
                  size="small"
                  startIcon={<Delete />}
                  onClick={onClear}
                  sx={{ color: 'white' }}
                >
                  Clear All
                </Button>
              </Box>
              
              <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                {images.map((image, index) => (
                  <Chip
                    key={index}
                    icon={<CheckCircle />}
                    label={`${image.name.slice(0, 20)}...`}
                    onDelete={() => onRemove(index)}
                    sx={{
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      '& .MuiChip-deleteIcon': {
                        color: 'rgba(255,255,255,0.7)',
                      },
                    }}
                  />
                ))}
              </Stack>
            </Paper>
          </motion.div>
        )}
      </Paper>
    </motion.div>
  );
};

export default ImageUploader;