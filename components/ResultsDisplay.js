import { motion } from 'framer-motion';
import {
  Box,
  Paper,
  Typography,
  Button,
  Stack,
  Grid,
  LinearProgress,
} from '@mui/material';
import {
  Download,
  CheckCircle,
  InsertChart,
  Storage,
} from '@mui/icons-material';
import { formatBytes } from '@/utils/helpers';

const ResultsDisplay = ({ results, onDownloadAll }) => {
  if (results.length === 0) return null;

  const totalOriginal = results.reduce((sum, r) => sum + r.originalSize, 0);
  const totalCompressed = results.reduce((sum, r) => sum + r.compressedSize, 0);
  const totalReduction = ((totalOriginal - totalCompressed) / totalOriginal * 100).toFixed(2);
  const totalSavings = totalOriginal - totalCompressed;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
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
          <CheckCircle sx={{ mr: 2, color: 'success.main' }} />
          <Typography variant="h6">
            Compression Results
          </Typography>
        </Box>

        <Grid container spacing={3} mb={4}>
          <Grid size={{xs:12, md:3}}>
            <Paper
              elevation={1}
              sx={{
                p: 3,
                textAlign: 'center',
                backgroundColor: '#f0f7ff',
                borderRadius: 2,
              }}
            >
              <Typography variant="h4" color="primary" gutterBottom>
                {results.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Images Processed
              </Typography>
            </Paper>
          </Grid>
          
          <Grid size={{xs:12, md:3}}>
            <Paper
              elevation={1}
              sx={{
                p: 3,
                textAlign: 'center',
                backgroundColor: '#f0fff4',
                borderRadius: 2,
              }}
            >
              <Typography variant="h4" color="success.main" gutterBottom>
                {totalReduction}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Size Reduction
              </Typography>
            </Paper>
          </Grid>
          
          <Grid size={{xs:12, md:3}}>
            <Paper
              elevation={1}
              sx={{
                p: 3,
                textAlign: 'center',
                backgroundColor: '#fff7f0',
                borderRadius: 2,
              }}
            >
              <Typography variant="h4" color="warning.main" gutterBottom>
                {formatBytes(totalSavings)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Savings
              </Typography>
            </Paper>
          </Grid>
          
          <Grid size={{xs:12, md:3}}>
            <Paper
              elevation={1}
              sx={{
                p: 3,
                textAlign: 'center',
                backgroundColor: '#f5f0ff',
                borderRadius: 2,
              }}
            >
              <Typography variant="h4" color="secondary.main" gutterBottom>
                {formatBytes(totalCompressed)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Final Size
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Box mb={4}>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="body2">
              <Storage fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
              Original Size: {formatBytes(totalOriginal)}
            </Typography>
            <Typography variant="body2">
              Compressed Size: {formatBytes(totalCompressed)}
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={(totalCompressed / totalOriginal) * 100}
            sx={{
              height: 12,
              borderRadius: 6,
              backgroundColor: '#e0e0e0',
              '& .MuiLinearProgress-bar': {
                borderRadius: 6,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              },
            }}
          />
          <Box display="flex" justifyContent="center" mt={2}>
            <Typography variant="caption" color="text.secondary">
              {formatBytes(totalSavings)} saved ({totalReduction}% reduction)
            </Typography>
          </Box>
        </Box>

        <Box textAlign="center">
          <Button
            variant="contained"
            size="large"
            startIcon={<Download />}
            onClick={onDownloadAll}
            sx={{
              px: 6,
              py: 1.5,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 4,
              },
              transition: 'all 0.3s',
            }}
          >
            Download All ({results.length} files)
          </Button>
        </Box>
      </Paper>
    </motion.div>
  );
};

export default ResultsDisplay;