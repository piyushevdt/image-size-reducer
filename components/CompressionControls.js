import { motion } from 'framer-motion';
import {
  Box,
  Paper,
  Typography,
  Slider,
  TextField,
  Button,
  Grid,
  Stack,
} from '@mui/material';
import {
  Compress,
  Tune,
  PhotoSizeSelectLarge, // For dimensions
  Straighten,           // For height
  CropFree,            // For width
  AspectRatio,         // For aspect ratio
} from '@mui/icons-material';

const CompressionControls = ({ settings, onSettingsChange, onCompress, disabled }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Paper
        elevation={3}
        sx={{
          p: {xs: 2, md: 3},
          borderRadius: 3,
          backgroundColor: 'white',
        }}
      >
        <Box display="flex" alignItems="center" mb={3}>
          <Tune sx={{ mr: 2, color: 'primary.main' }} />
          <Typography variant="h6">
            Compression Settings
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid size={{xs:12, md:6}}>
            <Box mb={3}>
              <Typography gutterBottom>
                <Tune sx={{ verticalAlign: 'middle', mr: 1, fontSize: 20 }} />
                Image Quality: {settings.quality}%
              </Typography>
              <Slider
                value={settings.quality}
                onChange={(_, value) => onSettingsChange({ quality: value })}
                min={10}
                max={100}
                step={5}
                valueLabelDisplay="auto"
                disabled={disabled}
              />
              <Typography variant="caption" color="text.secondary">
                Lower = Smaller file size, Lower quality
              </Typography>
            </Box>

            <Box mb={3}>
              <Typography gutterBottom>
                <PhotoSizeSelectLarge sx={{ verticalAlign: 'middle', mr: 1, fontSize: 20 }} />
                Maximum Width: {settings.maxWidth}px
              </Typography>
              <Slider
                value={settings.maxWidth}
                onChange={(_, value) => onSettingsChange({ maxWidth: value })}
                min={320}
                max={3840}
                step={160}
                valueLabelDisplay="auto"
                disabled={disabled}
              />
            </Box>

            <Box mb={3}>
              <Typography gutterBottom>
                <PhotoSizeSelectLarge sx={{ verticalAlign: 'middle', mr: 1, fontSize: 20 }} />
                Maximum Height: {settings.maxHeight}px
              </Typography>
              <Slider
                value={settings.maxHeight}
                onChange={(_, value) => onSettingsChange({ maxHeight: value })}
                min={240}
                max={2160}
                step={120}
                valueLabelDisplay="auto"
                disabled={disabled}
              />
            </Box>
          </Grid>

          <Grid size={{xs:12, md:6}}>
            <Box mb={3}>
              <Typography variant="subtitle2" gutterBottom>
                Quick Presets
              </Typography>
              <Box sx={{display: "flex", gap: 2, flexWrap: "wrap"}}>
                <Button
                  variant="outlined"
                  onClick={() => onSettingsChange({
                    quality: 90,
                    maxWidth: 1920,
                    maxHeight: 1080,
                  })}
                  disabled={disabled}
                  startIcon={<PhotoSizeSelectLarge />}
                >
                  High Quality
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => onSettingsChange({
                    quality: 70,
                    maxWidth: 1280,
                    maxHeight: 720,
                  })}
                  disabled={disabled}
                  startIcon={<AspectRatio />}
                >
                  Balanced
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => onSettingsChange({
                    quality: 50,
                    maxWidth: 800,
                    maxHeight: 600,
                  })}
                  disabled={disabled}
                  startIcon={<Compress />}
                >
                  Max Compression
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => onSettingsChange({
                    quality: 100,
                    maxWidth: 3840,
                    maxHeight: 2160,
                  })}
                  disabled={disabled}
                  startIcon={<CropFree />}
                >
                  Original
                </Button>
              </Box>
            </Box>

            <Box mb={3}>
              <Typography variant="subtitle2" gutterBottom>
                Manual Dimensions
              </Typography>
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Width (px)"
                  type="number"
                  value={settings.maxWidth}
                  onChange={(e) => onSettingsChange({ maxWidth: parseInt(e.target.value) || 1920 })}
                  InputProps={{
                    startAdornment: <CropFree sx={{ mr: 1, opacity: 0.5 }} />,
                  }}
                  fullWidth
                  disabled={disabled}
                />
                <TextField
                  label="Height (px)"
                  type="number"
                  value={settings.maxHeight}
                  onChange={(e) => onSettingsChange({ maxHeight: parseInt(e.target.value) || 1080 })}
                  InputProps={{
                    startAdornment: <Straighten sx={{ mr: 1, opacity: 0.5 }} />,
                  }}
                  fullWidth
                  disabled={disabled}
                />
              </Stack>
            </Box>
          </Grid>
        </Grid>

        <Box mt={4} textAlign="center">
          <Button
            variant="contained"
            size="large"
            startIcon={<Compress />}
            onClick={onCompress}
            disabled={disabled}
            sx={{
              px: 6,
              py: 1.5,
              fontSize: '1.1rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 4,
              },
              transition: 'all 0.3s',
            }}
          >
            Compress Images
          </Button>
        </Box>
      </Paper>
    </motion.div>
  );
};

export default CompressionControls;