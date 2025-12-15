import { motion, AnimatePresence } from 'framer-motion';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Grid,
  Card,
  CardContent,
  CardMedia,
  LinearProgress,
  Chip,
} from '@mui/material';
import {
  Delete,
  Download,
  PhotoSizeSelectActual,
} from '@mui/icons-material';
import { formatBytes } from '@/utils/helpers';

const ImagePreview = ({ images, compressedResults, onRemove }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 3,
          backgroundColor: 'white',
        }}
      >
        <Box display="flex" alignItems="center" mb={3}>
          <PhotoSizeSelectActual sx={{ mr: 2, color: 'primary.main' }} />
          <Typography variant="h6">
            Image Preview
          </Typography>
        </Box>

        <AnimatePresence>
          {images.length > 0 ? (
            <Grid container spacing={3}>
              {images.map((image, index) => {
                const result = compressedResults[index];
                const url = URL.createObjectURL(image);

                return (
                  <Grid size={{xs:12, sm:6, md: 4}} key={index}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      layout
                    >
                      <Card
                        sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          transition: 'all 0.3s',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: 8,
                          },
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="200"
                          image={url}
                          alt={image.name}
                          sx={{
                            objectFit: 'cover',
                            backgroundColor: '#f5f5f5',
                          }}
                        />
                        
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography variant="subtitle2" noWrap gutterBottom>
                            {image.name}
                          </Typography>
                          
                          <Box mb={2}>
                            <Typography variant="caption" color="text.secondary">
                              Original: {formatBytes(image.size)}
                            </Typography>
                          </Box>

                          {result && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                            >
                              <Box mb={2}>
                                <Typography variant="caption" color="text.secondary">
                                  Compressed: {formatBytes(result.compressedSize)}
                                </Typography>
                                <LinearProgress
                                  variant="determinate"
                                  value={result.reduction}
                                  sx={{
                                    mt: 1,
                                    height: 8,
                                    borderRadius: 4,
                                    backgroundColor: '#e0e0e0',
                                    '& .MuiLinearProgress-bar': {
                                      borderRadius: 4,
                                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    },
                                  }}
                                />
                              </Box>
                              
                              <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Chip
                                  label={`${result.reduction}% smaller`}
                                  size="small"
                                  color="success"
                                  variant="outlined"
                                />
                                <IconButton
                                  size="small"
                                  href={URL.createObjectURL(result.file)}
                                  download={result.file.name}
                                >
                                  <Download fontSize="small" />
                                </IconButton>
                              </Box>
                            </motion.div>
                          )}
                        </CardContent>
                        
                        <Box p={1} display="flex" justifyContent="flex-end">
                          <IconButton
                            size="small"
                            onClick={() => onRemove(index)}
                            color="error"
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Box>
                      </Card>
                    </motion.div>
                  </Grid>
                );
              })}
            </Grid>
          ) : (
            <Box
              sx={{
                py: 8,
                textAlign: 'center',
                color: 'text.secondary',
              }}
            >
              <PhotoSizeSelectActual sx={{ fontSize: 64, mb: 2, opacity: 0.3 }} />
              <Typography variant="body1">
                No images uploaded yet
              </Typography>
            </Box>
          )}
        </AnimatePresence>
      </Paper>
    </motion.div>
  );
};

export default ImagePreview;