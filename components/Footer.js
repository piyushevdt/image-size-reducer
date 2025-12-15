import { Box, Container, Typography, Link, IconButton } from '@mui/material';
import { GitHub, Twitter, Email } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 8,
        py: 4,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 3,
        backdropFilter: 'blur(10px)',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2" color="white">
            © {new Date().getFullYear()} Image Size Reducer. All rights reserved.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              size="small"
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: 'white' }}
            >
              <GitHub fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: 'white' }}
            >
              <Twitter fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              href="mailto:contact@example.com"
              sx={{ color: 'white' }}
            >
              <Email fontSize="small" />
            </IconButton>
          </Box>
          
          <Typography variant="body2" color="white">
            <Link href="#" color="inherit" sx={{ textDecoration: 'none', mr: 2 }}>
              Privacy Policy
            </Link>
            <Link href="#" color="inherit" sx={{ textDecoration: 'none' }}>
              Terms of Service
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;