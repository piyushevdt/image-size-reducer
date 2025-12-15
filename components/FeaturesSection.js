import { motion } from 'framer-motion';
import {
  Box,
  Paper,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Security,
  Speed,
  CloudDownload,
  PhotoSizeSelectLarge,
  HighQuality,
  Devices,
} from '@mui/icons-material';

const features = [
  {
    icon: <Speed />,
    title: 'Fast Processing',
    description: 'Compress images in seconds using browser-based processing',
  },
  {
    icon: <Security />,
    title: 'Privacy First',
    description: 'All processing happens locally in your browser',
  },
  {
    icon: <PhotoSizeSelectLarge />,
    title: 'Batch Processing',
    description: 'Upload and compress multiple images simultaneously',
  },
  {
    icon: <HighQuality />,
    title: 'Quality Control',
    description: 'Adjust compression settings to maintain quality',
  },
  {
    icon: <CloudDownload />,
    title: 'Easy Download',
    description: 'Download compressed images individually or all at once',
  },
  {
    icon: <Devices />,
    title: 'Responsive Design',
    description: 'Works perfectly on desktop, tablet, and mobile',
  },
];

const FeaturesSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 3,
          backgroundColor: 'white',
          mt: 4,
        }}
      >
        <Typography variant="h5" gutterBottom align="center" sx={{ mb: 4 }}>
          Why Choose Our Image Compressor?
        </Typography>
        
        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid size={{xs:12, sm:6, md: 4}} key={index}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Paper
                  elevation={1}
                  sx={{
                    px: 1,
                    py:3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    transition: 'all 0.3s',
                    '&:hover': {
                      backgroundColor: '#f8f9ff',
                      boxShadow: 6,
                    },
                  }}
                >
                  <Box
                    sx={{
                      px: 2,
                      py: 1.5,
                      mb: 2,
                      borderRadius: '50%',
                      backgroundColor: 'primary.light',
                      color: 'white',
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </motion.div>
  );
};

export default FeaturesSection;